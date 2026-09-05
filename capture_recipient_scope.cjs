const path = require('path');
const fs = require('fs');
const http = require('http');
const childProcess = require('child_process');
const { chromium } = require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = __dirname;
let base = '';
const captures = [
  { portal: 'bureau', device: 'pc', file: 'recipient-scope-bureau-pc.png' },
  { portal: 'school', device: 'pc', file: 'recipient-scope-school-pc.png' },
  { portal: 'bureau', device: 'mobile', file: 'recipient-scope-bureau-mobile.png' },
  { portal: 'school', device: 'mobile', file: 'recipient-scope-school-mobile.png' },
];

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return ({
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  })[extension] || 'application/octet-stream';
}

async function startStaticServer() {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const filePath = path.resolve(root, relativePath);
    if (!filePath.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      response.end('Not found');
      return;
    }
    response.writeHead(200, {'Content-Type': contentType(filePath), 'Cache-Control': 'no-store'});
    fs.createReadStream(filePath).pipe(response);
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  base = `http://127.0.0.1:${address.port}`;
  return server;
}

async function prepare(page, portal, device) {
  if (process.env.USE_HEAD_BASE === '1') {
    const headApp = childProcess.execFileSync('git', ['show', 'HEAD:app.js'], { cwd: root, encoding: 'utf8' });
    const headStyles = childProcess.execFileSync('git', ['show', 'HEAD:styles.css'], { cwd: root, encoding: 'utf8' });
    await page.route('**/app.js*', route => route.fulfill({
      status: 200,
      contentType: 'application/javascript; charset=utf-8',
      body: headApp,
    }));
    await page.route('**/styles.css*', route => route.fulfill({
      status: 200,
      contentType: 'text/css; charset=utf-8',
      body: headStyles,
    }));
  }
  if (process.env.NO_PICKER_BASE === '1') {
    await page.route('**/recipient-picker-v2.js*', route => route.fulfill({
      status: 200,
      contentType: 'application/javascript; charset=utf-8',
      body: '',
    }));
  }
  await page.route('**/recipient-picker-explicit-v2.*', route => {
    const css = route.request().url().endsWith('.css');
    return route.fulfill({
      status: 200,
      contentType: css ? 'text/css' : 'application/javascript',
      body: '',
    });
  });
  await page.goto(`${base}/${portal}.html#create/recipients`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.dataset.recipientScopeV16 === 'ready');
  const result = await page.evaluate(({ device }) => {
    resetCreationState();
    state.preview = device;
    state.step = 3;
    state.page = device === 'mobile' ? 'mobile/recipients' : 'list/create';
    const departments = recipientScopeDefinitions('department')
      .filter(item => item.isLeaf && recipientScopeMembers('department', item.id).length);
    const workgroups = state.portal === 'bureau'
      ? recipientScopeDefinitions('workgroup').filter(item => recipientScopeMembers('workgroup', item.id).length)
      : [];
    const selected = [];
    if (departments[0]) {
      const value = recipientScopeObject('department', departments[0].id);
      state.recipients.set(recipientScopeSelectionKey('department', departments[0].id), value);
      selected.push(value.name);
    }
    if (workgroups[0]) {
      const value = recipientScopeObject('workgroup', workgroups[0].id);
      state.recipients.set(recipientScopeSelectionKey('workgroup', workgroups[0].id), value);
      selected.push(value.name);
    }
    refreshRecipientContractState();
    location.hash = state.page;
    renderShell();
    return { selected, count: recipientCount(), page: state.page };
  }, { device });
  await page.waitForTimeout(250);
  const text = await page.locator('body').innerText();
  for (const name of result.selected) {
    if (!text.includes(name)) throw new Error(`${portal}/${device} missing scope echo: ${name}`);
  }
  if (device === 'mobile' && !text.includes('确认')) throw new Error(`${portal}/mobile missing 确认`);
  return result;
}

(async () => {
  const server = await startStaticServer();
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const errors = [];
  for (const item of captures) {
    const viewport = item.device === 'pc' ? { width: 1440, height: 1000 } : { width: 900, height: 1180 };
    const page = await browser.newPage({ viewportSize: viewport, deviceScaleFactor: 1 });
    page.on('pageerror', error => errors.push(`${item.portal}/${item.device}: ${error.message}`));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(`${item.portal}/${item.device}: ${message.text()}`);
    });
    const result = await prepare(page, item.portal, item.device);
    await page.screenshot({ path: path.join(root, item.file), fullPage: true });
    console.log(`captured ${item.file}: ${result.selected.join(' / ')}; ${result.count} people`);
    if (item.portal === 'bureau' && item.device === 'pc') {
      const prd = page.locator('button', { hasText: /^prd$/i }).first();
      if (!(await prd.count())) throw new Error('recipient PRD button missing');
      await prd.click();
      await page.waitForTimeout(150);
      const dialogText = await page.locator('.prd-dialog,.prd-panel,.prd-document').last().innerText();
      if (!dialogText.includes('完整范围') || !dialogText.includes('发布')) throw new Error('recipient PRD content incomplete');
      await page.screenshot({ path: path.join(root, 'recipient-scope-prd.png'), fullPage: true });
      console.log('captured recipient-scope-prd.png');
    }
    await page.close();
  }
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  if (errors.length) throw new Error(`browser errors:\n${errors.join('\n')}`);
  console.log('recipient scope visual capture passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});

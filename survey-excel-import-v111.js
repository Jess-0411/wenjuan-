/* PC Excel creation. Import drafts share the existing survey lifecycle and IDs. */
(function () {
  'use strict';
  const VERSION = 1, MAX_BYTES = 5 * 1024 * 1024;
  const SHEETS = ['基本信息', '问卷内容'];
  const ORIGINAL_TEMPLATE_BASE64 = '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';
  const FILE_STYLE_HEADERS = {基本信息: ['问卷名称(必填)', '问卷类型(必填)', '问卷说明'], 问卷内容: ['题目类型(必填)', '题目标题(必填)', '是否必填(必填)', '选项(必填)']};
  const HEADERS = {基本信息: ['字段', '内容'], 问卷内容: ['题号', '题型', '题目标题', '是否必填', '选项'], 填写说明: ['填写项目', '规则与示例']};
  const LEGACY_BASIC_HEADERS = ['字段', '内容', '填写要求', '填写示例（不导入）'];
  const LEGACY_TEMPLATE_HEADERS = ['题号（必填）', '题目类型（必填）', '题目标题（必填）', '是否必填（必填）', '选项（单选、多选必填）'];
  const LEGACY_COLUMN_HEADERS = [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}（${index < 2 ? '选择题必填' : '非必填'}）`)];
  const TEMPLATE_HEADERS = {基本信息: ['字段', '内容', '填写要求'], 问卷内容: [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}${index < 2 ? '（选择题必填）' : ''}`)]};
  const BASIC_FIELD_NAMES = {'问卷名称': '问卷名称', '问卷名称（必填）': '问卷名称', '问卷类型': '问卷类型', '问卷类型（必填）': '问卷类型', '问卷说明': '问卷说明', '问卷说明（非必填）': '问卷说明'};
  const TYPES = ['填空', '单选', '多选', '日期', '文件/图片', '签名', '位置'];
  const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
  const errorRow = (sheet, row, column, message) => ({sheet, row: row || '', column: column || '', message, field: column || '', reason: message});
  const imported = survey => survey?.creationSource === 'excel' && survey.excelImportVersion === VERSION;
  let dialog = null, generation = 0, transactionDepth = 0, installed = false, restoring = false, loadAdapter = null, creationSessionId = null;
  const persisted = new Map();

  function track(event, details = {}) {
    const record = {event: event.startsWith('survey_') ? event : `survey_${event}`, portal: state.portal, device: state.preview, org: CONFIG[state.portal]?.org || '',
      user_id: typeof currentRecipientPersonId === 'function' ? currentRecipientPersonId() : '', template_version: 'V1.11', timestamp: typeof formatSystemTime === 'function' ? formatSystemTime() : new Date().toISOString(), ...details};
    window.__surveyExcelEvents = window.__surveyExcelEvents || [];
    window.__surveyExcelEvents.push(record);
    return record;
  }
  function storageKey(portal = state.portal) {
    const config = CONFIG[portal];
    if (!config) throw new Error('当前组织不可用');
    return `survey-excel-v111:${portal}:${encodeURIComponent(config.org)}:${encodeURIComponent(config.user)}`;
  }
  function owns(survey, portal) {
    return imported(survey) && survey.owner === CONFIG[portal]?.user.split(' · ')[0];
  }
  function serialized(portal, records = CONFIG[portal].surveys.filter(survey => owns(survey, portal))) {
    return JSON.stringify({version: VERSION, portal, org: CONFIG[portal].org, user: CONFIG[portal].user, records});
  }
  function persistAll() {
    if (restoring) return;
    const changes = Object.keys(CONFIG).map(portal => ({portal, key: storageKey(portal), value: serialized(portal)}))
      .filter(item => item.value !== persisted.get(item.key) && (CONFIG[item.portal].surveys.some(survey => owns(survey, item.portal)) || persisted.has(item.key)));
    const written = [];
    try {
      changes.forEach(item => {
        const previous = localStorage.getItem(item.key);
        localStorage.setItem(item.key, item.value);
        written.push({...item, previous});
      });
    } catch (error) {
      written.reverse().forEach(item => { try { item.previous == null ? localStorage.removeItem(item.key) : localStorage.setItem(item.key, item.previous); } catch {} });
      throw new Error('草稿保存失败，请检查浏览器存储空间后重试');
    }
    changes.forEach(item => persisted.set(item.key, item.value));
  }
  function restorePersisted() {
    restoring = true;
    try {
      Object.keys(CONFIG).forEach(portal => {
        const key = storageKey(portal);
        let raw;
        try { raw = localStorage.getItem(key); } catch { return; }
        if (!raw) return;
        try {
          const saved = JSON.parse(raw);
          if (saved.version !== VERSION || saved.portal !== portal || saved.org !== CONFIG[portal].org || saved.user !== CONFIG[portal].user || !Array.isArray(saved.records)) throw new Error('schema');
          const ids = new Set();
          const rows = saved.records.filter(survey => {
            const valid = owns(survey, portal) && Number.isSafeInteger(survey.id) && survey.id > 0 && !ids.has(survey.id)
              && ['draft', 'not_started', 'running', 'paused', 'ended'].includes(survey.status)
              && typeof survey.title === 'string' && Array.isArray(survey.questions) && survey.questions.length > 0 && survey.questions.length <= 100;
            if (valid) ids.add(survey.id);
            return valid;
          });
          rows.forEach(savedSurvey => {
            const index = CONFIG[portal].surveys.findIndex(survey => survey.id === savedSurvey.id);
            if (index < 0) CONFIG[portal].surveys.unshift(clone(savedSurvey));
            else if (owns(CONFIG[portal].surveys[index], portal)) Object.assign(CONFIG[portal].surveys[index], clone(savedSurvey));
          });
          persisted.set(key, serialized(portal));
        } catch {
          track('excel_draft_restore_failed', {restore_portal: portal, reason: 'invalid_storage'});
        }
      });
    } finally { restoring = false; }
  }
  function snapshot() {
    return {state: typeof structuredClone === 'function' ? structuredClone(state) : cloneState(state),
      records: Object.fromEntries(Object.entries(CONFIG).map(([portal, config]) => [portal, config.surveys.map(survey => ({reference: survey, value: clone(survey)}))]))};
  }
  function cloneState(value) {
    if (value instanceof Map) return new Map([...value].map(([key, item]) => [key, cloneState(item)]));
    if (value instanceof Set) return new Set([...value].map(cloneState));
    if (Array.isArray(value)) return value.map(cloneState);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneState(item)]));
    return value;
  }
  function rollback(saved) {
    Object.keys(state).forEach(key => { if (!Object.hasOwn(saved.state, key)) delete state[key]; });
    Object.assign(state, saved.state);
    Object.entries(saved.records).forEach(([portal, rows]) => {
      rows.forEach(({reference, value}) => {
        Object.keys(reference).forEach(key => { if (!Object.hasOwn(value, key)) delete reference[key]; });
        Object.assign(reference, value);
      });
      CONFIG[portal].surveys.splice(0, CONFIG[portal].surveys.length, ...rows.map(row => row.reference));
    });
  }
  function transaction(action, rethrow = false) {
    if (transactionDepth) return action();
    const before = snapshot(), messages = [], originalToast = toast;
    transactionDepth++;
    toast = message => messages.push(message);
    try {
      const result = action();
      persistAll();
      toast = originalToast;
      messages.forEach(message => originalToast(message));
      return result;
    } catch (error) {
      rollback(before);
      toast = originalToast;
      track('excel_draft_save_failed', {reason: 'storage_or_save'});
      if (rethrow) throw error;
      if (state.portal) renderShell();
      originalToast(error.message || '草稿保存失败，请重试');
      return false;
    } finally { toast = originalToast; transactionDepth--; }
  }
  function macroWorkbook(book) {
    return Boolean(book?.vbaraw?.length
      || Object.values(book?.Sheets || {}).some(sheet => sheet['!type'] === 'macro')
      || (book?.keys || Object.keys(book?.files || {})).some(key => /vbaProject|macrosheets|xl\/intlmacrosheets/i.test(key)));
  }
  function installLoadAdapter() {
    if (typeof loadEditableSurveyState !== 'function' || loadEditableSurveyState === loadAdapter) return;
    const baseLoad = loadEditableSurveyState;
    loadAdapter = function (survey) { const result = baseLoad(survey); if (imported(survey)) state.draftDescription = survey.description || ''; return result; };
    loadEditableSurveyState = loadAdapter;
  }
  function readRows(sheet, name, width, errors, metadata = new Set()) {
    const rows = new Map(), cells = Object.keys(sheet || {}).filter(key => /^[A-Z]+[1-9][0-9]*$/.test(key));
    if (cells.length > 20000) { errors.push(errorRow(name, '', '', '工作表内容超出模板容量')); return []; }
    cells.forEach(address => {
      const cell = sheet[address], coordinate = XLSX.utils.decode_cell(address), value = cell?.v == null ? '' : String(cell.v).trim();
      if (cell?.f) errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '不支持公式，请粘贴为文本或数值'));
      if (metadata.has(address)) return;
      if (!value) return;
      if (coordinate.c >= width) { errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '存在模板以外的列，请使用下载模板')); return; }
      if (!rows.has(coordinate.r)) rows.set(coordinate.r, Array(width).fill(''));
      rows.get(coordinate.r)[coordinate.c] = value;
    });
    return [...rows].sort((left, right) => left[0] - right[0]).map(([index, values]) => ({row: index + 1, values}));
  }
  function templateMetadataCells(book) {
    const cells = new Set(), sheet = book.Sheets.基本信息;
    for (const [name, column, heading] of [['SurveyImportTypes','AA','问卷类型选项'],['SurveyQuestionTypes','AB','题目类型选项'],['SurveyRequiredValues','AC','是否必填选项']]) {
      const names = (book.Workbook?.Names || []).filter(item => item.Name === name && item.Sheet == null);
      if (names.length !== 1 || String(sheet[`${column}1`]?.v || '') !== heading) continue;
      const ref = String(names[0].Ref || '').replace(/^=/, ''), match = ref.match(/^(?:'基本信息'|基本信息)!\$?([A-Z]+)\$?2:\$?([A-Z]+)\$?([0-9]+)$/);
      if (!match || match[1] !== column || match[2] !== column || Number(match[3]) < 2 || Number(match[3]) > 20000) continue;
      for (let row = 1; row <= Number(match[3]); row++) cells.add(`${column}${row}`);
    }
    return cells;
  }
  function parseWorkbook(book, options = {}) {
    const portal = options.portal || state.portal, errors = [];
    if (!CONFIG[portal]) return {ok: false, errors: [errorRow('文件', '', '', '当前端不可用')]};
    if (macroWorkbook(book)) return {ok: false, errors: [errorRow('文件', '', '', '不支持含宏的 Excel 文件，请使用无宏模板')]};
    if (!book || !Array.isArray(book.SheetNames) || ![2,3].includes(book.SheetNames.length) || new Set(book.SheetNames).size !== book.SheetNames.length || SHEETS.some(name => !book.SheetNames.includes(name) || !book.Sheets?.[name]) || book.SheetNames.some(name => ![...SHEETS,'填写说明','Sheet3'].includes(name))) {
      return {ok: false, errors: [errorRow('文件', '', '', '模板结构错误，必须包含“基本信息”“问卷内容”；兼容保留“填写说明”的旧版模版')]};
    }
    if (book.SheetNames.includes('Sheet3') && (!book.Sheets?.Sheet3 || Object.entries(book.Sheets.Sheet3).some(([address, cell]) => /^[A-Z]+[1-9][0-9]*$/.test(address) && (cell?.f || String(cell?.v ?? '').trim())))) {
      errors.push(errorRow('Sheet3', '', '', '参考文件附带的 Sheet3 必须为空，请将问卷数据填写到指定工作表'));
    }
    if (book.SheetNames.includes('填写说明') && (!book.Sheets?.填写说明 || HEADERS.填写说明.some((value,index) => String(book.Sheets.填写说明[XLSX.utils.encode_cell({r:0,c:index})]?.v || '').trim() !== value))) {
      errors.push(errorRow('填写说明', 1, '表头', '旧版填写说明表头必须为填写项目、规则与示例'));
    }
    const data = {};
    let basicLabels = [];
    let columnOptions = false;
    SHEETS.forEach(name => {
      const headers = HEADERS[name];
      const sheet = book.Sheets[name], displayed = TEMPLATE_HEADERS[name];
      const normalizeHeader = value => String(value ?? '').trim().replace(/（/g, '(').replace(/）/g, ')');
      const fileStyle = FILE_STYLE_HEADERS[name].every((value, index) => normalizeHeader(sheet[XLSX.utils.encode_cell({r: 2, c: index})]?.v) === value);
      if (fileStyle || String(sheet.A1?.v || '').trim() === '问卷导入模板') {
        if (!fileStyle) errors.push(errorRow(name, 3, '表头', '请保留下载模板第3行表头及必填标识'));
        const metadata = name === '基本信息' ? templateMetadataCells(book) : new Set();
        metadata.add('A1'); metadata.add('A2');
        const rows = readRows(sheet, name, FILE_STYLE_HEADERS[name].length, errors, metadata);
        rows.filter(item => item.row < 3).forEach(item => errors.push(errorRow(name, item.row, '', '标题及填写须知区域仅允许左上角填写内容')));
        const allowedMerges = name === '基本信息' ? ['A1:C1','A2:C2'] : ['A1:D1','A2:D2'];
        if ((sheet['!merges'] || []).some(range => !allowedMerges.includes(XLSX.utils.encode_range(range)))) errors.push(errorRow(name, '', '', '仅允许标题行和填写须知行合并，表头及数据行不得合并'));
        const content = rows.filter(item => item.row > 3);
        if (name === '基本信息') {
          basicLabels = ['问卷名称','问卷类型','问卷说明'];
          if (content.length > 1) errors.push(errorRow(name, content[1].row, '', '基本信息仅允许填写一行数据'));
          const entry = content[0] || {row: 4, values: []};
          data[name] = basicLabels.map((field, index) => ({row: entry.row, values: [field, entry.values[index] || '']}));
        } else {
          columnOptions = false;
          data[name] = content.map((entry, index) => ({row: entry.row, values: [String(index + 1), ...entry.values]}));
        }
        return;
      }
      const matchesHeader = expected => expected.every((value, index) => String(sheet[XLSX.utils.encode_cell({r: 0, c: index})]?.v || '').trim() === value);
      const schemas = name === '基本信息' ? [LEGACY_BASIC_HEADERS, displayed, headers] : [displayed, LEGACY_COLUMN_HEADERS, LEGACY_TEMPLATE_HEADERS, headers];
      const accepted = schemas.find(matchesHeader);
      if (name === '基本信息') {
        basicLabels = accepted?.length === 4 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明（非必填）'] : accepted?.length === 3 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明'] : ['问卷名称','问卷类型','问卷说明'];
      }
      if (name === '问卷内容') columnOptions = accepted?.length === 24;
      const metadata = name === '基本信息' && accepted?.length === 3 ? templateMetadataCells(book) : new Set();
      const rows = readRows(sheet, name, (accepted || headers).length, errors, metadata), header = rows.find(row => row.row === 1);
      if (!header || !accepted) errors.push(errorRow(name, 1, '表头', `请保留下载模版表头；兼容原表头：${headers.join('、')}`));
      if (book.Sheets[name]['!merges']?.length) errors.push(errorRow(name, '', '', '数据工作表不支持合并单元格'));
      data[name] = rows.filter(row => row.row > 1);
    });
    const basic = {}, allowed = ['问卷名称', '问卷类型', '问卷说明'];
    data.基本信息.forEach(({row, values}) => {
      const [displayedField, value] = values, field = BASIC_FIELD_NAMES[displayedField];
      if (!basicLabels.includes(displayedField)) {
        errors.push(errorRow('基本信息', row, '字段', '请保留当前模板基本信息字段名称及必填标识，不混用新旧字段')); return;
      }
      if (!allowed.includes(field)) { errors.push(errorRow('基本信息', row, '字段', '字段必须为问卷名称、问卷类型或问卷说明')); return; }
      if (basic[field]) { errors.push(errorRow('基本信息', row, '字段', '字段重复')); return; }
      basic[field] = {value, row};
    });
    allowed.forEach(field => { if (!basic[field]) errors.push(errorRow('基本信息', '', field, '缺少模板字段')); });
    const title = basic.问卷名称?.value || '', description = basic.问卷说明?.value || '', typeName = basic.问卷类型?.value || '';
    if (!title || title.length > 50) errors.push(errorRow('基本信息', basic.问卷名称?.row, '问卷名称', '必填，长度为 1～50 个字符'));
    if (description.length > 500) errors.push(errorRow('基本信息', basic.问卷说明?.row, '问卷说明', '最多 500 个字符'));
    const types = CONFIG[portal].surveyTypes.filter(type => type.name === typeName);
    if (!typeName || types.length !== 1) errors.push(errorRow('基本信息', basic.问卷类型?.row, '问卷类型', !typeName ? '请选择当前端有效的问卷类型名称' : types.length > 1 ? '问卷类型名称不唯一，请联系管理员' : '问卷类型不存在或已失效，请填写当前端有效名称'));
    const questions = [], numbers = new Set(), contentRows = data.问卷内容;
    if (!contentRows.length || contentRows.length > 100) errors.push(errorRow('问卷内容', '', '题量', '单份问卷必须包含 1～100 道题'));
    contentRows.forEach(({row, values}) => {
      const [numberText, type, questionTitle, requiredText, ...optionCells] = values, number = Number(numberText);
      if (!/^[1-9][0-9]*$/.test(numberText) || number > 100) errors.push(errorRow('问卷内容', row, '题号', '题号必须为 1～100 的整数'));
      else if (numbers.has(number)) errors.push(errorRow('问卷内容', row, '题号', '题号重复'));
      numbers.add(number);
      if (!TYPES.includes(type)) errors.push(errorRow('问卷内容', row, '题型', `仅支持：${TYPES.join('、')}`));
      if (!['是', '否'].includes(requiredText)) errors.push(errorRow('问卷内容', row, '是否必填', '必须填写“是”或“否”'));
      const choice = ['单选', '多选'].includes(type), optionText = optionCells[0] || '';
      const lastOption = optionCells.reduce((last, value, index) => value ? index : last, -1);
      const optionsList = columnOptions ? optionCells.slice(0, lastOption + 1) : optionText ? optionText.split(/\r\n?|\n/).map(value => value.trim()) : [];
      const problem = typeof questionValidationError === 'function' ? questionValidationError(questionTitle, type, optionsList) : '';
      if (problem) errors.push(errorRow('问卷内容', row, choice && /选项/.test(problem) ? '选项' : '题目标题', problem));
      if (choice && columnOptions) optionsList.forEach((value, index) => {
        if (!value) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '请从选项1开始连续填写，不得跳过中间选项'));
        if (/[\r\n]/.test(value)) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项单独填写一格，请将下一选项移至右侧列'));
        if (value.length > 50) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项最多50个字符'));
      });
      if (choice && !columnOptions && optionsList.some(value => !value)) errors.push(errorRow('问卷内容', row, '选项', '选项不得包含空白行'));
      if (!choice && (columnOptions ? lastOption >= 0 : optionText)) errors.push(errorRow('问卷内容', row, '选项', '非选择题的选项必须全部留空'));
      questions.push({id: `excel-row-${number}`, number, type, title: questionTitle, required: requiredText === '是',
        options: choice ? optionsList : [], imageOnly: false, includeTime: false, jumpEnabled: false, jumpRules: []});
    });
    if (contentRows.length && [...numbers].some(number => !Number.isInteger(number) || number < 1 || number > contentRows.length) || numbers.size !== contentRows.length) {
      errors.push(errorRow('问卷内容', '', '题号', '题号必须从 1 开始连续编号且不重复'));
    }
    if (errors.length) return {ok: false, errors};
    questions.sort((left, right) => left.number - right.number).forEach(question => { delete question.number; });
    const basicValue = {title, description, surveyTypeId: types[0].id, surveyTypeName: types[0].name};
    return {ok: true, errors: [], value: {...basicValue, questions}, basic: basicValue, questions};
  }
  function buildTemplateWorkbook(portal = state.portal) {
    return XLSX.read(buildTemplateBytes(portal), {type: 'array', cellStyles: true});
  }
  function buildTemplateBytes() {
    // Return the user's original workbook byte for byte. Do not rebuild or patch it.
    return Uint8Array.from(atob(ORIGINAL_TEMPLATE_BASE64), character => character.charCodeAt(0));
  }
  function saveTemplateBytes(bytes) {
    const blob=new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='问卷调研模板.xlsx';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }
  function downloadTemplate() {
    if (state.preview !== 'pc') return false;
    try { saveTemplateBytes(buildTemplateBytes()); track('excel_template_download', {result: 'success', template_version:'original-file-1'}); return true; }
    catch (error) { track('excel_template_download', {result: 'failed'}); toast(error.message || '模板下载失败，请重试'); return false; }
  }
  async function readFile(file, options = {}) {
    options.onProgress?.('正在读取文件');
    if (!file || !/\.(xlsx|xls)$/i.test(file.name || '')) return {ok: false, errors: [errorRow('文件', '', '', '仅支持 .xlsx、.xls 文件')]};
    if (!file.size || file.size > MAX_BYTES) return {ok: false, errors: [errorRow('文件', '', '', file.size ? '文件不能超过 5 MB' : '文件内容为空')]};
    if (typeof XLSX === 'undefined') return {ok: false, errors: [errorRow('文件', '', '', 'Excel 组件加载失败，请刷新后重试')]};
    try {
      const buffer = await file.arrayBuffer(), bytes = new Uint8Array(buffer);
      if (!bytes.length || bytes.length > MAX_BYTES) throw new Error('文件大小无效');
      const compound = bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
      let directory = '';
      if (compound) for (let index = 0; index < bytes.length; index += 2) directory += String.fromCharCode(bytes[index] | ((bytes[index + 1] || 0) << 8));
      if (compound && (/\.xlsx$/i.test(file.name) || /EncryptedPackage|EncryptionInfo/.test(directory))) return {ok: false, errors: [errorRow('文件', '', '', '不支持密码保护或加密文件，请解除保护后上传')]};
      const zip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      const biff = bytes[0] === 0x09 && [0x00, 0x02, 0x04, 0x08].includes(bytes[1]);
      if ((!zip && !compound && !biff) || (/\.xlsx$/i.test(file.name) && !zip)) throw new Error('文件不是有效的 Excel 工作簿');
      options.onProgress?.('正在解析工作簿');
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (options.cancelled?.()) return null;
      const book = XLSX.read(buffer, {type: 'array', bookVBA: true, bookFiles: true, cellFormula: true});
      options.onProgress?.('正在校验基本信息与问卷内容');
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (options.cancelled?.()) return null;
      return parseWorkbook(book, options);
    } catch (error) {
      return {ok: false, errors: [errorRow('文件', '', '', /password|encrypt|FilePass/i.test(error.message || '') ? '不支持密码保护或加密文件，请解除保护后上传' : '文件读取失败，请检查文件是否损坏并使用下载模板')]};
    }
  }
  function commitDraft(result) {
    if (state.preview !== 'pc') throw new Error('请在 PC 端导入问卷');
    const value = result?.ok ? result.value : result;
    if (!value || !value.title || value.title.length > 50 || value.description?.length > 500 || !Array.isArray(value.questions) || !value.questions.length || value.questions.length > 100) throw new Error('导入内容校验未通过');
    const matches = CONFIG[state.portal].surveyTypes.filter(type => String(type.id) === String(value.surveyTypeId) && type.name === value.surveyTypeName);
    if (matches.length !== 1) throw new Error('问卷类型已失效，请重新上传文件');
    value.questions.forEach(question => { const problem = questionValidationError(question.title, question.type, question.options); if (!TYPES.includes(question.type) || problem) throw new Error(problem || '题型无效'); });
    const portal = state.portal;
    const saved = transaction(() => {
      resetCreationState();
      state.draftTitle = value.title; state.draftDescription = value.description || '';
      state.draftSurveyTypeId = String(matches[0].id); state.draftSurveyTypeName = matches[0].name;
      state.questions = typeof SurveyRouting !== 'undefined' ? SurveyRouting.cloneQuestions(value.questions, true) : cloneQuestions(value.questions);
      let id = Date.now(); while (Object.values(CONFIG).some(config => config.surveys.some(survey => survey.id === id))) id++;
      const payload = draftPayload(), survey = {id, ...payload, creationSource: 'excel', excelImportVersion: VERSION,
        owner: CONFIG[portal].user.split(' · ')[0], createdAt: formatSystemTime(), deleted: 0, status: 'draft', statusText: '草稿'};
      CONFIG[portal].surveys.unshift(survey);
      state.editingSurveyId = id; state.preserveSurveyTypeSnapshot = true; state.step = 1;
      state.page = 'list/create'; state.listView = 'published';
      return survey;
    }, true);
    creationSessionId = saved.id;
    return saved;
  }

  function renderDialog() {
    if (!dialog) return;
    const current = dialog, uploading = current.phase === 'upload', saving = current.phase === 'saving', validating = current.phase === 'validating';
    const summary = current.phase === 'ready' ? `<div class="survey-excel-success" role="status"><b>校验通过</b><br>问卷名称：${escape(current.parsed.value.title)}<br>题目数量：${current.parsed.value.questions.length} 道<br>确认导入后才创建并保存草稿；接收人员和收集设置需手动配置。</div>` : '';
    const errors = current.errors.length ? `<div class="survey-excel-errors" role="alert"><b>共 ${current.errors.length} 项问题，本次未创建草稿</b><div class="survey-excel-error-table"><table><thead><tr><th>页面（工作表）</th><th>第几行</th><th>问题原因</th></tr></thead><tbody>${current.errors.map(error => `<tr><td>${escape(error.sheet)}</td><td>${escape(error.row || '—')}</td><td>${escape([error.column || error.field, error.message || error.reason].filter(Boolean).join('：'))}</td></tr>`).join('')}</tbody></table></div></div>` : '';
    const uploadBody = `<button type="button" class="btn" data-excel-download>下载模版</button><label class="survey-excel-upload"><input type="file" accept=".xlsx,.xls" data-excel-file><strong>${current.file ? escape(current.file.name) : '点击选择 Excel 文件'}</strong><span>${current.file ? `${(current.file.size / 1024).toFixed(1)} KB · 可点击重新选择` : '支持 .xlsx、.xls，文件不超过 5 MB'}</span></label><p class="survey-excel-note">选择文件后点击“开始导入”进行完整校验。导入成功后进入第 1 步，日期时分、仅图片和选项跳转可在问卷设计中继续设置。</p>`;
    const resultBody = `<div class="survey-excel-file-info"><span>导入文件</span><strong>${escape(current.file?.name || '')}</strong></div><div class="survey-excel-progress" role="status" aria-live="polite"><div><b>${escape(current.stage)}</b><span>${validating || saving ? '处理中' : '100%'}</span></div><progress ${validating || saving ? '' : 'value="100"'} max="100" aria-label="导入处理进度"></progress></div>${validating ? '<p class="survey-excel-note">正在读取、解析并校验文件；校验完成后需确认导入。本阶段可取消，不创建草稿。</p>' : ''}${summary}${errors}`;
    const action = uploading ? `<button type="button" class="btn primary" data-excel-start ${current.file ? '' : 'disabled'}>开始导入</button>`
      : current.phase === 'invalid' ? '<button type="button" class="btn primary" data-excel-retry>重新导入</button>'
      : `<button type="button" class="btn primary" data-excel-confirm ${current.phase !== 'ready' ? 'disabled' : ''}>${saving ? '正在保存…' : validating ? '校验中…' : '确认导入'}</button>`;
    current.layer.innerHTML = `<section class="survey-excel-dialog" role="dialog" aria-modal="true" aria-labelledby="survey-excel-title" data-prd-overlay="excel-import" data-excel-phase="${current.phase}"><header><h2 id="survey-excel-title">Excel 导入${uploading ? '' : ' · 校验与结果'}</h2><button type="button" class="survey-excel-close" data-excel-close aria-label="关闭 Excel 导入" ${saving ? 'disabled' : ''}>×</button></header><div class="survey-excel-body">${uploading ? uploadBody : resultBody}</div><footer><button type="button" class="btn" data-excel-close ${saving ? 'disabled' : ''}>取消</button>${action}</footer></section>`;
    current.layer.querySelectorAll('[data-excel-close]').forEach(button => button.onclick = () => close('button'));
    const bind = (selector, callback) => { const button = current.layer.querySelector(selector); if (button) button.onclick = callback; };
    bind('[data-excel-download]', downloadTemplate); bind('[data-excel-start]', startImport); bind('[data-excel-retry]', retryImport); bind('[data-excel-confirm]', confirmImport);
    const input = current.layer.querySelector('[data-excel-file]'); if (input) input.onchange = event => selectFile(event.target.files?.[0]);
    if (typeof decorateOverlay === 'function') decorateOverlay(current.layer.querySelector('.survey-excel-dialog'), 'excel-import');
  }
  function open(trigger = null) {
    if (state.preview !== 'pc' || dialog) return false;
    state.createSurveyMenuOpen = false; renderShell();
    const layer = document.createElement('div'); layer.className = 'survey-excel-mask';
    dialog = {layer, trigger, file: null, parsed: null, errors: [], phase: 'upload', stage: '', busy: false, token: ++generation, context: `${state.portal}:${CONFIG[state.portal].org}:${CONFIG[state.portal].user}`};
    layer.onclick = event => { if (event.target === layer) close('mask'); };
    document.body.appendChild(layer); renderDialog();
    layer.querySelector('[data-excel-download]')?.focus(); track('excel_import_open'); return true;
  }
  function close(method = 'button') {
    if (!dialog) return;
    if (dialog.phase === 'saving' && !['success', 'context_change'].includes(method)) return false;
    const current = dialog; dialog = null; generation++;
    current.layer.remove();
    if (method !== 'success') track('excel_import_cancel', {close_method: method});
    if (current.trigger?.isConnected) current.trigger.focus();
    else document.querySelector('[data-create-survey-menu-toggle]')?.focus();
  }
  function selectFile(file) {
    if (!dialog || dialog.phase !== 'upload' || !file) return false;
    const current = dialog;
    current.file = file; current.parsed = null; current.errors = []; renderDialog();
    track('excel_import_file_select', {file_size: file.size, file_type: String(file.name || '').split('.').pop().toLowerCase()});
    return true;
  }
  async function startImport() {
    if (!dialog || dialog.phase !== 'upload' || !dialog.file) return false;
    const current = dialog, token = ++generation, portal = state.portal;
    current.token = token; current.phase = 'validating'; current.busy = true; current.stage = '正在读取文件'; renderDialog();
    const cancelled = () => dialog !== current || current.token !== token || generation !== token;
    track('excel_import_validate_start');
    const startedAt = Date.now();
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (cancelled()) return false;
    const parsed = await readFile(current.file, {portal, cancelled, onProgress(stage) { if (!cancelled()) { current.stage = stage; renderDialog(); } }});
    if (dialog !== current || current.token !== token || generation !== token) return false;
    current.busy = false; current.parsed = parsed; current.errors = parsed.errors; current.phase = parsed.ok ? 'ready' : 'invalid'; current.stage = parsed.ok ? '校验完成' : '校验失败'; renderDialog();
    track('excel_import_validate', {result: parsed.ok ? 'success' : 'failed', error_count: parsed.errors.length});
    track(parsed.ok ? 'excel_import_validate_pass' : 'excel_import_validate_fail', {error_count: parsed.errors.length, duration_ms: Date.now() - startedAt});
    return parsed;
  }
  function retryImport() {
    if (!dialog || dialog.phase !== 'invalid') return false;
    const trigger = dialog.trigger; track('excel_import_retry'); close('retry'); return open(trigger);
  }
  async function confirmImport() {
    if (!dialog || dialog.phase !== 'ready' || !dialog.parsed?.ok) return false;
    const current = dialog;
    if (current.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}` || state.preview !== 'pc') { close('context_change'); return false; }
    current.busy = true; current.phase = 'saving'; current.stage = '正在保存草稿'; renderDialog();
    track('excel_import_confirm_save', {question_count: current.parsed.value.questions.length});
    const startedAt = Date.now();
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (dialog !== current) return false;
      const survey = commitDraft(current.parsed);
      close('success'); location.hash = 'list/create'; renderShell();
      toast('导入成功，草稿已保存'); track('excel_import_result', {result: 'success', error_code: '', error_count: 0, duration_ms: Date.now() - startedAt, survey_id: survey.id, question_count: survey.questions.length}); return survey;
    } catch (error) {
      current.busy = false; current.phase = 'invalid'; current.stage = '保存失败'; current.errors = [errorRow('保存', '', '', error.message || '草稿保存失败，请重试')]; renderDialog();
      track('excel_import_result', {result: 'failed', reason: 'save', error_code: 'save', error_count: 1, question_count: current.parsed?.value?.questions?.length || 0, duration_ms: Date.now() - startedAt}); return false;
    }
  }
  function install() {
    if (installed || typeof state === 'undefined') return;
    installed = true; restorePersisted();
    const baseCreate = createPage;
    createPage = function (...args) {
      const html = baseCreate(...args);
      return state.preview === 'pc' && creationSessionId === state.editingSurveyId && state.page === 'list/create'
        ? html.replace(/(<h[12][^>]*>)编辑问卷(<\/h[12]>)/, '$1新增问卷$2') : html;
    };
    const baseMenu = createSurveyMenu;
    createSurveyMenu = function () {
      const html = baseMenu();
      return state.preview === 'pc' ? html.replace(/(<button\b[^>]*data-create-survey-template\b[^>]*>[\s\S]*?<\/button>)/,
        '$1<button type="button" role="menuitem" data-create-survey-excel><b>Excel 导入</b></button>') : html;
    };
    const baseSave = saveDraftSurvey;
    saveDraftSurvey = function () {
      const existing = CONFIG[state.portal]?.surveys.find(survey => survey.id === state.editingSurveyId);
      return imported(existing) ? transaction(() => baseSave()) : baseSave();
    };
    installLoadAdapter();
    const baseModal = modal;
    modal = function (title, text, ok, callback, ...rest) {
      return baseModal(title, text, ok, typeof callback === 'function' ? () => Object.values(CONFIG).some(config => config.surveys.some(imported)) ? transaction(callback) : callback() : callback, ...rest);
    };
    const baseRender = renderShell;
    renderShell = function () {
      if (dialog && (state.preview !== 'pc' || dialog.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}`)) close('context_change');
      const result = baseRender();
      if (!transactionDepth) { try { persistAll(); } catch (error) { track('excel_draft_save_failed', {reason: 'storage'}); toast(error.message); } }
      return result;
    };
    document.addEventListener('click', event => {
      const button = event.target?.closest?.('[data-create-survey-excel]');
      if (!button) return; event.preventDefault(); event.stopImmediatePropagation(); open(button);
    }, true);
    document.addEventListener('keydown', event => {
      if (!dialog) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close('escape'); return; }
      if (event.key !== 'Tab') return;
      const controls = [...dialog.layer.querySelectorAll('button:not([disabled]),input:not([disabled])')], first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }, true);
    window.addEventListener('hashchange', () => { if (dialog) close('route_change'); if (location.hash !== '#list/create') creationSessionId = null; });
    if (document.documentElement?.dataset) document.documentElement.dataset.surveyExcelImport = 'v111';
  }
  window.SurveyExcelV111 = {version: VERSION, MAX_BYTES, SHEETS, HEADERS, TEMPLATE_HEADERS, FILE_STYLE_HEADERS, TYPES, parseWorkbook, parse: parseWorkbook,
    readFile, read: readFile, buildTemplateWorkbook, buildTemplateBytes, saveTemplateBytes, downloadTemplate, commitDraft, storageKey, persistAll, restorePersisted,
    open, close, selectFile, startImport, retryImport, confirmImport, install, getDialog: () => dialog};
  // Register after compatibility scripts; install after their DOMContentLoaded restores.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', () => { install(); installLoadAdapter(); });
})();

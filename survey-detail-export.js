'use strict';

/* Full-questionnaire answer exports deliberately bypass the person/date based
 * statistics helpers. They read stored response records and never synthesize answers. */
const surveyDetailExportJobs = new Set();
const SURVEY_DETAIL_EXPORT_MESSAGES = {
  permission: '问卷不存在或无权导出',
  schema: '问卷题目与答卷数据不一致，请联系管理员',
  capacity: '导出数据超出 Excel 容量限制，请联系管理员',
  generation: '导出失败，请重试',
};

function surveyDetailExportError(code) {
  const error = new Error(SURVEY_DETAIL_EXPORT_MESSAGES[code] || SURVEY_DETAIL_EXPORT_MESSAGES.generation);
  error.exportCode = code;
  return error;
}

function surveyDetailExportButton(s, sourcePage) {
  if (state.preview !== 'pc' || !s || s.deleted === 1 || !['not_started', 'running', 'paused', 'ended'].includes(s.status)) return '';
  const busy = surveyDetailExportJobs.has(`${state.portal}:${s.id}`);
  return `<button type="button" class="link-btn" data-action="export-survey-detail" data-survey-id="${esc(s.id)}" data-export-source="${esc(sourcePage)}"${busy ? ' disabled aria-busy="true"' : ''}>${busy ? '导出中…' : '导出明细'}</button>`;
}

function surveyDetailExportKind(q) {
  const knownKind = ['text', 'single', 'multiple', 'date', 'file', 'signature', 'location'].includes(q.kind);
  if (q.type) {
    const kind = questionKind(q.type);
    if (knownKind && q.kind !== kind) throw surveyDetailExportError('schema');
    return kind;
  }
  if (!knownKind) throw surveyDetailExportError('schema');
  return q.kind;
}

function surveyDetailExportQuestions(s) {
  const questions = Array.isArray(s?.publishedQuestions) ? s.publishedQuestions : s?.questions;
  if (!Array.isArray(questions) || !questions.length || questions.some(q => !q || typeof q.title !== 'string' || !q.title.trim() || !(q.type || q.kind))) throw surveyDetailExportError('schema');
  questions.forEach(surveyDetailExportKind);
  const ids = questions.filter(q => q.id != null && q.id !== '').map(q => String(q.id));
  if (new Set(ids).size !== ids.length) throw surveyDetailExportError('schema');
  return questions;
}

function surveyDetailExportRecords(s) {
  const primary = MY_RESPONSES[state.portal]?.[s.id] || [];
  const containers = [primary, s.internalResponseRecords || [], s.respondentRecords || [], s.detailExportDemoRecords || []];
  if (containers.some(records => !Array.isArray(records))) throw surveyDetailExportError('schema');
  const seen = new Set(), records = [];
  containers.forEach(items => items.forEach(record => {
    if (!record || typeof record !== 'object') throw surveyDetailExportError('schema');
    const id = record.id ?? record.responseId;
    // A primary invalid record also prevents a stale embedded copy from resurfacing.
    if (id != null && id !== '') {
      const key = String(id);
      if (seen.has(key)) return;
      seen.add(key);
    }
    if (record.valid === false) return;
    if (record.surveyId != null && String(record.surveyId) !== String(s.id)) throw surveyDetailExportError('schema');
    records.push(record);
  }));
  return records.sort((a, b) => {
    const left = String(a.submittedAt || ''), right = String(b.submittedAt || '');
    return (left && right ? right.localeCompare(left) : left ? -1 : right ? 1 : 0)
      || String(a.id ?? a.responseId ?? '').localeCompare(String(b.id ?? b.responseId ?? ''));
  });
}

function surveyDetailExportImageLinks(q, value) {
  const candidates = Array.isArray(value) ? value : [value], links = [];
  candidates.forEach(candidate => {
    const attachment = candidate && typeof candidate === 'object' ? candidate : null;
    const savedUrl = attachment ? attachment.url : candidate;
    if (typeof savedUrl !== 'string' || !savedUrl.trim()) return;
    const raw = savedUrl.trim();
    // Legacy upload names are not URLs. Do not invent a file-hosting address.
    if (!attachment && !/^(https?:)?\/\//i.test(raw) && !raw.includes('/')) return;
    let url;
    try { url = new URL(raw, location.href); } catch { return; }
    if (!['http:', 'https:'].includes(url.protocol)) return;
    let pathname = url.pathname;
    try { pathname = decodeURIComponent(pathname); } catch { return; }
    const fileName = String(attachment?.name || attachment?.fileName || '');
    const fileExtension = /\.(pdf|ofd|doc[xm]?|dot[xm]?|xls[xmb]?|xlt[xm]?|ppt[xm]?|pot[xm]?|pps[xm]?|od[tsfp]|ot[tsp]|rtf|txt|csv|epub|mobi|zip|rar|7z|tar|[tb]?gz|bz2|mp[34]|wav|aac|flac|ogg|m4[av]|mov|avi|wmv|mkv|webm)$/i;
    if (fileExtension.test(pathname) || fileExtension.test(fileName)) return;
    const mime = attachment?.mimeType || attachment?.contentType || (String(attachment?.type || '').includes('/') ? attachment.type : '');
    const mediaType = attachment?.mediaType || attachment?.type;
    const isImage = mime ? /^image\//i.test(String(mime))
      : mediaType === 'file' ? false
        : mediaType === 'image' || attachment?.image === true || q.imageOnly === true
          || /\.(png|jpe?g|gif|webp|bmp|svg|avif|tiff?|ico)$/i.test(pathname)
          || /\.(png|jpe?g|gif|webp|bmp|svg|avif|tiff?|ico)$/i.test(fileName);
    if (isImage && !links.includes(url.href)) links.push(url.href);
  });
  return links;
}

function surveyDetailExportValues(questions, record) {
  if (record.questionSnapshot != null) {
    const snapshot = record.questionSnapshot;
    if (!Array.isArray(snapshot) || snapshot.length !== questions.length) throw surveyDetailExportError('schema');
    const snapshotIds = snapshot.map(q => q?.id == null ? '' : String(q.id));
    if (snapshotIds.some(Boolean) && new Set(snapshotIds).size !== snapshotIds.length) throw surveyDetailExportError('schema');
    questions.forEach((q, index) => {
      const stored = q.id != null && snapshotIds.some(Boolean) ? snapshot.find(item => String(item?.id) === String(q.id)) : snapshot[index];
      if (!stored || stored.title !== q.title || surveyDetailExportKind(stored) !== surveyDetailExportKind(q)) throw surveyDetailExportError('schema');
    });
  }
  let entries = record.answerEntries;
  if (entries == null && Array.isArray(record.answers) && record.answers.some(answer => answer?.[2]?.questionId != null)) entries = record.answers.map(answer => answer?.[2]);
  let byId;
  if (entries != null) {
    if (!Array.isArray(entries) || entries.length !== questions.length || questions.some(q => q.id == null || q.id === '')) throw surveyDetailExportError('schema');
    byId = new Map();
    entries.forEach(entry => {
      if (!entry || entry.questionId == null || byId.has(String(entry.questionId)) || !['answered', 'unanswered', 'logic_skipped'].includes(entry.status)) throw surveyDetailExportError('schema');
      byId.set(String(entry.questionId), entry);
    });
    if (questions.some(q => !byId.has(String(q.id)))) throw surveyDetailExportError('schema');
  } else if (!Array.isArray(record.answers) || record.answers.length !== questions.length
    || record.answers.some((answer, index) => !Array.isArray(answer) || answer[0] !== questions[index].title)) {
    throw surveyDetailExportError('schema');
  }
  // Pure legacy arrays are positional. A reordered snapshot cannot safely be
  // read by current column index, especially when two questions share a title.
  if (!byId && record.questionSnapshot?.some(q => q.id != null)
    && record.questionSnapshot.some((q, index) => String(q.id) !== String(questions[index].id))) throw surveyDetailExportError('schema');
  return questions.map((q, index) => {
    const kind = surveyDetailExportKind(q);
    const entry = byId?.get(String(q.id));
    const value = entry ? entry.value : record.answers[index][1];
    if (['file', 'signature'].includes(kind)) {
      if (['logic_skipped', 'unanswered'].includes(entry?.status)) return '';
      // A signature is an image even when its saved access URL has no extension.
      // In-memory tokens and non-image attachments still have no exportable URL.
      return surveyDetailExportImageLinks(kind === 'signature' ? {...q, imageOnly: true} : q, value).join('\n');
    }
    if (entry?.status === 'logic_skipped') return '逻辑跳过';
    const values = Array.isArray(value) ? value : [value];
    if (values.some(item => item != null && !['string', 'number', 'boolean'].includes(typeof item))) throw surveyDetailExportError('schema');
    if (entry?.status === 'unanswered' || value == null || Array.isArray(value) && !value.length || !readableAnswerValue(value).trim()) return '未作答';
    return readableAnswerValue(value);
  });
}

function buildSurveyDetailExportWorkbook(s) {
  const questions = surveyDetailExportQuestions(s), records = surveyDetailExportRecords(s);
  if (records.length + 2 > 1048576 || questions.length + 1 > 16384) throw surveyDetailExportError('capacity');
  const rows = [[String(s.title || ''), ...questions.map(() => '')], ['序号', ...questions.map((q, index) => `第${index + 1}题：${q.title}`)]];
  records.forEach((record, index) => rows.push([index + 1, ...surveyDetailExportValues(questions, record)]));
  if (rows.some(row => row.some(value => typeof value === 'string' && value.length > 32767))) throw surveyDetailExportError('capacity');
  const library = window.XLSX;
  if (!library?.utils) throw surveyDetailExportError('generation');
  const sheet = library.utils.aoa_to_sheet(rows), book = library.utils.book_new();
  sheet['!merges'] = [{s: {r: 0, c: 0}, e: {r: 0, c: questions.length}}];
  sheet['!cols'] = [{wch: 8}, ...questions.map(() => ({wch: 32}))];
  sheet['!rows'] = [{hpt: 28}, {hpt: 42}];
  questions.forEach((q, questionIndex) => {
    const kind = surveyDetailExportKind(q);
    if (!['file', 'signature'].includes(kind)) return;
    rows.slice(2).forEach((row, recordIndex) => {
      const value = row[questionIndex + 1];
      if (value && !value.includes('\n')) {
        const address = library.utils.encode_cell({r: recordIndex + 2, c: questionIndex + 1});
        sheet[address].l = {Target: value, Tooltip: kind === 'signature' ? '查看签名' : '查看图片'};
      }
    });
  });
  library.utils.book_append_sheet(book, sheet, '问卷明细');
  const demoRows = records.flatMap((record, index) => record.dataOrigin === 'demo_sample'
    ? [[index + 1, '演示数据', '本地原型演示样例，不属于业务真实用户提交']] : []);
  if (demoRows.length) {
    const explanation = library.utils.aoa_to_sheet([['主表序号', '数据来源', '说明'], ...demoRows]);
    explanation['!cols'] = [{wch: 12}, {wch: 16}, {wch: 60}];
    library.utils.book_append_sheet(book, explanation, '数据说明');
  }
  return {book, recordCount: records.length, demoCount: demoRows.length};
}

function surveyDetailExportFilename(s, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'}).formatToParts(now);
  const date = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const title = String(s.title || '问卷').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim().replace(/[. ]+$/, '') || '问卷';
  return `${title}_明细_${date.year}${date.month}${date.day}_${date.hour}${date.minute}${date.second}.xlsx`;
}

function surveyDetailExportSurvey(surveyId, sourcePage, portal = state.portal) {
  if (state.preview !== 'pc' || state.portal !== portal || !['published', 'all-surveys'].includes(sourcePage)) throw surveyDetailExportError('permission');
  const s = CONFIG[portal]?.surveys.find(item => String(item.id) === String(surveyId));
  if (!s || s.deleted === 1 || !['not_started', 'running', 'paused', 'ended'].includes(s.status)
    || sourcePage === 'published' && (state.page !== 'list' || state.listView !== 'published' || s.owner !== currentUserName())
    || sourcePage === 'all-surveys' && state.page !== 'all-surveys') throw surveyDetailExportError('permission');
  return s;
}

function surveyDetailExportTrack(event, surveyId, sourcePage, properties = {}, portal = state.portal) {
  window.__surveyDetailExportEvents = window.__surveyDetailExportEvents || [];
  window.__surveyDetailExportEvents.push({event, portal, device: 'pc', org_id: CONFIG[portal]?.org || '', survey_id: surveyId, source_page: sourcePage, timestamp: formatSystemTime(), ...properties});
}

function surveyDetailExportSetBusy(surveyId, busy) {
  document.querySelectorAll('[data-action="export-survey-detail"]').forEach(button => {
    if (String(button.dataset.surveyId) !== String(surveyId)) return;
    button.disabled = busy;
    button.textContent = busy ? '导出中…' : '导出明细';
    if (busy) button.setAttribute('aria-busy', 'true');
    else button.removeAttribute('aria-busy');
  });
}

async function exportSurveyDetailWorkbook(surveyId, sourcePage) {
  const portal = state.portal, jobKey = `${portal}:${surveyId}`, startedAt = Date.now();
  if (surveyDetailExportJobs.has(jobKey)) return false;
  surveyDetailExportTrack('survey_detail_export_click', surveyId, sourcePage, {}, portal);
  let recordCount = 0;
  try {
    surveyDetailExportSurvey(surveyId, sourcePage, portal);
    surveyDetailExportJobs.add(jobKey);
    surveyDetailExportSetBusy(surveyId, true);
    await new Promise(resolve => setTimeout(resolve, 0));
    const s = surveyDetailExportSurvey(surveyId, sourcePage, portal), result = buildSurveyDetailExportWorkbook(s);
    recordCount = result.recordCount;
    window.XLSX.writeFile(result.book, surveyDetailExportFilename(s), {compression: true});
    surveyDetailExportTrack('survey_detail_export_result', surveyId, sourcePage, {result: 'success', record_count: recordCount, duration_ms: Date.now() - startedAt}, portal);
    toast('已发起下载');
    return true;
  } catch (error) {
    surveyDetailExportTrack('survey_detail_export_result', surveyId, sourcePage, {result: 'failed', record_count: recordCount, reason: error.exportCode || 'generation', duration_ms: Date.now() - startedAt}, portal);
    toast(SURVEY_DETAIL_EXPORT_MESSAGES[error.exportCode] || SURVEY_DETAIL_EXPORT_MESSAGES.generation);
    return false;
  } finally {
    surveyDetailExportJobs.delete(jobKey);
    if (state.portal === portal) surveyDetailExportSetBusy(surveyId, false);
  }
}

/* Only the four built-in legacy demonstrations have three-question responses
 * without a saved schema. Supply their original questions before the first render. */
function initializeSurveyDetailExportDemoSnapshots() {
  Object.entries({bureau: [1, 4], school: [12, 14]}).forEach(([portal, ids]) => ids.forEach(id => {
    const s = CONFIG[portal].surveys.find(item => item.id === id), records = MY_RESPONSES[portal]?.[id] || [];
    if (!s || Array.isArray(s.questions) || Array.isArray(s.publishedQuestions) || !records.length) return;
    const questions = defaultQuestions();
    if (!records.every(record => !record.questionSnapshot && !record.answerEntries && record.answers?.length === questions.length && record.answers.every((answer, index) => answer[0] === questions[index].title))) return;
    s.questions = cloneQuestions(questions);
    s.publishedQuestions = cloneQuestions(questions);
  }));
}
initializeSurveyDetailExportDemoSnapshots();

// The remaining built-in demonstrations previously generated these seven
// questions when first viewed. Save that same schema at startup, before any
// user-created survey exists, so an empty export does not depend on visiting detail.
Object.entries(CONFIG).forEach(([portal, config]) => config.surveys.forEach(s => {
  if (Array.isArray(s.questions) || Array.isArray(s.publishedQuestions)
    || (MY_RESPONSES[portal]?.[s.id] || []).length || s.status === 'draft' || s.deleted === 1) return;
  s.questions = demoSurveyQuestions(s, portal);
  s.publishedQuestions = cloneQuestions(s.questions);
}));

/* Option jump UI and prototype adapters. Loaded after the existing compatibility scripts. */
'use strict';
const surveyJumpForms = new WeakMap();
let surveyJumpDialog = null;
let surveyJumpSession = '';

function surveyJumpQuestions(s) {
  return SurveyRouting.normalizeQuestions(s.publishedQuestions || surveyQuestions(s));
}
function surveyJumpVersion(s) { return s.questionnaireVersion || 'legacy'; }
function surveyJumpFingerprint(s) { return JSON.stringify(surveyJumpQuestions(s)); }
function surveyJumpTrack(event, details = {}) {
  if (!surveyJumpSession) surveyJumpSession = SurveyRouting.uid('session');
  const record = {event, portal: state.portal, device: state.preview, session_id: surveyJumpSession,
    timestamp: formatSystemTime(), ...details};
  window.__surveyJumpEvents = window.__surveyJumpEvents || [];
  window.__surveyJumpEvents.push(record);
}
function surveyStoredRecord(s, id) {
  return (MY_RESPONSES[state.portal]?.[s.id] || []).find(record => record.id === id);
}
function surveyStoredEntry(s, id, index) {
  const record = surveyStoredRecord(s, id);
  return record?.answerEntries?.[index] || record?.answers?.[index]?.[2];
}
function surveyStoredQuestions(s, id) {
  return surveyStoredRecord(s, id)?.questionSnapshot || statsQuestions(s);
}
function surveyResponseMetadata(s, answers) {
  const prepared = SurveyRouting.prepareSubmission(surveyJumpQuestions(s), answers, answers.routingVersion ?? surveyJumpVersion(s), surveyJumpVersion(s));
  if (prepared.error) throw new Error(prepared.error);
  surveyJumpTrack('survey_submit_result', {survey_id: s.id, questionnaire_version: prepared.version,
    result: 'success', code: prepared.code, path_count: prepared.path.length, skipped_count: prepared.skipped.length});
  return {questionnaireVersion: prepared.version, routingSchemaVersion: 1,
    questionSnapshot: prepared.questionSnapshot, answerEntries: prepared.answerEntries};
}

function installSurveyJumpPrd() {
  const additions = [
    ['选项跳转','仅单选题且非末题提供开关，默认关闭；按选项配置后续目标，关闭保留草稿规则。','jumpEnabled / jumpRules / optionIds'],
    ['跳转校验','删除目标或目标移到当前题之前显示错误；草稿可保留无效规则，下一步及发布必须修复或停用。','SurveyRouting.validateRules() / firstQuestionError(includeRules)'],
  ];
  const group = PRD_FIELD_GROUPS.createEditor;
  additions.forEach(row => { if (!group.some(existing => existing[0] === row[0])) group.push(row); });
  ['create-editor','template-editor','mobile-create'].forEach(key => {
    const rule = PRD_PAGE_RULES[key];
    if (!rule) return;
    additions.forEach(row => { if (!rule.fields.some(existing => existing[0] === row[0])) rule.fields.push(row); });
  });
  ['list-fill','mobile-form','list-response','stats-detail'].forEach(key => {
    const rule = PRD_PAGE_RULES[key];
    if (rule && !rule.fields.some(row => row[0] === '填写路径')) rule.fields.push(['填写路径','按发布版本和单选答案计算；隐藏跳过题、清空移出路径答案，豁免对应必填；统计及导出区分逻辑跳过和未作答。','SurveyRouting.computePath() / answerEntries']);
  });
}

function closeSurveyJumpDialog() {
  if (!surveyJumpDialog) return;
  const current = surveyJumpDialog;
  surveyJumpDialog = null;
  document.removeEventListener('keydown', current.onKey, true);
  current.layer.remove();
  if (current.scrollRoot) current.scrollRoot.style.overflow = current.previousOverflow;
  if (current.trigger?.isConnected) current.trigger.focus();
}
function openSurveyJumpDialog(title, body, footer, trigger) {
  closeSurveyJumpDialog();
  const mobile = state.preview === 'mobile', host = mobile ? document.querySelector('.device-stage') : document.body;
  const layer = document.createElement('div');
  layer.className = `survey-jump-mask ${mobile ? 'jump-mobile' : 'jump-pc'} jump-config`;
  layer.style.setProperty('--jump-accent', state.portal === 'school' ? '#159c75' : '#1768b2');
  layer.innerHTML = `<section class="survey-jump-dialog" role="dialog" aria-modal="true" aria-labelledby="jump-dialog-title"><header><h2 id="jump-dialog-title">${esc(title)}</h2><button type="button" data-jump-close aria-label="关闭">×</button></header><div class="jump-dialog-body">${body}</div><footer>${footer}</footer></section>`;
  host.appendChild(layer);
  const scrollRoot = mobile ? host.querySelector('.content') : null;
  const previousOverflow = scrollRoot?.style.overflow || '';
  if (scrollRoot) scrollRoot.style.overflow = 'hidden';
  const onKey = event => {
    if (document.querySelector('.pc-signature-modal,.mobile-signature-mask,.location-picker-mask')) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeSurveyJumpDialog(); }
    if (event.key === 'Tab') {
      const nodes = [...layer.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled),textarea:not(:disabled),a[href]')].filter(node => node.getClientRects().length);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  };
  surveyJumpDialog = {layer, onKey, scrollRoot, previousOverflow, trigger};
  document.addEventListener('keydown', onKey, true);
  layer.querySelector('[data-jump-close]').onclick = closeSurveyJumpDialog;
  layer.querySelector('[data-jump-cancel]')?.addEventListener('click', closeSurveyJumpDialog);
  layer.onclick = event => { if (event.target === layer) closeSurveyJumpDialog(); };
  layer.querySelector('select,button')?.focus();
  return layer;
}

function openSurveyJumpConfig(index, trigger) {
  const q = state.questions[index];
  if (!q || !SurveyRouting.single(q)) return;
  const normalized = SurveyRouting.normalizeQuestion(q), errors = SurveyRouting.validateRules(state.questions).filter(error => error.index === index);
  const body = `<p class="jump-dialog-caption">第 ${index + 1} 题：${esc(q.title || '未填写题目标题')}</p><p class="jump-dialog-hint">选择指定选项后，跳过中间题目；被跳过题目无需填写。</p><div class="jump-config-heading"><span>当前题目选项</span><span>填写去向</span></div><div class="jump-config-rows">${normalized.options.map((text, optionIndex) => {
    const id = normalized.optionIds[optionIndex], target = normalized.jumpRules.find(rule => rule.optionId === id)?.targetQuestionId || '';
    const valid = state.questions.slice(index + 1).some(question => question.id === target);
    const error = errors.find(item => item.optionId === id);
    return `<div class="jump-config-row"><label for="jump-option-${optionIndex}">${esc(text || `选项 ${optionIndex + 1}（未填写）`)}</label><div><select id="jump-option-${optionIndex}" data-jump-option="${esc(id)}" aria-label="${esc(text || `选项 ${optionIndex + 1}`)}的填写去向"><option value="" ${!target ? 'selected' : ''}>继续下一题</option>${target && !valid ? `<option value="${esc(target)}" selected>无效目标，请重新选择</option>` : ''}${state.questions.slice(index + 1).map((question, offset) => `<option value="${esc(question.id)}" ${question.id === target ? 'selected' : ''}>第 ${index + offset + 2} 题：${esc(question.title || '未填写题目标题')}</option>`).join('')}</select><p class="jump-rule-error">${esc(error?.message || '')}</p></div></div>`;
  }).join('')}</div><p class="jump-config-error" role="alert"></p>`;
  const layer = openSurveyJumpDialog('配置选项跳转', body, '<button type="button" class="btn" data-jump-cancel>取消</button><button type="button" class="btn primary" data-jump-save>确定</button>', trigger);
  layer.querySelector('[data-jump-save]').onclick = () => {
    const rules = [...layer.querySelectorAll('[data-jump-option]')].filter(select => select.value)
      .map(select => ({optionId: select.dataset.jumpOption, targetQuestionId: select.value}));
    const candidate = state.questions.map((question, i) => i === index ? {...question, jumpEnabled: true, jumpRules: rules} : question);
    const invalid = SurveyRouting.validateRules(candidate).find(error => error.index === index);
    if (invalid) { layer.querySelector('.jump-config-error').textContent = invalid.message; return; }
    q.optionIds = normalized.optionIds;
    q.jumpEnabled = true;
    q.jumpRules = rules;
    surveyJumpTrack('survey_jump_rule_save', {survey_id: state.editingSurveyId || '', source_question_id: q.id, jump_option_count: rules.length});
    closeSurveyJumpDialog();
    renderShell();
    document.querySelector(`[data-jump-config="${index}"]`)?.focus();
    toast('跳转配置已保存');
  };
}

function surveyJumpReadForm(form, s) {
  return surveyJumpQuestions(s).map((q, index) => {
    const field = form.querySelector(`[data-routing-index="${index}"]`), kind = questionKind(q.type);
    let value = '', selectedOptionIds = [];
    if (kind === 'single' || kind === 'multiple') {
      const checked = [...(field?.querySelectorAll('input:checked') || [])];
      value = kind === 'single' ? checked[0]?.value || '' : checked.map(input => input.value);
      selectedOptionIds = checked.map(input => input.dataset.optionId).filter(Boolean);
    } else if (kind === 'file') {
      const input = field?.querySelector('[data-survey-answer]');
      value = Array.from(input?.files || []).map(file => file.name).join('、') || input?.dataset.existingAnswer || '';
    } else value = field?.querySelector('[data-survey-answer]')?.value?.trim() || '';
    return [q.title, value, {questionId: q.id, selectedOptionIds}];
  });
}
function surveyJumpClearField(field) {
  field.querySelectorAll('input,textarea,select').forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
    else input.value = '';
    if (input.dataset.existingAnswer !== undefined) input.dataset.existingAnswer = '';
    if (input.dataset.signaturePreset !== undefined) input.dataset.signaturePreset = '';
  });
  field.querySelector('.mobile-signature-answer')?.classList.remove('signed');
  const pcSignature = field.querySelector('.pc-signature-answer');
  if (pcSignature) {
    pcSignature.classList.remove('confirmed'); pcSignature.classList.add('empty');
    const preview = pcSignature.querySelector('.pc-signature-preview'); if (preview) preview.innerHTML = '';
    const button = pcSignature.querySelector('[data-pc-signature-open]');
    if (button) { button.dataset.signaturePreset = ''; button.textContent = '签名'; button.setAttribute('aria-label','签名'); }
  }
  const location = field.querySelector('[data-location-picker-open]');
  if (location) { location.classList.remove('selected'); const label = location.querySelector('span'); if (label) label.textContent = '请选择省市区'; }
}
function refreshSurveyJumpPath(form, changedIndex = -1) {
  const context = surveyJumpForms.get(form);
  if (!context) return;
  const s = context.survey, answers = surveyJumpReadForm(form, s), result = SurveyRouting.computePath(surveyJumpQuestions(s), answers);
  const alert = form.querySelector('.jump-form-error');
  if (result.errors.length) { alert.textContent = '跳转规则无效，请重新加载问卷'; return; }
  alert.textContent = '';
  const active = new Set(result.path);
  let cleared = 0;
  form.querySelectorAll('[data-routing-index]').forEach(field => {
    const index = Number(field.dataset.routingIndex);
    field.hidden = !active.has(index);
    if (field.hidden) {
      if (!SurveyRouting.empty(answers[index]?.[1])) cleared++;
      surveyJumpClearField(field);
    }
  });
  const current = surveyJumpQuestions(s)[changedIndex], selected = answers[changedIndex]?.[2]?.selectedOptionIds?.[0];
  const rule = current?.jumpEnabled && selected ? current.jumpRules.find(item => item.optionId === selected) : null;
  const target = rule ? surveyJumpQuestions(s).findIndex(q => q.id === rule.targetQuestionId) : -1;
  if (changedIndex >= 0 && context.path.join(',') !== result.path.join(',')) {
    surveyJumpTrack('survey_path_change', {survey_id: s.id, cleared_answer_count: cleared, path_count: result.path.length});
  }
  if (changedIndex >= 0 && target > changedIndex + 1 && active.has(changedIndex)) {
    const destination = form.querySelector(`[data-routing-index="${target}"]`);
    destination?.scrollIntoView({behavior: 'smooth', block: 'start'});
    surveyJumpTrack('survey_jump_trigger', {survey_id: s.id, questionnaire_version: surveyJumpVersion(s),
      source_question_id: current.id, target_question_id: rule.targetQuestionId, skipped_count: target - changedIndex - 1});
    const message = `已跳至第 ${target + 1} 题${cleared ? '；填写路径已更新，跳过题目的已填内容已清除' : ''}`;
    form.querySelector('.jump-form-status').textContent = message;
    toast(message);
  } else if (cleared) {
    const message = '填写路径已更新，跳过题目的已填内容已清除';
    form.querySelector('.jump-form-status').textContent = message; toast(message);
  }
  context.path = result.path;
}
function bindSurveyJumpForm(form) {
  if (!form || form.dataset.readonly === 'true' || surveyJumpForms.has(form)) return;
  const questions = JSON.parse(form.dataset.questions), s = {id: form.dataset.surveyId, questions,
    publishedQuestions: questions, questionnaireVersion: form.dataset.version};
  surveyJumpForms.set(form, {survey: s, version: form.dataset.version, fingerprint: form.dataset.fingerprint, path: []});
  form.addEventListener('change', event => {
    if (event.target.matches('input[type=radio]')) refreshSurveyJumpPath(form, Number(event.target.closest('[data-routing-index]').dataset.routingIndex));
  });
  form.querySelectorAll('[data-jump-clear-answer]').forEach(button => button.onclick = () => {
    const index = Number(button.dataset.jumpClearAnswer);
    surveyJumpClearField(form.querySelector(`[data-routing-index="${index}"]`));
    refreshSurveyJumpPath(form, index);
  });
  refreshSurveyJumpPath(form);
}

(function installSurveyJump() {
  installSurveyJumpPrd();
  document.addEventListener('DOMContentLoaded', installSurveyJumpPrd);
  window.addEventListener('load', installSurveyJumpPrd);
  const originalCard = questionCard;
  questionCard = function(q, index) {
    const normalized = SurveyRouting.normalizeQuestion(q), errors = SurveyRouting.validateRules(state.questions).filter(error => error.index === index);
    let settings = '';
    if (SurveyRouting.single(q) && index < state.questions.length - 1) {
      settings = `<label class="inline-setting jump-toggle"><input type="checkbox" data-jump-toggle="${index}" ${q.jumpEnabled ? 'checked' : ''}>选项跳转</label>`;
    }
    if (SurveyRouting.single(q) && q.jumpEnabled) {
      settings += `<button type="button" class="jump-config-button" data-jump-config="${index}">${normalized.jumpRules.length ? `已设置跳转：${normalized.jumpRules.length} 个选项` : '配置跳转'}</button>`;
      if (index === state.questions.length - 1) settings += `<button type="button" class="jump-disable-button" data-jump-disable="${index}">停用跳转</button>`;
    }
    let html = originalCard(q, index).replace('<div class="inline-q-settings">', `<div class="inline-q-settings">${settings}`);
    if (errors.length) html = html.replace('</article>', `<div class="jump-question-error" role="alert">${errors.map(error => `<p>${esc(error.message)}</p>`).join('')}</div></article>`);
    return html;
  };
  const originalError = firstQuestionError;
  firstQuestionError = function(includeRules = true) {
    const base = originalError();
    if (base || !includeRules) return base;
    const error = SurveyRouting.validateRules(state.questions)[0];
    return error ? {...error, message: `第 ${error.index + 1} 题：${error.message}`} : null;
  };
  const originalAnswerInput = answerInput;
  answerInput = function(q, index, value = '', readonly = false, mobile = false) {
    const normalized = SurveyRouting.normalizeQuestion(q);
    if (!readonly && ['single', 'multiple'].includes(questionKind(q.type))) {
      const values = Array.isArray(value) ? value : [value];
      const selectedIds = q.selectedOptionIds || [];
      return `<div class="survey-choice-input">${normalized.options.map((text, i) => `<label><input type="${SurveyRouting.single(q) ? 'radio' : 'checkbox'}" name="answer-${index}" data-option-id="${esc(normalized.optionIds[i])}" value="${esc(text)}" ${(selectedIds.length ? selectedIds.includes(normalized.optionIds[i]) : values.includes(text)) ? 'checked' : ''}> ${esc(text)}</label>`).join('')}</div>`;
    }
    return originalAnswerInput(q, index, value, readonly, mobile);
  };
  surveyAnswerFields = function(s, answers = [], readonly = false, mobile = false) {
    const qs = surveyJumpQuestions(s), fingerprint = JSON.stringify(qs);
    const fields = qs.map((q, index) => {
      const metadata = answers[index]?.[2], value = answerAt(answers, index);
      const skipped = readonly && metadata?.status === 'logic_skipped';
      const input = skipped ? '<p class="jump-skipped-label">逻辑跳过</p>' : readonly && SurveyRouting.empty(value)
        ? '<p class="readonly-answer">未作答</p>' : answerInput({...q, selectedOptionIds: metadata?.selectedOptionIds}, index, value, readonly, mobile);
      return `<div class="survey-answer-field ${q.required ? 'required' : ''}" data-routing-index="${index}" data-question-id="${esc(q.id)}"><h3><b>${String(index + 1).padStart(2, '0')}.</b> ${esc(q.title)}${q.required && !skipped ? '<em>*</em>' : ''}</h3>${input}${!readonly && SurveyRouting.single(q) && !q.required ? `<button type="button" class="jump-clear-answer" data-jump-clear-answer="${index}">清除选择</button>` : ''}</div>`;
    }).join('');
    return `<div class="survey-routing-form" data-routing-form data-survey-id="${esc(s.id)}" data-version="${esc(surveyJumpVersion(s))}" data-fingerprint="${esc(fingerprint)}" data-questions="${esc(JSON.stringify(qs))}" data-readonly="${readonly}"><p class="jump-form-error" role="alert"></p><span class="jump-form-status" role="status" aria-live="polite"></span>${fields}</div>`;
  };
  const originalCollect = collectSurveyAnswers;
  collectSurveyAnswers = function(s, root = document) {
    const form = [...root.querySelectorAll('[data-routing-form]')].find(node => node.dataset.surveyId === String(s.id) && node.dataset.readonly !== 'true');
    if (!form) return originalCollect(s);
    const answers = surveyJumpReadForm(form, s);
    answers.routingVersion = form.dataset.version;
    answers.routingFingerprint = form.dataset.fingerprint;
    return answers;
  };
  responseAnswerError = function(s, answers) {
    if (answers.routingFingerprint && answers.routingFingerprint !== surveyJumpFingerprint(s)) return '问卷版本已变化，请重新加载问卷';
    const result = SurveyRouting.prepareSubmission(surveyJumpQuestions(s), answers, answers.routingVersion ?? surveyJumpVersion(s), surveyJumpVersion(s));
    if (result.error) {
      surveyJumpTrack('survey_submit_result', {survey_id: s.id, result: 'failed', code: result.code});
      return result.error;
    }
    answers.splice(0, answers.length, ...result.answers);
    return '';
  };
  const originalAnswerMarkup = responseAnswerMarkup;
  responseAnswerMarkup = function(q, value = '', metadata) {
    if (metadata?.status === 'logic_skipped') return '<p class="jump-skipped-label">逻辑跳过</p>';
    if (SurveyRouting.empty(value)) return '<p class="readonly-answer">未作答</p>';
    return originalAnswerMarkup(q, value);
  };
  const originalStoredValues = storedResponseValues;
  storedResponseValues = function(questions, record, fallback) {
    if (!record?.answerEntries && !record?.answers?.some(answer => answer[2])) return originalStoredValues(questions, record, fallback);
    return questions.map((q, index) => {
      const entry = record.answerEntries?.find(item => item.questionId === q.id) || record.answers?.find(answer => answer[2]?.questionId === q.id)?.[2] || record.answers?.[index]?.[2];
      return entry?.status === 'logic_skipped' ? '逻辑跳过' : SurveyRouting.empty(entry?.value) ? '未作答' : readableAnswerValue(entry.value);
    });
  };
  const originalBind = bind;
  bind = function() {
    originalBind();
    document.querySelectorAll('[data-jump-toggle],[data-jump-disable]').forEach(input => {
      const handler = () => {
        const index = Number(input.dataset.jumpToggle ?? input.dataset.jumpDisable), q = state.questions[index];
        q.jumpEnabled = input.dataset.jumpDisable === undefined ? input.checked : false;
        renderShell();
      };
      if (input.matches('input')) input.onchange = handler; else input.onclick = handler;
    });
    document.querySelectorAll('[data-jump-config]').forEach(button => button.onclick = event => { event.stopPropagation(); openSurveyJumpConfig(Number(button.dataset.jumpConfig), button); });
    document.querySelectorAll('[data-routing-form]').forEach(bindSurveyJumpForm);
  };
  const originalQrPreview = openQrScanPreview;
  openQrScanPreview = function(s, root) { originalQrPreview(s, root); root.querySelectorAll('[data-routing-form]').forEach(bindSurveyJumpForm); };
  const originalRender = renderShell;
  renderShell = function() { closeSurveyJumpDialog(); return originalRender(); };

  const originalStats = statsQuestions;
  statsQuestions = function(s) {
    const records = (MY_RESPONSES[state.portal]?.[s.id] || []).filter(record => record.valid !== false
      && (!isDailySurvey(s) || String(record.submittedAt).slice(0, 10) === selectedStatsDate(s)));
    const qs = surveyJumpQuestions(s);
    if (!s.routingSchemaVersion && !qs.some(q => q.jumpEnabled) && !records.some(record => record.answerEntries)) return originalStats(s);
    const summaries = SurveyRouting.aggregate(qs, records);
    return qs.map((q, index) => {
      const summary = summaries[index], kind = questionKind(q.type);
      const values = summary.values.map(item => readableAnswerValue(item.value));
      const base = {id: q.id, title: q.title, type: questionTypeLabel(q.type), kind, count: summary.count,
        applicableCount: summary.applicableCount, skippedCount: summary.skippedCount, unansweredCount: summary.unansweredCount};
      if (kind === 'single' || kind === 'multiple') return {...base, options: summary.options.map(option => [option.text, option.count])};
      if (kind === 'text') return {...base, answers: values};
      if (kind === 'date') return {...base, dates: [...new Set(values)].map(value => [value, values.filter(item => item === value).length])};
      if (kind === 'file') return {...base, files: summary.values.flatMap(item => String(item.value).split('、').filter(Boolean).map(name => ({name, format: name.split('.').pop().toUpperCase(), size: '—', preview: /\.(png|jpg|jpeg|gif|webp)$/i.test(name) ? 'image' : 'file', submitter: item.record.submitter, time: item.record.submittedAt})))};
      if (kind === 'signature') return {...base, signatures: summary.values.map(item => ({name: item.record.submitter, submitter: item.record.submitter, time: item.record.submittedAt}))};
      if (kind === 'location') return {...base, locations: [...new Set(values)].map(value => ({name: value, count: values.filter(item => item === value).length, address: value, coordinate: ['—', '—']}))};
      return base;
    });
  };
  const originalStatBody = questionStatBody;
  questionStatBody = function(q, surveyId, index) {
    const metrics = q.applicableCount === undefined ? '' : `<div class="jump-stat-metrics"><span>适用答卷 <b>${q.applicableCount}</b></span><span>逻辑跳过 <b>${q.skippedCount}</b></span><span>未作答 <b>${q.unansweredCount}</b></span></div>`;
    return metrics + originalStatBody(q, surveyId, index);
  };
})();

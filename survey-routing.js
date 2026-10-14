/* Pure routing rules, shared by all prototype entry points and reusable by a server. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SurveyRouting = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  let sequence = 0;
  const uid = prefix => `${prefix}-${Date.now().toString(36)}-${++sequence}`;
  const copy = value => JSON.parse(JSON.stringify(value));
  const empty = value => Array.isArray(value) ? !value.length : !String(value ?? '').trim();
  const single = q => String(q.type).replace(/题$/, '') === '单选';
  function normalizeQuestion(source = {}) {
    const q = copy(source);
    q.id = q.id || uid('q');
    q.options = (q.options || []).map(option => typeof option === 'object' ? String(option.text || '') : String(option));
    q.optionIds = q.options.map((_, index) => source.optionIds?.[index] || source.options?.[index]?.id || `${q.id}-option-${index + 1}`);
    q.jumpEnabled = Boolean(q.jumpEnabled);
    q.jumpRules = (q.jumpRules || []).map(rule => ({optionId: String(rule.optionId), targetQuestionId: String(rule.targetQuestionId)}));
    return q;
  }
  const normalizeQuestions = questions => (questions || []).map(normalizeQuestion);
  function cloneQuestions(questions, remap = false) {
    const result = normalizeQuestions(questions);
    if (!remap) return result;
    const questionMap = new Map(result.map(q => [q.id, uid('q')]));
    return result.map(q => {
      const optionMap = new Map(q.optionIds.map(id => [id, uid('option')]));
      return {...q, id: questionMap.get(q.id), optionIds: q.optionIds.map(id => optionMap.get(id)),
        jumpRules: q.jumpRules.map(rule => ({optionId: optionMap.get(rule.optionId) || rule.optionId,
          targetQuestionId: questionMap.get(rule.targetQuestionId) || rule.targetQuestionId}))};
    });
  }
  function trimOptions(q) {
    const normalized = normalizeQuestion(q);
    const kept = normalized.options.map((text, index) => ({text: text.trim(), id: normalized.optionIds[index]})).filter(item => item.text);
    q.options = kept.map(item => item.text);
    q.optionIds = kept.map(item => item.id);
    q.jumpRules = normalized.jumpRules.filter(rule => q.optionIds.includes(rule.optionId));
    return q;
  }
  function validateRules(questions) {
    const qs = normalizeQuestions(questions), positions = new Map(qs.map((q, i) => [q.id, i])), errors = [], ids = new Set();
    qs.forEach((q, index) => {
      if (ids.has(q.id)) errors.push({index, message: '题目 ID 重复'});
      ids.add(q.id);
      if (new Set(q.optionIds).size !== q.optionIds.length) errors.push({index, message: '选项 ID 重复'});
      if (!q.jumpEnabled) return;
      if (!single(q)) errors.push({index, message: '仅单选题支持选项跳转'});
      const sources = new Set();
      q.jumpRules.forEach(rule => {
        const target = positions.get(rule.targetQuestionId);
        let message = '';
        if (!q.optionIds.includes(rule.optionId)) message = '源选项已删除';
        else if (sources.has(rule.optionId)) message = '同一选项只能设置一个去向';
        else if (target === undefined) message = '目标题目已删除';
        else if (target <= index) message = '目标题目必须位于当前题目之后';
        sources.add(rule.optionId);
        if (message) errors.push({index, optionId: rule.optionId, message});
      });
    });
    return errors;
  }
  function answerEntries(questions, answers = []) {
    return questions.map((q, index) => {
      const item = answers.find(answer => !Array.isArray(answer) && answer?.questionId === q.id)
        || answers.find(answer => Array.isArray(answer) && answer[2]?.questionId === q.id)
        || (Array.isArray(answers[index]) && !answers[index][2]?.questionId ? answers[index] : null);
      const metadata = Array.isArray(item) ? item[2] || {} : item || {};
      const value = Array.isArray(item) ? item[1] : item?.value ?? '';
      const matching = q.options.map((text, i) => text === value ? q.optionIds[i] : '').filter(Boolean);
      const selectedOptionIds = Array.isArray(metadata.selectedOptionIds) ? [...metadata.selectedOptionIds]
        : single(q) && matching.length === 1 ? matching : [];
      return {questionId: q.id, value, selectedOptionIds};
    });
  }
  function computePath(questions, answers = []) {
    const qs = normalizeQuestions(questions), errors = validateRules(qs);
    if (errors.length) return {errors, path: [], skipped: [], entries: []};
    const entries = answerEntries(qs, answers), positions = new Map(qs.map((q, i) => [q.id, i])), path = [];
    for (let index = 0; index < qs.length;) {
      const q = qs[index], answer = entries[index];
      path.push(index);
      const selected = !empty(answer.value) && answer.selectedOptionIds.length === 1 ? answer.selectedOptionIds[0] : '';
      const rule = single(q) && q.jumpEnabled && selected ? q.jumpRules.find(item => item.optionId === selected) : null;
      index = rule ? positions.get(rule.targetQuestionId) : index + 1;
    }
    const active = new Set(path), skipped = qs.map((_, i) => i).filter(i => !active.has(i));
    return {errors: [], path, skipped, entries: entries.map((answer, i) => active.has(i)
      ? {...answer, status: empty(answer.value) ? 'unanswered' : 'answered'}
      : {...answer, value: '', selectedOptionIds: [], status: 'logic_skipped'})};
  }
  function prepareSubmission(questions, answers, expectedVersion, actualVersion) {
    if (expectedVersion !== actualVersion) return {error: '问卷版本已变化，请重新加载问卷', code: 'VERSION_MISMATCH'};
    const qs = normalizeQuestions(questions), result = computePath(qs, answers);
    if (result.errors.length) return {...result, error: '跳转规则无效，请重新加载问卷', code: 'INVALID_RULE'};
    for (const index of result.path) {
      const q = qs[index], answer = result.entries[index];
      if (q.required && empty(answer.value)) return {...result, error: `请完成第 ${index + 1} 题必填内容`, code: 'REQUIRED'};
      if (single(q) && !empty(answer.value)) {
        const optionIndex = q.optionIds.indexOf(answer.selectedOptionIds[0]);
        if (answer.selectedOptionIds.length !== 1 || optionIndex < 0 || q.options[optionIndex] !== answer.value)
          return {...result, error: `第 ${index + 1} 题选项无效，请重新选择`, code: 'INVALID_OPTION'};
      }
    }
    return {...result, error: '', code: 'OK', version: actualVersion,
      answers: result.entries.map((entry, i) => [qs[i].title, entry.value, {...entry}]),
      answerEntries: copy(result.entries), questionSnapshot: copy(qs)};
  }
  function aggregate(questions, records) {
    const qs = normalizeQuestions(questions);
    return qs.map((q, index) => {
      let applicableCount = 0, skippedCount = 0;
      const values = [], options = q.options.map((text, i) => ({id: q.optionIds[i], text, count: 0}));
      records.filter(record => record.valid !== false).forEach(record => {
        const stored = record.answerEntries?.find(entry => entry.questionId === q.id)
          || record.answers?.find(answer => answer[2]?.questionId === q.id)?.[2];
        const legacy = record.answers?.[index];
        if (stored?.status === 'logic_skipped') { skippedCount++; return; }
        if (record.answerEntries && !stored) return;
        applicableCount++;
        const value = stored ? stored.value : legacy?.[1] ?? '';
        if (empty(value)) return;
        values.push({value, record});
        options.forEach(option => {
          const selected = stored?.selectedOptionIds?.length ? stored.selectedOptionIds.includes(option.id)
            : Array.isArray(value) ? value.includes(option.text) : value === option.text;
          if (selected) option.count++;
        });
      });
      return {questionId: q.id, applicableCount, skippedCount, count: values.length,
        unansweredCount: applicableCount - values.length, values,
        options: options.map(option => ({...option, percent: values.length ? Math.round(option.count / values.length * 100) : null}))};
    });
  }
  return {uid, empty, single, normalizeQuestion, normalizeQuestions, cloneQuestions, trimOptions,
    validateRules, answerEntries, computePath, prepareSubmission, aggregate};
});

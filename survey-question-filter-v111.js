/* PC question-only analytics. Submission snapshots are shared by every fill channel. */
(function () {
  'use strict';
  const RELEASE = '1.11', UNCLASSIFIED = '__unclassified__';
  const filters = new Map(), taskContexts = new Map();
  let lockedSave = null, installed = false, baseRender, baseMetadata, baseSaveContext, baseAttachmentFiles;
  const clone = value => JSON.parse(JSON.stringify(value));
  const unique = values => [...new Set((values || []).filter(Boolean).map(String))];
  const key = survey => `${state.portal}:${survey.id}`;
  const directory = () => window.RECIPIENT_SELECTOR_V18_API?.guardianDirectory || {orgNodes: [], students: [], studentGuardianRelations: []};
  const label = (id, fallback = '') => directory().orgNodes.find(node => node.nodeId === id)?.nodeName || fallback;
  const now = () => typeof formatSystemTime === 'function' ? formatSystemTime() : new Date().toISOString();
  function track(event, survey, properties = {}) {
    const row = {event, portal: state.portal, device: state.preview, survey_id: survey?.id, timestamp: now(), ...properties};
    (window.__surveyQuestionFilterEvents ||= []).push(row);
  }
  const fieldKey = dimension => dimension === 'grade' ? 'gradeIds' : 'departmentIds';
  const dimensions = () => state.portal === 'school' ? ['department', 'grade'] : ['department'];
  const valuesFor = filter => ({departmentIds: unique(filter.departmentIds), gradeIds: unique(filter.gradeIds)});
  function filterProperties(filter) {
    const values = valuesFor(filter);
    return {department_ids: values.departmentIds, grade_ids: values.gradeIds,
      department_count: values.departmentIds.length, grade_count: values.gradeIds.length,
      selected_count: values.departmentIds.length + values.gradeIds.length};
  }
  function trackChange(survey, filter) {
    const view = buildView(survey, filter);
    track('survey_question_filter_change', survey, {...filterProperties(filter),
      result_count: view.selected.length, stats_date: view.date, data_source: filter.demo ? 'demo' : 'responses'});
  }
  function departments(portal = state.portal) {
    const rows = window.SurveyRoleV111?.getDepartments?.(portal) || (typeof DEPARTMENT_PEOPLE !== 'undefined' ? DEPARTMENT_PEOPLE[portal] : []) || [];
    return rows.map(row => ({id: String(row.id || row.departmentId || ''), name: row.name || row.departmentName || '', parentId: String(row.parentId || ''), nodeType: 'department'})).filter(row => row.id);
  }
  function contextFor(survey) {
    if (!filters.has(key(survey))) filters.set(key(survey), {departmentIds: [], gradeIds: [], demo: false, filePages: {}});
    return filters.get(key(survey));
  }
  function pendingFor(filter) {
    return filter.pending ||= {...valuesFor(filter), trees: {
      department: {treeOpen: false, search: '', collapsed: []}, grade: {treeOpen: false, search: '', collapsed: []}
    }};
  }
  function treeFor(records, dimension) {
    const options = optionsFor(records, dimension), nodes = new Map();
    const add = node => nodes.set(node.id, {...node, children: []});
    if (dimension === 'department') {
      const rows = departments();
      add({id: '__qf_root__', name: CONFIG[state.portal].org, parentId: '', selectable: false, nodeType: 'organization'});
      const ids = new Set(rows.map(row => row.id));
      rows.forEach(row => add({...row, parentId: ids.has(row.parentId) && row.parentId !== row.id ? row.parentId : '__qf_root__', selectable: true}));
    } else if (dimension === 'grade') {
      const raw = directory().orgNodes.filter(node => ['school', 'stage', 'grade'].includes(node.nodeType));
      const ids = new Set(raw.map(node => node.nodeId));
      raw.forEach(node => add({id: node.nodeId, name: node.nodeName, parentId: ids.has(node.parentId) ? node.parentId : '', selectable: node.nodeType === 'grade', nodeType: node.nodeType}));
    }
    const historical = options.filter(row => row.id !== UNCLASSIFIED && !nodes.has(row.id));
    if (historical.length) {
      add({id: '__qf_history__', name: '历史归属', parentId: '', selectable: false, nodeType: 'history_group'});
      historical.forEach(row => add({...row, parentId: '__qf_history__', selectable: true, nodeType: dimension, historical: true}));
    }
    add({id: UNCLASSIFIED, name: '未归类', parentId: '', selectable: true, nodeType: 'unclassified'});
    const roots = [];
    nodes.forEach(node => {
      const visited = new Set([node.id]); let parent = nodes.get(node.parentId), cycle = false;
      while (parent) { if (visited.has(parent.id)) { cycle = true; break; } visited.add(parent.id); parent = nodes.get(parent.parentId); }
      if (cycle || !nodes.has(node.parentId)) roots.push(node);
      else nodes.get(node.parentId).children.push(node);
    });
    function values(node, seen = new Set()) {
      if (seen.has(node.id)) return []; seen.add(node.id);
      return unique([...(node.selectable ? [node.id] : []), ...node.children.flatMap(child => values(child, seen))]);
    }
    nodes.forEach(node => { node.valueIds = values(node); });
    return {roots, nodes, options};
  }
  function treeMarkup(tree, pending) {
    const selected = new Set(pending.selectedIds), search = pending.search.trim().toLocaleLowerCase(), visible = new Set();
    if (search) tree.nodes.forEach(node => {
      if (!node.name.toLocaleLowerCase().includes(search)) return;
      const descendants = item => { if (visible.has(item.id)) return; visible.add(item.id); item.children.forEach(descendants); };
      descendants(node);
      let parent = tree.nodes.get(node.parentId); const ancestors = new Set();
      while (parent && !ancestors.has(parent.id)) { ancestors.add(parent.id); visible.add(parent.id); parent = tree.nodes.get(parent.parentId); }
    });
    function row(node, depth, seen = new Set()) {
      if (seen.has(node.id) || search && !visible.has(node.id)) return ''; const visited = new Set([...seen, node.id]);
      const selectedCount = node.valueIds.filter(id => selected.has(id)).length, checked = selectedCount > 0 && selectedCount === node.valueIds.length;
      const mixed = selectedCount > 0 && !checked, expanded = Boolean(search) || !pending.collapsed.includes(node.id);
      return `<div class="qf-tree-node" role="treeitem" aria-checked="${mixed ? 'mixed' : checked}" ${node.children.length ? `aria-expanded="${expanded}"` : ''}><div class="qf-tree-row" style="--qf-depth:${depth}">${node.children.length ? `<button type="button" class="qf-tree-expand" data-qf-expand="${esc(node.id)}" aria-label="${expanded ? '收起' : '展开'}${esc(node.name)}">${expanded ? '▾' : '▸'}</button>` : '<span class="qf-tree-spacer"></span>'}<label><input type="checkbox" data-qf-node="${esc(node.id)}" ${node.selectable ? `data-qf-id="${esc(node.id)}"` : ''} ${checked ? 'checked' : ''} ${mixed ? 'data-qf-indeterminate' : ''} ${node.valueIds.length ? '' : 'disabled'}><span>${esc(node.name)}</span></label></div>${expanded ? node.children.map(child => row(child, depth + 1, visited)).join('') : ''}</div>`;
    }
    const body = tree.roots.map(node => row(node, 0)).join('');
    return `<div class="qf-tree-search"><input type="search" data-qf-search value="${esc(pending.search)}" placeholder="搜索" aria-label="搜索筛选范围"></div><div class="qf-tree-list" role="tree" aria-multiselectable="true">${body || '<div class="qf-tree-empty">无匹配结果</div>'}</div>`;
  }
  function filterFormMarkup(view) {
    const pending = pendingFor(view.filter);
    const fields = dimensions().map(dimension => {
      const tree = treeFor(view.records, dimension), treeState = pending.trees[dimension], selectedIds = pending[fieldKey(dimension)];
      const names = selectedIds.map(id => tree.nodes.get(id)?.name || id), labelText = dimension === 'grade' ? '年级' : '部门';
      const selectedText = names.length ? names.slice(0, 2).join('、') + (names.length > 2 ? ` 等${names.length}项` : '') : '全部';
      return `<div class="qf-form-field" data-qf-field="${dimension}"><span>${labelText}：</span><div class="qf-tree-select"><div class="qf-tree-input"><button type="button" data-qf-tree-toggle="${dimension}" aria-label="${labelText}：${esc(selectedText)}" aria-haspopup="tree" aria-expanded="${treeState.treeOpen}" title="${esc(names.join('、') || selectedText)}">${esc(selectedText)}<i>⌄</i></button>${names.length ? `<button type="button" class="qf-tree-clear" data-qf-clear aria-label="清空${labelText}">×</button>` : ''}</div>${treeState.treeOpen ? `<div class="qf-tree-popover">${treeMarkup(tree, {...treeState, selectedIds})}</div>` : ''}</div></div>`;
    }).join('');
    const dirty = dimensions().some(dimension => [...pending[fieldKey(dimension)]].sort().join('|') !== [...view.filter[fieldKey(dimension)]].sort().join('|'));
    const scope = view.filter.departmentIds.length && view.filter.gradeIds.length ? '部门与年级（交集）' : view.filter.departmentIds.length ? '按部门' : view.filter.gradeIds.length ? '按年级' : '全部答卷';
    return `<div class="qf-filter-form"><div class="qf-form-fields">${fields}<div class="qf-form-actions"><button type="button" class="btn green" data-qf-query>⌕ 查询</button><button type="button" class="btn" data-qf-reset>↻ 重置</button></div></div><div class="qf-query-status"><span ${dirty ? 'class="qf-pending-note"' : ''}>${dirty ? '筛选条件已修改，点击查询后生效' : `当前结果：${scope}`}</span><span>${view.selected.length} 份有效答卷</span></div></div>`;
  }
  function markMixed(root = document) { root.querySelectorAll('[data-qf-indeterminate]').forEach(input => { input.indeterminate = true; }); }
  function refreshFilterForm(survey) {
    const root = document.querySelector('[data-v111-question-filter]');
    if (!root || String(root.dataset.surveyId) !== String(survey.id)) return;
    root.querySelector('.qf-filter-form').outerHTML = filterFormMarkup(buildView(survey)); markMixed(root);
  }
  function taskSnapshot(survey, answers = [], explicitTask = null) {
    const portal = state.portal, personId = typeof currentRecipientPersonId === 'function' ? currentRecipientPersonId() : '';
    const task = explicitTask || answers.taskContext || taskContexts.get(key(survey)) || state.responseTaskBySurvey?.[survey.id] || survey.currentTaskContext || {};
    const external = task.identityType === 'external' || (typeof isExternalFillContext === 'function' && isExternalFillContext(survey)) || /\/external(?:$|[/?#])/.test(String(state.page || ''));
    const snapshot = {schemaVersion: 1, capturedAt: now(), portal, departmentOrgType: portal, identityType: 'unknown', personId: external ? '' : personId,
      departmentIds: [], departmentNames: [], gradeId: '', gradeName: '', studentId: '', relationId: '', schoolId: ''};
    if (external) return {...snapshot, identityType: 'external'};
    const source = directory(), relationId = task.relationId || (source.studentGuardianRelations.some(row => row.relationId === personId) ? personId : '');
    const relation = source.studentGuardianRelations.find(row => row.relationId === relationId && row.status === 'active' && row.canReceive === true);
    const studentId = relation?.studentId || task.studentId || (task.identityType === 'student' || source.students.some(row => row.studentId === personId) ? personId : '');
    const student = source.students.find(row => row.studentId === studentId && row.status === 'active');
    if (relation && student) return {...snapshot, identityType: 'guardian', relationId: relation.relationId,
      studentId: student.studentId, guardianId: relation.guardianId, schoolId: student.schoolId,
      gradeId: student.gradeId || '', gradeName: label(student.gradeId), classId: student.classId || ''};
    if (student && (task.identityType === 'student' || !task.identityType && student.studentId === personId)) return {...snapshot, identityType: 'student', studentId: student.studentId,
      schoolId: student.schoolId, gradeId: student.gradeId || '', gradeName: label(student.gradeId), classId: student.classId || ''};
    // A guardian task with a missing/ambiguous relation must never fall back to the account's staff identity.
    if (['guardian', 'guardian_relation', 'parent'].includes(task.identityType) || task.relationId) return {...snapshot, identityType: 'guardian', relationId: task.relationId || '', studentId};
    if (task.identityType === 'student') return {...snapshot, identityType: 'student', studentId};
    const person = window.SurveyRoleV111?.getPersonContext?.({portal, personId, survey, taskContext: task});
    if (person?.identityType === 'staff') return {...snapshot, identityType: 'staff', personId: person.personId || personId,
      departmentIds: unique(person.departmentIds), departmentNames: (person.departmentNames || []).map(String)};
    const affiliations = typeof recipientPersonAffiliations === 'function' ? recipientPersonAffiliations(personId) : [];
    if (affiliations.length) return {...snapshot, identityType: 'staff', departmentIds: unique(affiliations.map(row => row.departmentId)),
      departmentNames: unique(affiliations.map(row => row.departmentName))};
    return snapshot;
  }
  function questions(survey) {
    const source = Array.isArray(survey.publishedQuestions) ? survey.publishedQuestions : surveyQuestions(survey);
    return SurveyRouting.normalizeQuestions(source.map((question, index) => ({...question, id: question.id || `filter-${survey.id}-q-${index + 1}`})));
  }
  function actualRecords(survey) {
    const containers = [MY_RESPONSES[state.portal]?.[survey.id], survey.internalResponseRecords, survey.respondentRecords];
    const seen = new Set(), result = [];
    containers.forEach(rows => (Array.isArray(rows) ? rows : []).forEach((record, index) => {
      if (!record || record.surveyId != null && String(record.surveyId) !== String(survey.id)) return;
      const id = record.id ?? record.responseId, identity = id != null ? `id:${id}` : record;
      if (seen.has(identity)) return;
      seen.add(identity); // Primary invalid records suppress stale embedded copies.
      if (record.valid === false) return;
      result.push(record);
    }));
    return result;
  }
  function readable(value) {
    if (Array.isArray(value)) return value.map(readable).join('、');
    if (value && typeof value === 'object') return String(value.name || value.fileName || value.address || value.url || '');
    return String(value ?? '');
  }
  function aggregateRecord(qs, record) {
    if (Array.isArray(record.answerEntries)) return record;
    const entries = qs.flatMap((question, index) => {
      const tuple = record.answers?.find(answer => answer?.[2]?.questionId === question.id)
        || (record.answers?.[index]?.[0] === question.title ? record.answers[index] : null);
      if (!tuple) return [];
      const metadata = tuple[2] || {}, value = questionKind(question.type) === 'multiple' && typeof tuple[1] === 'string'
        ? tuple[1].split('、').filter(Boolean) : tuple[1];
      return [{...metadata, questionId: question.id, value, status: metadata.status || (SurveyRouting.empty(value) ? 'unanswered' : 'answered')}];
    });
    return {...record, answerEntries: entries};
  }
  function snapshotOf(record) { return record.respondentSnapshot || null; }
  function applicable(record, dimension) {
    const snapshot = snapshotOf(record), type = snapshot?.identityType;
    if (record.external === true || type === 'external') return false;
    if (!snapshot || !type || type === 'unknown') return true;
    if (dimension === 'grade') return ['student', 'guardian', 'guardian_relation', 'parent'].includes(type);
    return type === 'staff' && (!snapshot.portal || snapshot.portal === state.portal)
      && !(state.portal === 'bureau' && snapshot.schoolId && snapshot.departmentOrgType !== 'bureau');
  }
  function membershipIds(record, dimension) {
    const snapshot = snapshotOf(record);
    if (dimension === 'grade') return snapshot?.gradeId ? [String(snapshot.gradeId)] : [];
    return unique(snapshot?.departmentIds || snapshot?.departments?.map(row => row.id || row.departmentId));
  }
  function matchesDimension(record, dimension, selectedIds) {
    if (!selectedIds.length) return true;
    if (!applicable(record, dimension)) return false;
    const ids = membershipIds(record, dimension);
    return ids.length ? ids.some(id => selectedIds.includes(id)) : selectedIds.includes(UNCLASSIFIED);
  }
  function validateFilter(filter) {
    if (state.portal === 'bureau' && filter.gradeIds?.length) throw new Error('教育局端不支持年级筛选');
  }
  function matches(record, filter) {
    validateFilter(filter);
    const values = valuesFor(filter);
    return matchesDimension(record, 'department', values.departmentIds) && matchesDimension(record, 'grade', values.gradeIds);
  }
  function optionsFor(records, dimension) {
    const rows = new Map();
    if (dimension === 'department') departments().forEach(row => rows.set(row.id, row));
    if (dimension === 'grade') directory().orgNodes.filter(node => node.nodeType === 'grade').forEach(node => rows.set(node.nodeId, {id: node.nodeId, name: node.nodeName}));
    records.filter(record => applicable(record, dimension)).forEach(record => {
      const snapshot = snapshotOf(record);
      membershipIds(record, dimension).forEach((id, index) => {
        if (!rows.has(id)) rows.set(id, {id, name: dimension === 'grade' ? snapshot.gradeName || id : snapshot.departmentNames?.[index] || snapshot.departments?.[index]?.name || id});
      });
    });
    return [...rows.values(), {id: UNCLASSIFIED, name: '未归类'}];
  }
  function demoRecords(survey, qs, date) {
    const depts = departments(), fallback = state.portal === 'bureau' ? ['bureau-office', '办公室'] : ['school-admin', '行政办公室'];
    const first = depts[0] || {id: fallback[0], name: fallback[1]}, second = depts[1] || first;
    const grades = directory().orgNodes.filter(node => node.nodeType === 'grade');
    const firstGrade = grades.find(node => node.nodeId === 'grade-junior-7') || grades[0] || {nodeId: 'demo-grade-7', nodeName: '七年级'};
    const secondGrade = grades.find(node => node.nodeId === 'grade-junior-8') || grades[1] || {nodeId: 'demo-grade-8', nodeName: '八年级'};
    const snapshots = [
      {identityType: 'staff', departmentIds: [first.id], departmentNames: [first.name]},
      {identityType: 'staff', departmentIds: [second.id], departmentNames: [second.name]},
      {identityType: 'staff', departmentIds: unique([first.id, second.id]), departmentNames: unique([first.name, second.name])},
      {identityType: 'student', studentId: 'filter-demo-student-7', gradeId: firstGrade.nodeId, gradeName: firstGrade.nodeName},
      {identityType: 'guardian', relationId: 'filter-demo-relation-8', studentId: 'filter-demo-student-8', gradeId: secondGrade.nodeId, gradeName: secondGrade.nodeName},
      null,
      {identityType: 'external'},
    ];
    return snapshots.map((identity, index) => {
      const answers = qs.map((question, questionIndex) => {
        const kind = questionKind(question.type);
        const value = kind === 'single' ? question.options[index % Math.max(1, question.options.length)] || '演示选项'
          : kind === 'multiple' ? question.options.slice(0, index % Math.max(1, question.options.length) + 1)
          : kind === 'date' ? `${date || beijingDateKey()}${question.includeTime ? ' 09:00' : ''}`
          : kind === 'file' ? Array.from({length: index === 0 ? 12 : 1}, (_, n) => `筛选演示_${index + 1}_${n + 1}.jpg`)
          : kind === 'signature' ? '筛选演示签名' : kind === 'location' ? '浙江省-杭州市-西湖区' : `筛选演示回答 ${index + 1}－${questionIndex + 1}`;
        return [question.title, value];
      });
      const computed = SurveyRouting.computePath(qs, answers);
      return {id: `question-filter-demo-${state.portal}-${survey.id}-${index + 1}`, surveyId: survey.id, valid: true,
        external: identity?.identityType === 'external', dataOrigin: 'question_filter_demo', submitter: `筛选演示人员 ${index + 1}`,
        submittedAt: `${date || beijingDateKey()} 09:${String(index).padStart(2, '0')}:00`, answers,
        answerEntries: computed.errors.length ? aggregateRecord(qs, {answers}).answerEntries : computed.entries,
        respondentSnapshot: identity ? {schemaVersion: 1, capturedAt: now(), portal: state.portal, departmentIds: [], departmentNames: [], gradeId: '', ...identity} : null};
    });
  }
  function attachments(value) {
    if (Array.isArray(value)) return value.flatMap(attachments);
    if (value && typeof value === 'object') return [{name: value.name || value.fileName || value.url || '附件', url: value.url || '', format: value.mimeType || ''}];
    return String(value || '').split('、').filter(Boolean).map(name => ({name}));
  }
  function buildView(survey, filter = contextFor(survey)) {
    validateFilter(filter);
    const qs = questions(survey), date = isDailySurvey(survey) ? selectedStatsDate(survey) : '';
    const records = (isDailySurvey(survey) && !date ? [] : filter.demo ? demoRecords(survey, qs, date) : actualRecords(survey))
      .filter(record => !date || String(record.submittedAt || '').slice(0, 10) === date);
    const selected = records.filter(record => matches(record, filter)), prepared = selected.map(record => aggregateRecord(qs, record));
    const summaries = SurveyRouting.aggregate(qs, prepared);
    const result = qs.map((question, index) => {
      const summary = summaries[index], kind = questionKind(question.type), values = summary.values.map(item => readable(item.value));
      const base = {id: question.id, title: question.title, type: questionTypeLabel(question.type), kind, count: summary.count,
        applicableCount: summary.applicableCount, skippedCount: summary.skippedCount, unansweredCount: summary.unansweredCount, __questionFilterV111: true};
      if (kind === 'single' || kind === 'multiple') return {...base, options: summary.options.map(option => [option.text, option.count])};
      if (kind === 'text') return {...base, answers: values};
      if (kind === 'date') return {...base, dates: unique(values).map(value => [value, values.filter(item => item === value).length])};
      if (kind === 'file') return {...base, files: summary.values.flatMap((item, valueIndex) => attachments(item.value).map((file, fileIndex) => ({...file,
        id: `${item.record.id || `response-${valueIndex}`}:${question.id}:${fileIndex}`, format: String(file.name.split('.').pop() || 'FILE').toUpperCase(),
        preview: /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.name) ? 'image' : 'file', size: '—', submitter: item.record.submitter || '填写人', time: item.record.submittedAt || '—'})))};
      if (kind === 'signature') return {...base, signatures: summary.values.map(item => ({name: readable(item.value), submitter: item.record.submitter || '填写人', time: item.record.submittedAt || '—'}))};
      if (kind === 'location') return {...base, locations: unique(values).map(value => ({name: value, count: values.filter(item => item === value).length, address: value, coordinate: ['—', '—']}))};
      return base;
    });
    return {survey, filter, date, records, selected, questions: result, options: Object.fromEntries(dimensions().map(dimension => [dimension, optionsFor(records, dimension)]))};
  }
  function fileBody(question, survey, index, filter) {
    const files = question.files || [], pageCount = Math.max(1, Math.ceil(files.length / 8)), page = Math.min(filter.filePages[index] || 1, pageCount);
    const visible = files.slice((page - 1) * 8, page * 8);
    if (!files.length) return '<div class="text-answer-empty">当前筛选条件下暂无上传的文件或图片</div>';
    const canSelect = state.portal === 'school' && resourceCenterAvailable(), selected = selectedFileRows(survey.id, index, files), selectedIds = new Set(selected.map(file => file.id));
    return `${canSelect ? `<div class="asset-save-toolbar"><div><b>当前筛选共 ${files.length} 份附件，已选 ${selected.length} 份</b><span>全选包含分页外记录；另存为保存已选附件</span></div><button type="button" class="btn green" data-save-assets data-survey-id="${survey.id}" data-question-index="${index}" ${selected.length ? '' : 'disabled'}>另存为</button></div><label class="qf-select-all"><input type="checkbox" data-qf-select-files="${index}" ${selected.length === files.length ? 'checked' : ''}>全选当前筛选结果（${files.length} 份附件）</label>` : ''}
      <div class="stat-caption">共 ${files.length} 份附件</div><div class="asset-stat-grid">${visible.map(file => {
        const preview = file.preview === 'image', attrs = preview ? statPreviewAttrs('image', file.name, file.submitter, file.time) : '';
        return `<article class="asset-stat-card">${canSelect ? `<label class="qf-file-check"><input type="checkbox" data-qf-file-id="${esc(file.id)}" data-qf-question="${index}" aria-label="选择${esc(file.name)}" ${selectedIds.has(file.id) ? 'checked' : ''}></label>` : ''}${preview ? `<button type="button" class="asset-preview image" ${attrs}><span>图片预览</span></button>` : `<div class="asset-preview file"><span>${esc(file.format)}</span></div>`}<div><b>${esc(file.name)}</b><span>${esc(file.format)} · ${esc(file.size)}</span><small>${esc(file.submitter)} · ${esc(file.time)}</small><button class="link-btn" ${preview ? attrs : 'data-preview-stat-asset="文件"'}>查看</button></div></article>`;
      }).join('')}</div>${pageCount > 1 ? `<div class="text-answer-pagination"><button class="btn sm" data-qf-file-page="${page - 1}" data-qf-question="${index}" ${page === 1 ? 'disabled' : ''}>上一页</button><span>第 ${page} / ${pageCount} 页</span><button class="btn sm" data-qf-file-page="${page + 1}" data-qf-question="${index}" ${page === pageCount ? 'disabled' : ''}>下一页</button></div>` : ''}`;
  }
  function selectedFileRows(surveyId, questionIndex, files) {
    const selection = attachmentSelection(surveyId, questionIndex, files.length);
    return files.filter(file => selection.all ? !selection.excluded.has(file.id) : selection.ids.has(file.id));
  }
  function sectionMarkup(view) {
    const {survey, filter, questions: qs} = view, index = Math.min(state.pcStatsQuestion, Math.max(0, qs.length - 1)), question = qs[index];
    return `<section class="pc-question-section qf-v111" data-v111-question-filter data-survey-id="${survey.id}"><div class="pc-section-head"><div><h2>题目数据</h2></div><button class="link-btn qf-demo-toggle" type="button" data-qf-demo>${filter.demo ? '返回答卷数据' : '查看筛选演示'}</button></div>
      ${filter.demo ? '<div class="qf-demo-notice" role="note"><b>筛选演示</b><span>当前为独立样例答卷，不计入问卷统计、人员明细与导出。</span></div>' : ''}
      ${filterFormMarkup(view)}
      ${filter.departmentIds.length || filter.gradeIds.length ? `<p class="qf-scope-note">${state.portal === 'bureau' ? '按本机关教职工提交时的部门归属筛选。' : '部门按教职工归属筛选，年级仅纳入学生及对应学生家长；同时选择部门与年级时取交集。'}未归类仅含缺少归属的内部答卷。</p>` : ''}
      ${question ? `<div class="pc-question-layout"><nav class="pc-question-nav">${qs.map((item, i) => `<button class="${index === i ? 'active' : ''}" data-pc-question-index="${i}"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(item.title)}<small>${esc(item.type)}</small></span><em>${item.count} 份</em></button>`).join('')}</nav><article class="pc-question-detail"><div class="pc-question-detail-head"><div><span>第 ${index + 1} 题 · ${esc(question.type)}</span><h3>${esc(question.title)}</h3></div><strong>${question.count}<small>有效回答</small></strong></div>${view.selected.length ? question.kind === 'file' ? `<div class="jump-stat-metrics"><span>适用答卷 <b>${question.applicableCount}</b></span><span>逻辑跳过 <b>${question.skippedCount}</b></span><span>未作答 <b>${question.unansweredCount}</b></span></div>${fileBody(question, survey, index, filter)}` : questionStatBody(question, survey.id, index) : '<div class="stats-no-task">当前筛选条件下暂无题目数据</div>'}</article></div>` : '<div class="stats-no-task">暂无题目统计数据</div>'}</section>`;
  }
  function clearViewState(survey) {
    Object.keys(state.textAnswerViews || {}).filter(value => value.startsWith(`${state.portal}:${survey.id}:`)).forEach(value => delete state.textAnswerViews[value]);
    contextFor(survey).filePages = {};
    if (typeof clearAttachmentSelections === 'function') clearAttachmentSelections();
    lockedSave = null;
  }
  function findSurvey(id) { return CONFIG[state.portal]?.surveys.find(survey => String(survey.id) === String(id) && survey.deleted !== 1); }
  function filteredSaveContext(surveyId, questionIndex, freeze = false) {
    const survey = findSurvey(surveyId), index = Number(questionIndex);
    if (!survey) return {allowed: false, survey: null, question: null, files: [], count: 0, questionIndex: index};
    const view = buildView(survey), question = view.questions[index];
    if (question?.kind !== 'file') return {allowed: false, survey, question, files: [], count: 0, questionIndex: index};
    const files = selectedFileRows(survey.id, index, question.files).map((file, fileIndex) => ({...file, index: fileIndex, synthetic: false}));
    const context = {allowed: resourceCenterAvailable(), survey, question, questionIndex: index, files, count: files.length,
      questionFilterV111: {...valuesFor(view.filter), date: view.date, demo: view.filter.demo}};
    if (freeze) lockedSave = {portal: state.portal, surveyId: String(survey.id), questionIndex: index, context};
    return context;
  }
  function isFilterPage(surveyId) { return state.preview === 'pc' && state.page === `stats/detail/${surveyId}`; }
  function install() {
    if (typeof renderStatsDetailPage !== 'function' || typeof surveyResponseMetadata !== 'function') return;
    if (!installed) {
      installed = true;
      baseRender = renderStatsDetailPage; baseMetadata = surveyResponseMetadata;
      baseSaveContext = selectedSaveContext; baseAttachmentFiles = selectedAttachmentFiles;
    }
    renderStatsDetailPage = renderFilteredDetail;
    surveyResponseMetadata = metadataWithSnapshot;
    selectedSaveContext = saveContextWithFilter;
    selectedAttachmentFiles = attachmentsWithFilter;
    document.documentElement.dataset.questionFilterV111 = 'ready';
  }
  function renderFilteredDetail(survey = statsSurvey()) {
    const markup = baseRender(survey);
    if (!survey || state.preview !== 'pc') return markup;
    const template = document.createElement('template');
    template.innerHTML = markup;
    const section = template.content.querySelector('.pc-question-section');
    if (section) {
      try { section.outerHTML = sectionMarkup(buildView(survey)); }
      catch (error) {
        const filter = contextFor(survey);
        track('survey_question_filter_error', survey, {...filterProperties(filter),
          result_count: 0, stats_date: isDailySurvey(survey) ? selectedStatsDate(survey) : '', reason: 'aggregation_failed'});
        section.outerHTML = '<section class="pc-question-section qf-v111"><h2>题目数据</h2><div class="stats-no-task" role="alert">题目数据加载失败，请刷新后重试</div></section>';
      }
    }
    requestAnimationFrame(() => markMixed());
    return template.innerHTML;
  }
  function metadataWithSnapshot(survey, answers, taskContext) {
    return {...baseMetadata(survey, answers), respondentSnapshot: taskSnapshot(survey, answers, taskContext)};
  }
  function saveContextWithFilter(surveyId, questionIndex) {
    if (isFilterPage(surveyId)) {
      if (lockedSave?.portal === state.portal && lockedSave.surveyId === String(surveyId) && lockedSave.questionIndex === Number(questionIndex)) return lockedSave.context;
      return filteredSaveContext(surveyId, questionIndex);
    }
    return baseSaveContext(surveyId, questionIndex);
  }
  function attachmentsWithFilter(context) {
    return context.question?.__questionFilterV111 ? (context.files || selectedFileRows(context.survey.id, context.questionIndex, context.question.files || [])).map((file, index) => ({...file, index, synthetic: false})) : baseAttachmentFiles(context);
  }
  document.addEventListener('click', event => {
    const root = event.target.closest?.('[data-v111-question-filter]');
    if (!root || state.preview !== 'pc') return;
    const survey = findSurvey(root.dataset.surveyId);
    if (!survey) return;
    const filter = contextFor(survey), pending = pendingFor(filter), demo = event.target.closest('[data-qf-demo]'), page = event.target.closest('[data-qf-file-page]');
    if (event.target.closest('[data-save-assets]')) {
      const button = event.target.closest('[data-save-assets]'), context = filteredSaveContext(survey.id, button.dataset.questionIndex, true);
      track('survey_question_attachment_save', survey, {...filterProperties(filter),
        result_count: buildView(survey).selected.length, stats_date: context.questionFilterV111.date,
        file_count: context.count, data_source: filter.demo ? 'demo' : 'responses'});
    }
    if (event.target.closest('[data-qf-query],[data-qf-reset]')) {
      const reset = Boolean(event.target.closest('[data-qf-reset]'));
      Object.assign(filter, reset ? {departmentIds: [], gradeIds: []} : valuesFor(pending));
      delete filter.pending;
      clearViewState(survey); trackChange(survey, filter);
      track(reset ? 'survey_question_filter_reset' : 'survey_question_filter_query', survey, filterProperties(filter));
      renderShell();
    } else if (event.target.closest('[data-qf-tree-toggle],[data-qf-clear],[data-qf-expand]')) {
      const dimension = event.target.closest('[data-qf-field]').dataset.qfField, treeState = pending.trees[dimension];
      if (event.target.closest('[data-qf-tree-toggle]')) {
        const open = !treeState.treeOpen;
        Object.values(pending.trees).forEach(tree => { tree.treeOpen = false; });
        treeState.treeOpen = open;
      } else if (event.target.closest('[data-qf-clear]')) pending[fieldKey(dimension)] = [];
      else {
        const id = event.target.closest('[data-qf-expand]').dataset.qfExpand;
        treeState.collapsed = treeState.collapsed.includes(id) ? treeState.collapsed.filter(value => value !== id) : [...treeState.collapsed, id];
      }
      refreshFilterForm(survey);
    } else if (demo) {
      filter.demo = !filter.demo; clearViewState(survey);
      track('survey_question_demo_toggle', survey, {enabled: filter.demo, ...filterProperties(filter),
        result_count: buildView(survey).selected.length, stats_date: isDailySurvey(survey) ? selectedStatsDate(survey) : ''}); renderShell();
    } else if (page) { filter.filePages[page.dataset.qfQuestion] = Math.max(1, Number(page.dataset.qfFilePage)); renderShell(); }
  }, true);
  document.addEventListener('change', event => {
    const input = event.target, root = input.closest?.('[data-v111-question-filter]');
    if (!root || !input.matches('[data-qf-node],[data-qf-file-id],[data-qf-select-files]')) return;
    const survey = findSurvey(root.dataset.surveyId);
    if (!survey) return;
    const filter = contextFor(survey);
    if (input.matches('[data-qf-file-id],[data-qf-select-files]')) {
      const index = Number(input.dataset.qfSelectFiles ?? input.dataset.qfQuestion), files = buildView(survey).questions[index]?.files || [];
      const selection = attachmentSelection(survey.id, index, files.length);
      if (input.matches('[data-qf-select-files]')) { selection.all = input.checked; selection.ids.clear(); selection.excluded.clear(); }
      else {
        if (selection.all) input.checked ? selection.excluded.delete(input.dataset.qfFileId) : selection.excluded.add(input.dataset.qfFileId);
        else input.checked ? selection.ids.add(input.dataset.qfFileId) : selection.ids.delete(input.dataset.qfFileId);
      }
      lockedSave = null; renderShell(); return;
    }
    const pending = pendingFor(filter), dimension = input.closest('[data-qf-field]').dataset.qfField, field = fieldKey(dimension);
    const ids = treeFor(buildView(survey).records, dimension).nodes.get(input.dataset.qfNode)?.valueIds || [];
    pending[field] = input.checked ? unique([...pending[field], ...ids]) : pending[field].filter(id => !ids.includes(id));
    refreshFilterForm(survey);
  });
  document.addEventListener('input', event => {
    if (!event.target.matches?.('[data-qf-search]')) return;
    const survey = findSurvey(event.target.closest('[data-v111-question-filter]')?.dataset.surveyId);
    if (!survey) return;
    const root = event.target.closest('[data-qf-field]'), dimension = root.dataset.qfField, pending = pendingFor(contextFor(survey));
    const treeState = pending.trees[dimension]; treeState.search = event.target.value;
    // Preserve the live search input and Chinese input composition while updating only tree rows.
    const template = document.createElement('template');
    template.innerHTML = treeMarkup(treeFor(buildView(survey).records, dimension), {...treeState, selectedIds: pending[fieldKey(dimension)]});
    root.querySelector('.qf-tree-list').outerHTML = template.content.querySelector('.qf-tree-list').outerHTML;
    markMixed(root);
  });
  function collapseTrees(event) {
    if (event.type === 'keydown' && event.key !== 'Escape' || event.type === 'click' && event.target.closest?.('.qf-tree-select')) return;
    document.querySelectorAll('[data-v111-question-filter]').forEach(root => {
      const survey = findSurvey(root.dataset.surveyId), pending = survey && pendingFor(contextFor(survey));
      if (!pending) return;
      Object.values(pending.trees).forEach(tree => { tree.treeOpen = false; });
      root.querySelectorAll('.qf-tree-popover').forEach(popover => popover.remove());
      root.querySelectorAll('[data-qf-tree-toggle]').forEach(button => button.setAttribute('aria-expanded', 'false'));
    });
  }
  document.addEventListener('click', collapseTrees);
  document.addEventListener('keydown', collapseTrees);
  window.addEventListener('hashchange', () => { lockedSave = null; });
  window.SurveyQuestionFilterV111 = {version: RELEASE, unclassifiedId: UNCLASSIFIED, buildView, actualRecords, taskSnapshot, matches,
    contextFor, pendingFor, treeFor, filteredSaveContext, install, setTaskContext(surveyId, context) {
      const taskKey = `${state.portal}:${surveyId}`;
      if (context == null) taskContexts.delete(taskKey); else taskContexts.set(taskKey, clone(context));
    }};
  install();
  document.addEventListener('DOMContentLoaded', () => { install(); if (state.portal) renderShell(); });
})();

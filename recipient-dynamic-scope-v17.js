/* Dynamic department and workgroup recipient contract V1.7. */
(() => {
  'use strict';

  const personIdOf = person => person?.personId || person?.id || '';
  const unique = values => [...new Set((values || []).filter(Boolean))];

  /* The legacy bundle below app.js has had several incompatible recipient
   * implementations over time.  Keep the V1.7 selection contract complete in
   * this last-loaded layer so a member action only changes the scope in which
   * the action was made. */
  isDynamicRecipientScope = function (item) {
    const category = item?.scopeType || recipientItemCategory(item || {});
    return Boolean(item && ['department', 'workgroup'].includes(category) &&
      item.level === 'scope' && ['dynamic', 'dynamic_department'].includes(item.selectionMode));
  };

  const clonePerson = item => ({
    ...(item || {}),
    sourceCategories: [...(item?.sourceCategories || [])],
    sourceScopeIds: [...(item?.sourceScopeIds || [])],
    departmentSourceIds: [...(item?.departmentSourceIds || [])],
    workgroupSourceIds: [...(item?.workgroupSourceIds || [])],
    workgroupIds: [...(item?.workgroupIds || [])],
    workgroupNames: [...(item?.workgroupNames || [])],
    departments: (item?.departments || []).map(value => ({...value})),
  });
  const personKey = (category, personId) => recipientSelectionKey(category, personId);
  const scopeKey = (category, scopeId) => recipientScopeSelectionKey(category, scopeId);
  const manualScopeKey = (category, scopeId) => `${category}:${scopeId}`;
  const ensureManualScopeSet = () => {
    if (!(state.recipientPickerManualPartialScopes instanceof Set)) {
      state.recipientPickerManualPartialScopes = new Set();
    }
    return state.recipientPickerManualPartialScopes;
  };
  const scopeObject = (category, scopeId) => {
    const definition = recipientScopeDefinition(category, scopeId);
    const name = definition?.name || scopeId;
    const value = {
      id: scopeId, scopeId, name, category, level: 'scope', scopeType: category,
      selectionMode: 'dynamic', count: recipientScopeMembers(category, scopeId).length,
    };
    if (category === 'department') {
      Object.assign(value, {departmentId: scopeId, departmentNameSnapshot: name});
    } else {
      Object.assign(value, {workgroupId: scopeId, workgroupNameSnapshot: name});
    }
    return value;
  };
  const mergePersonSource = (category, person, scopeId = '') => {
    const personId = personIdOf(person);
    if (!personId || !(state.recipientPickerDraft instanceof Map)) return;
    const key = personKey(category, personId);
    const existing = state.recipientPickerDraft.get(key);
    const next = existing ? clonePerson(existing) : clonePerson(recipientPersonValue(category, {...person, personId}, scopeId));
    Object.assign(next, {id: personId, personId, name: person.name || next.name, category, level: 'person', count: 1});
    next.sourceScopeIds = unique([...(next.sourceScopeIds || []), ...(scopeId ? [scopeId] : [])]);
    next.explicitSelection = scopeId ? Boolean(next.explicitSelection) : true;
    if (category === 'department' && scopeId) {
      next.departmentId = next.departmentId || scopeId;
      next.departmentName = next.departmentName || recipientScopeDefinition('department', scopeId)?.name || '';
    }
    if (category === 'workgroup' && scopeId) {
      const ids = unique([...(next.workgroupIds || []), scopeId]);
      next.workgroupIds = ids;
      next.workgroupNames = ids.map(id => recipientScopeDefinition('workgroup', id)?.name || id);
    }
    state.recipientPickerDraft.set(key, next);
  };
  const removePersonSource = (category, personId, scopeId = '') => {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const key = personKey(category, personId);
    const current = state.recipientPickerDraft.get(key);
    if (!current) return;
    if (!scopeId) {
      state.recipientPickerDraft.delete(key);
      return;
    }
    const next = clonePerson(current);
    next.sourceScopeIds = unique(next.sourceScopeIds).filter(id => id !== scopeId);
    if (category === 'workgroup') {
      const ids = next.workgroupIds || [];
      next.workgroupIds = ids.filter(id => id !== scopeId);
      next.workgroupNames = next.workgroupIds.map(id => recipientScopeDefinition('workgroup', id)?.name || id);
    }
    if (!next.sourceScopeIds.length && !next.explicitSelection) state.recipientPickerDraft.delete(key);
    else state.recipientPickerDraft.set(key, next);
  };

  setDraftDynamicScope = function (category, scopeId, checked) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const definition = recipientScopeDefinition(category, scopeId);
    const members = recipientScopeMembers(category, scopeId);
    const selectable = Boolean(definition) && members.length > 0 &&
      !(category === 'department' && definition.isLeaf !== true);
    if (!selectable) return;
    const key = scopeKey(category, scopeId);
    const manualSet = ensureManualScopeSet();
    if (checked) {
      state.recipientPickerDraft.set(key, scopeObject(category, scopeId));
      members.forEach(person => removePersonSource(category, personIdOf(person), scopeId));
      manualSet.delete(manualScopeKey(category, scopeId));
    } else {
      state.recipientPickerDraft.delete(key);
      members.forEach(person => removePersonSource(category, personIdOf(person), scopeId));
      manualSet.delete(manualScopeKey(category, scopeId));
    }
    recipientTrack(checked ? 'recipient_scope_select' : 'recipient_scope_unselect', {
      category, scope_type: category, scope_id: scopeId,
      selection_mode: checked ? 'dynamic' : 'none', resolved_person_count: members.length,
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft),
    });
  };

  convertDraftScopeToPeople = function (category, scopeId, excludedPersonId = '') {
    if (!(state.recipientPickerDraft instanceof Map) || !state.recipientPickerDraft.has(scopeKey(category, scopeId))) return;
    const members = recipientScopeMembers(category, scopeId);
    state.recipientPickerDraft.delete(scopeKey(category, scopeId));
    ensureManualScopeSet().add(manualScopeKey(category, scopeId));
    members.forEach(person => {
      const personId = personIdOf(person);
      if (personId === excludedPersonId) removePersonSource(category, personId, scopeId);
      else mergePersonSource(category, person, scopeId);
    });
    recipientTrack('recipient_scope_convert_to_people', {
      category, scope_type: category, scope_id: scopeId, person_id: excludedPersonId,
      selection_mode: 'explicit_people', resolved_person_count: members.length,
      converted_person_count: Math.max(0, members.length - (excludedPersonId ? 1 : 0)),
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft),
    });
  };

  removeDraftPersonEverywhere = function (category, personId) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const containingScopes = [...state.recipientPickerDraft.values()].filter(item =>
      isDynamicRecipientScope(item) && (item.scopeType || recipientItemCategory(item)) === category &&
      recipientScopeMembers(category, recipientScopeId(item)).some(person => personIdOf(person) === personId));
    containingScopes.forEach(item => convertDraftScopeToPeople(category, recipientScopeId(item), personId));
    state.recipientPickerDraft.delete(personKey(category, personId));
  };

  setDraftPerson = function (category, person, checked, scopeId = '') {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const personId = personIdOf(person);
    if (!personId) return;
    if (checked) {
      if (scopeId && !recipientScopeMembers(category, scopeId).some(value => personIdOf(value) === personId)) return;
      mergePersonSource(category, person, scopeId);
      if (scopeId) ensureManualScopeSet().add(manualScopeKey(category, scopeId));
    } else if (scopeId && state.recipientPickerDraft.has(scopeKey(category, scopeId))) {
      convertDraftScopeToPeople(category, scopeId, personId);
    } else {
      removePersonSource(category, personId, scopeId);
      if (scopeId) ensureManualScopeSet().add(manualScopeKey(category, scopeId));
    }
    recipientTrack(checked ? 'recipient_person_select' : 'recipient_person_unselect', {
      category, person_id: personId,
      department_id: category === 'department' ? scopeId : '',
      workgroup_id: category === 'workgroup' ? scopeId : '',
      selection_mode: 'explicit_people',
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft),
    });
  };

  const directoryPersonBase = recipientDirectoryPerson;
  recipientDirectoryPerson = function (personId) {
    const person = directoryPersonBase(personId);
    return person?.status === 'active' && person?.canReceive === true ? person : null;
  };

  const scopeMembersBase = recipientScopeMembers;
  recipientScopeMembers = function (category, scopeId) {
    return scopeMembersBase(category, scopeId)
      .filter(person => person?.status === 'active' && person?.canReceive === true);
  };

  recipientScopeIsInvalid = function (item) {
    if (!isDynamicRecipientScope(item)) return false;
    const category = item.scopeType || recipientItemCategory(item);
    const scopeId = recipientScopeId(item);
    const definition = recipientScopeDefinition(category, scopeId);
    const inaccessible = definition && (
      definition.deleted === true || definition.deleted === 1 ||
      definition.status === 'deleted' || definition.authorized === false ||
      definition.canAccess === false || definition.permissionDenied === true
    );
    return !definition || inaccessible ||
      (category === 'department' && !definition.isLeaf) ||
      !recipientScopeMembers(category, scopeId).length;
  };

  recipientScopeState = function (category, scopeId, store = state.recipientPickerDraft || state.recipients) {
    const members = recipientScopeMembers(category, scopeId);
    const checked = Boolean(store?.has(recipientScopeSelectionKey(category, scopeId)));
    const selected = checked
      ? members.length
      : members.filter(person => recipientPersonSelectedInScope(category, personIdOf(person), scopeId, store)).length;
    return {checked, indeterminate: !checked && selected > 0, selected, members};
  };

  const bindRecipientPickerControlsBase = bindRecipientPickerControls;
  bindRecipientPickerControls = function (root = $('#view')) {
    bindRecipientPickerControlsBase(root);
    const workgroupAll = $('[data-workgroup-select-all]', root);
    if (!workgroupAll) return;
    const value = recipientScopeState('workgroup', state.recipientWorkgroupId, state.recipientPickerDraft);
    workgroupAll.checked = value.checked;
    workgroupAll.indeterminate = value.indeterminate;
    workgroupAll.setAttribute('aria-checked', value.indeterminate ? 'mixed' : String(value.checked));
  };

  selectedRecipientSnapshot = function () {
    const scopes = [];
    const people = new Map();
    const ranges = [];
    const ensurePerson = (person, category) => {
      const personId = personIdOf(person);
      if (!personId) return null;
      const record = people.get(personId) || {
        personId,
        name: person.name,
        status: person.status || 'active',
        sourceCategories: new Set(),
        departmentSourceIds: new Set(),
        workgroupSourceIds: new Set(),
        explicitCategories: new Set(),
        departments: new Map(),
        positions: new Set(),
        workgroups: new Map(),
      };
      record.name = person.name || record.name;
      record.sourceCategories.add(category);
      people.set(personId, record);
      return record;
    };

    usableRecipientItems().forEach(item => {
      const category = recipientItemCategory(item);
      if (isDynamicRecipientScope(item)) {
        const scopeId = recipientScopeId(item);
        const definition = recipientScopeDefinition(category, scopeId);
        const name = definition?.name || item.name || scopeId;
        const scope = {
          id: scopeId, scopeId, name,
          count: recipientScopeMembers(category, scopeId).length,
          category, level: 'scope', scopeType: category,
          selectionMode: 'dynamic',
        };
        if (category === 'department') {
          Object.assign(scope, {departmentId: scopeId, departmentNameSnapshot: name});
        } else {
          Object.assign(scope, {workgroupId: scopeId, workgroupNameSnapshot: name});
        }
        scopes.push(scope);
        return;
      }

      if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        const current = ['department', 'workgroup'].includes(category) ? recipientDirectoryPerson(personId) : null;
        if (['department', 'workgroup'].includes(category) && !current) return;
        const source = current ? {...item, ...current, personId} : item;
        const record = ensurePerson(source, category);
        if (!record) return;
        const sourceIds = recipientPersonSourceIds(item);
        if (item.explicitSelection || item.explicitCategories?.includes(category)) record.explicitCategories.add(category);
        recipientPersonAffiliations(personId).forEach(affiliation => {
          record.departments.set(affiliation.departmentId, {...affiliation});
          if (affiliation.position) record.positions.add(affiliation.position);
        });
        if (category === 'department') {
          sourceIds.forEach(scopeId => {
            record.departmentSourceIds.add(scopeId);
            const affiliation = recipientPersonAffiliations(personId).find(value => value.departmentId === scopeId) || {
              departmentId: scopeId,
              departmentName: recipientScopeDefinition('department', scopeId)?.name || source.departmentName || '',
              position: source.position || '',
            };
            record.departments.set(scopeId, {...affiliation});
            if (affiliation.position) record.positions.add(affiliation.position);
          });
        }
        if (category === 'workgroup') {
          unique([...sourceIds, ...(item.workgroupIds || [])]).forEach(workgroupId => {
            record.workgroupSourceIds.add(workgroupId);
            record.workgroups.set(workgroupId, {
              workgroupId,
              workgroupName: recipientScopeDefinition('workgroup', workgroupId)?.name || workgroupId,
            });
          });
        }
        return;
      }

      if (item.level === 'school' || item.schoolId) {
        const count = Number(item.staffCount ?? item.count ?? 0);
        ranges.push({
          id: item.schoolId || item.id, schoolId: item.schoolId || item.id,
          name: item.name, type: item.type || '', count, staffCount: count,
          category: 'school', level: 'school', selectionMode: 'all_staff',
        });
        return;
      }
      ranges.push({
        id: item.id, name: item.name, count: Number(item.count || 0),
        category, level: item.level || 'group', parent: item.parent || '',
        excludedChildIds: [...(item.excludedChildIds || [])],
      });
    });

    const personSnapshots = [...people.values()].map(record => {
      const departments = [...record.departments.values()];
      const workgroups = [...record.workgroups.values()];
      const positions = [...record.positions];
      const explicitCategories = [...record.explicitCategories];
      return {
        personId: record.personId, name: record.name, count: 1,
        category: [...record.sourceCategories][0] || 'department',
        level: 'person', status: record.status,
        sourceCategories: [...record.sourceCategories],
        departmentSourceIds: [...record.departmentSourceIds],
        workgroupSourceIds: [...record.workgroupSourceIds],
        explicitCategories, explicitSelection: explicitCategories.length > 0,
        departmentId: departments[0]?.departmentId || '',
        departmentName: departments[0]?.departmentName || '',
        position: positions[0] || '', departments, positions,
        workgroupIds: workgroups.map(value => value.workgroupId),
        workgroupNames: workgroups.map(value => value.workgroupName),
      };
    });
    return [...scopes, ...personSnapshots, ...ranges];
  };

  /* Templates carry questionnaire content only. Recipient and collection
   * configuration always starts from the defaults of a new questionnaire. */
  const surveyTemplateValueV17 = function (existing) { return surveyTemplateContentValue(existing); };
  const loadSurveyTemplateStateV17 = function (item, editing = false) { loadSurveyTemplateContentState(item, editing); };
  surveyTemplateValue = surveyTemplateValueV17;
  loadSurveyTemplateState = loadSurveyTemplateStateV17;

  PRD_FIELD_GROUPS.recipients = [
    ['接收对象模块', '教育局端为内部部门、工作组、学校；学校端为内部部门、家长、班级。各模块均非必填，未选择内部范围时可在收集设置中开启外部填写。', 'recipientOverviewTabs() / recipientSelectionError()'],
    ['动态范围回显', '主动勾选部门或工作组后显示范围标签及当前有效人数，不展开成员姓名。', 'recipientModuleMarkupV2()'],
    ['明确人员回显', '逐人选择始终保存人员对象；逐人选满不会自动变成动态范围。', 'setDraftPerson()'],
    ['范围转人员', '从动态范围取消任一成员时删除范围，并将其余有效成员转成明确人员。', 'convertDraftScopeToPeople()'],
    ['实时解析', '动态范围在整个收集期按当前组织关系解析 active 且 canReceive=true 的人员。', 'surveyRecipientResolution()'],
    ['交叉去重', '部门、工作组及跨模块成员按 personId 去重；取消一个范围不影响其他范围资格。', 'recipientResolvedSelection()'],
    ['发布数据', 'recipientSnapshot 保留 dynamic scope，发布时不展开动态范围。', 'selectedRecipientSnapshot()'],
    ['统计口径', '总人数合并当前有效接收人与已有答卷人员；重复提交按人员去重。', 'recipientAssignmentTotal()'],
    ['学校选择', '教育局端学校行只展示学校名称与教职工人数；学校类型仅用于筛选，不在行内展示学段或类型。', 'schoolPickerMarkup() / filteredBureauSchools()'],
  ];
  PRD_FIELD_GROUPS.recipientPicker = [
    ['范围选择', '末级部门和有直接有效成员的工作组可勾选；空范围禁用，纯目录只展开。', 'data-picker-dynamic-scope'],
    ['范围状态', '主动勾选显示全选；逐人选择部分或全部成员时均显示半选。', 'recipientScopeState()'],
    ['搜索', '搜索仅过滤展示，范围仍覆盖全部当前有效成员。', 'recipientPickerSearch'],
    ['事务', 'PC 与移动端使用临时副本；确定提交，取消或返回回滚。', 'commitRecipientPicker() / discardRecipientPicker()'],
    ['异常', '范围缺失、越权或无有效人员时提示重选并阻止发布。', 'recipientScopeIsInvalid()'],
    ['学校筛选', '支持按学校名称和学校类型筛选；结果行只展示学校名称与教职工人数。', 'filteredBureauSchools() / schoolPickerMarkup()'],
  ];
  ['create-recipients', 'template-recipients', 'mobile-recipients', 'mobile-settings'].forEach(key => {
    if (PRD_PAGE_RULES[key]) PRD_PAGE_RULES[key].fields = prdFields(...(PRD_PAGE_FIELD_GROUPS[key] || ['recipients', 'recipientPicker']));
  });
  if (PRD_PAGE_RULES['create-recipients']) PRD_PAGE_RULES['create-recipients'].goal = '在 PC 端选择动态部门、教育局动态工作组或明确人员，并确认当前模块接收范围。';
  if (PRD_PAGE_RULES['template-recipients']) PRD_PAGE_RULES['template-recipients'].goal = '模板仅保存问卷基础信息与题目，不保存接收对象或收集设置。';
  if (PRD_PAGE_RULES['mobile-recipients']) PRD_PAGE_RULES['mobile-recipients'].goal = '在移动端按与 PC 一致的规则选择动态部门、动态工作组或明确人员。';
  if (PRD_PAGE_RULES['mobile-settings']) PRD_PAGE_RULES['mobile-settings'].goal = '配置外部填写、收集方式、开始日期、截止日期和每日提醒规则；内部范围已在上一流程步骤中确认。';
  PRD_OVERLAY_RULES['recipient-picker'] = {
    title: '部门与工作组动态范围选择',
    goal: '教育局端支持动态部门与动态工作组，学校端支持动态部门；整个收集期按最新组织成员解析填写资格和统计人数。',
    fields: prdFields('recipientPicker', 'recipients'),
  };

  renderRecipientPickerPrd = function (rule, key, entryType) {
    const features = [
      ['范围选择', '部门', '教育局端、学校端的 PC 与移动端均可勾选有有效成员的末级部门；展开按钮独立。', 'P0', '标签显示当前人数'],
      ['范围选择', '工作组', '教育局端 PC 与移动端可勾选有直接有效成员的工作组；纯目录仅展开。', 'P0', '空工作组禁用'],
      ['人员选择', '明确人员', '逐人选择保存人员对象；逐人选满不会自动变成动态范围，范围框保持半选。', 'P0', '部门与工作组一致'],
      ['选择联动', '范围转人员', '从动态范围取消任一成员时删除范围，将其余成员转为明确人员。', 'P0', '后续新增成员不纳入'],
      ['搜索事务', '过滤与提交', '搜索只过滤展示；确定提交临时副本，取消或返回回滚。', 'P0', '搜索不缩小范围'],
      ['数据保存', '动态对象', '问卷草稿和发布数据保留 scope/person 对象；发布时不展开动态范围。', 'P0', '模板仅保存问卷内容'],
      ['实时解析', '资格人数', '填写、人数和统计查询按当前关系解析 active 且 canReceive=true 的成员。', 'P0', '收集期实时生效'],
      ['统计口径', '历史并集', '总人数合并当前有效接收人与已有答卷人员；重复答卷按 personId 去重。', 'P0', '旧聚合为下界'],
      ['异常校验', '失效范围', '范围被删除、越权或无有效成员时提示重新选择并阻止发布。', 'P0', '不得静默转空'],
      ['学校选择', '精简列表', '教育局端学校行只展示学校名称和教职工人数；学校类型仅保留为筛选条件。', 'P0', '不展示学段或类型'],
    ];
    const payload = `{"recipientSnapshot":[{"id":"department-id","level":"scope","scopeType":"department","selectionMode":"dynamic"},{"id":"workgroup-id","level":"scope","scopeType":"workgroup","selectionMode":"dynamic"}]}`;
    return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType === 'page' ? '页面' : '弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite"><strong>动态范围口径</strong><p>只有主动勾选范围才保存动态对象；逐人选择保持明确人员。</p><small>发布时不展开动态范围；收集期按最新有效成员解析。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局与学校授权用户在 PC 或移动端选择组织范围或具体人员，成员变化后填写资格与统计人数同步更新；纯外部问卷可跳过内部选择并在收集设置中开启外部填写。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>动态部门、教育局动态工作组、明确人员、搜索、范围转人员、去重、草稿恢复、实时资格与统计、纯外部发布及学校列表精简。</p><h4>Out of Scope</h4><p>组织架构维护、已有人员选择自动迁移和后端定时任务。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块', '功能点', '需求描述', '优先级（P0 / P1 / P2）', '备注说明'], features)}</section><section><h3>5. 核心流程与交互说明</h3><p>展开与范围复选框独立。主动勾选保存 dynamic scope；取消范围内成员后转为明确人员。逐人选部分或全部成员时均保留人员对象并显示半选。确定提交临时副本，取消不保存。学校列表支持名称和类型筛选，但行内不展示学段或类型。</p>${prdTable(['字段/信息', '限制与展示规则', '当前原型来源'], rule.fields || [])}</section><section><h3>6. 异常场景与边界条件</h3><p>空范围和纯目录不可勾选。停用、离职或 canReceive=false 的人员失去新提交资格；新调入有效成员获得资格；已有答卷保留。内部范围为空且未开启外部填写时阻止发布。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>范围键为 department:scope:{departmentId} 或 workgroup:scope:{workgroupId}。发布原样保存 dynamic scope，查询实时解析；总人数使用当前有效接收人与历史答卷人员的 personId 并集。记录范围选择、范围转人员、人员选择、确认、取消和失效事件。</p><pre>${esc(payload)}</pre></section><section><h3>8. 风险、依赖与限制</h3><p>依赖稳定 personId、部门关系、工作组直接成员关系、人员状态和接收权限接口；服务端须使用同一解析器。</p></section><section><h3>9. 验收标准</h3><p>四端范围选择、半选、转人员、搜索、去重、失效、草稿、发布、成员增减、填写资格和统计人数均符合本规则；纯外部发布可用；学校行不展示学段或类型。</p></section></article>`;
  };

  /* app.js restores an older captured contract on DOMContentLoaded. Register
   * after it and restore the V1.7 functions once more so the effective browser
   * behavior matches the code exercised by QA. */
  const v17Contract = {
    isDynamicRecipientScope,
    recipientDirectoryPerson,
    recipientScopeMembers,
    recipientScopeIsInvalid,
    setDraftDynamicScope,
    convertDraftScopeToPeople,
    removeDraftPersonEverywhere,
    setDraftPerson,
    recipientScopeState,
    selectedRecipientSnapshot,
    bindRecipientPickerControls,
    renderRecipientPickerPrd,
    surveyTemplateValue: surveyTemplateValueV17,
    loadSurveyTemplateState: loadSurveyTemplateStateV17,
    recipientFields: PRD_FIELD_GROUPS.recipients.map(row => [...row]),
    pickerFields: PRD_FIELD_GROUPS.recipientPicker.map(row => [...row]),
    pageRules: Object.fromEntries(['create-recipients', 'template-recipients', 'mobile-recipients', 'mobile-settings'].map(key => [key, {
      goal: PRD_PAGE_RULES[key]?.goal || '',
      fields: (PRD_PAGE_RULES[key]?.fields || []).map(row => [...row]),
    }])),
    overlayRule: {
      ...PRD_OVERLAY_RULES['recipient-picker'],
      fields: (PRD_OVERLAY_RULES['recipient-picker']?.fields || []).map(row => [...row]),
    },
  };
  const applyV17Contract = (rerender = false) => {
    isDynamicRecipientScope = v17Contract.isDynamicRecipientScope;
    recipientDirectoryPerson = v17Contract.recipientDirectoryPerson;
    recipientScopeMembers = v17Contract.recipientScopeMembers;
    recipientScopeIsInvalid = v17Contract.recipientScopeIsInvalid;
    setDraftDynamicScope = v17Contract.setDraftDynamicScope;
    convertDraftScopeToPeople = v17Contract.convertDraftScopeToPeople;
    removeDraftPersonEverywhere = v17Contract.removeDraftPersonEverywhere;
    setDraftPerson = v17Contract.setDraftPerson;
    recipientScopeState = v17Contract.recipientScopeState;
    selectedRecipientSnapshot = v17Contract.selectedRecipientSnapshot;
    bindRecipientPickerControls = v17Contract.bindRecipientPickerControls;
    renderRecipientPickerPrd = v17Contract.renderRecipientPickerPrd;
    surveyTemplateValue = v17Contract.surveyTemplateValue;
    loadSurveyTemplateState = v17Contract.loadSurveyTemplateState;
    PRD_FIELD_GROUPS.recipients = v17Contract.recipientFields.map(row => [...row]);
    PRD_FIELD_GROUPS.recipientPicker = v17Contract.pickerFields.map(row => [...row]);
    Object.entries(v17Contract.pageRules).forEach(([key, value]) => {
      if (!PRD_PAGE_RULES[key]) return;
      PRD_PAGE_RULES[key].goal = value.goal;
      PRD_PAGE_RULES[key].fields = value.fields.map(row => [...row]);
    });
    PRD_OVERLAY_RULES['recipient-picker'] = {
      ...v17Contract.overlayRule,
      fields: v17Contract.overlayRule.fields.map(row => [...row]),
    };
    if (document.documentElement?.dataset) {
      document.documentElement.dataset.recipientScopeV17 = 'ready';
      document.documentElement.dataset.recipientScopeContract = 'v17-dynamic';
    }
    if (rerender && state.portal) renderShell();
  };

  document.addEventListener('DOMContentLoaded', () => applyV17Contract(true));
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      applyV17Contract(false);
      globalThis.RECIPIENT_SELECTOR_V18_API?.hooks?.install?.(false);
    });
  }
  if (document.readyState && document.readyState !== 'loading') applyV17Contract(true);

  if (document.documentElement?.dataset) {
    document.documentElement.dataset.recipientScopeV17 = 'ready';
    document.documentElement.dataset.recipientScopeContract = 'v17-dynamic';
  }
})();

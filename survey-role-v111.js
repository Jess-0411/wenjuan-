/* PC role recipients V1.11. Local prototype assignments use stable directory person IDs. */
(() => {
  'use strict';

  const root = typeof globalThis !== 'undefined' ? globalThis : window;
  const clone = value => JSON.parse(JSON.stringify(value));
  const unique = values => [...new Set((values || []).filter(Boolean))];
  const portalNow = () => typeof state !== 'undefined' ? state.portal : 'school';
  const roleKey = id => `role:scope:${id}`;
  const isRoleItem = item => item?.scopeType === 'role' || item?.category === 'role';
  const roleIdOf = item => item?.roleId || item?.scopeId || item?.id || '';
  const itemsOf = input => input instanceof Map ? [...input.values()] : Array.isArray(input) ? input : [];
  const entriesOf = input => input instanceof Map ? [...input.entries()] : Array.isArray(input)
    ? input.map((item, index) => Array.isArray(item) ? item : [String(index), item]) : [];
  const track = (event, details = {}) => {
    if (typeof recipientTrack === 'function') {
      const summary = roleSummary(state.recipientPickerDraft || state.recipients);
      recipientTrack(event, {category: 'role', role_count: summary.roleCount, unique_person_count: summary.personCount,
        close_method: details.close_method || details.source || '',
        ...(event === 'survey_role_validation_failed' ? {invalid_role_count: selectedRoles(state.recipientPickerDraft || state.recipients).filter(item => roleInvalid(item)).length} : {}), ...details});
    }
  };

  const makeRole = (portal, kind, code, name) => ({
    roleId: `${portal}:${kind}:${code}`, id: `${portal}:${kind}:${code}`, name, kind, portal,
    orgId: portal === 'school' ? 'school-experiment' : 'bureau-office-root',
    status: 'active', canAccess: true,
  });
  const directory = {
    school: [
      makeRole('school', 'system', 'administrator', '管理员'),
      makeRole('school', 'system', 'teacher', '教师'),
      makeRole('school', 'appointment', 'principal', '校长'),
      makeRole('school', 'appointment', 'department-head', '部门负责人'),
      makeRole('school', 'appointment', 'grade-head', '年级负责人'),
      makeRole('school', 'appointment', 'head-teacher', '班主任'),
      makeRole('school', 'appointment', 'subject-teacher', '任课老师'),
      makeRole('school', 'appointment', 'academic-affairs', '教务'),
      makeRole('school', 'appointment', 'dorm-admin', '宿舍管理员'),
    ],
    bureau: [
      makeRole('bureau', 'system', 'administrator', '管理员'),
      makeRole('bureau', 'system', 'staff', '局机关工作人员'),
      makeRole('bureau', 'appointment', 'department-head', '部门负责人'),
      makeRole('bureau', 'appointment', 'researcher', '教研员'),
      makeRole('bureau', 'appointment', 'data-admin', '数据管理员'),
      makeRole('bureau', 'appointment', 'supervisor', '督学'),
    ],
  };
  /* Explicit assignments, never inferred from a position's display text or a fixed count. */
  const memberships = {
    school: {
      'school:system:administrator': ['school-person-chenfang', 'school-person-zhouyan'],
      'school:system:teacher': ['school-person-zhouyan', 'school-person-sunlei', 'school-person-zhangmin', 'school-person-liwei', 'school-person-wangfang', 'school-person-zhangtao'],
      'school:appointment:principal': ['school-person-chenfang'],
      'school:appointment:department-head': ['school-person-chenfang', 'school-person-zhouyan', 'school-person-liwei'],
      'school:appointment:grade-head': ['school-person-liwei', 'school-person-wangfang', 'school-person-zhangtao'],
      'school:appointment:head-teacher': ['school-person-liwei', 'school-person-wangfang', 'school-person-zhangtao'],
      'school:appointment:subject-teacher': ['school-person-zhouyan', 'school-person-sunlei', 'school-person-zhangmin', 'school-person-liwei', 'school-person-wangfang', 'school-person-zhangtao'],
      'school:appointment:academic-affairs': ['school-person-zhouyan', 'school-person-sunlei', 'school-person-zhangmin'],
      'school:appointment:dorm-admin': [],
    },
    bureau: {
      'bureau:system:administrator': ['bureau-person-wangming', 'bureau-person-chenhao'],
      'bureau:system:staff': ['bureau-person-wangming', 'bureau-person-wumin', 'bureau-person-lijing', 'bureau-person-zhoukai', 'bureau-person-chenjie', 'bureau-person-chenhao', 'bureau-person-liuyang'],
      'bureau:appointment:department-head': ['bureau-person-wangming', 'bureau-person-lijing', 'bureau-person-chenhao'],
      'bureau:appointment:researcher': ['bureau-person-zhoukai', 'bureau-person-chenjie'],
      'bureau:appointment:data-admin': ['bureau-person-liuyang'],
      'bureau:appointment:supervisor': [],
    },
  };

  function getDepartments(portal = portalNow()) {
    const groups = typeof DEPARTMENT_PEOPLE === 'undefined' ? [] : DEPARTMENT_PEOPLE[portal] || [];
    return groups.map(group => ({id: group.id, departmentId: group.id, name: group.name,
      departmentName: group.name, parentId: group.parentId || '', isLeaf: Boolean(group.isLeaf)}));
  }

  function getPerson(personId, portal = portalNow()) {
    const groups = typeof DEPARTMENT_PEOPLE === 'undefined' ? [] : DEPARTMENT_PEOPLE[portal] || [];
    const matches = groups.flatMap(group => (group.children || [])
      .filter(person => person.personId === personId).map(person => ({person, group})));
    if (!matches.length) return null;
    const preferred = matches.find(value => value.person.status === 'active' && value.person.canReceive === true) || matches[0];
    const affiliations = matches.filter(value => value.person.status === 'active' && value.person.canReceive === true)
      .map(({person, group}) => ({departmentId: group.id, departmentName: group.name, position: person.position || ''}));
    return {...preferred.person, id: personId, personId, count: 1, identityType: 'staff', portal,
      departments: affiliations, departmentIds: unique(affiliations.map(value => value.departmentId)),
      departmentNames: unique(affiliations.map(value => value.departmentName))};
  }

  function getPersonContext({portal = portalNow(), personId} = {}) {
    const person = getPerson(personId, portal);
    if (!person) return null;
    return {identityType: 'staff', personId, name: person.name,
      departmentIds: [...person.departmentIds], departmentNames: [...person.departmentNames]};
  }

  function roleById(roleId, portal = portalNow()) {
    return (directory[portal] || []).find(role => role.roleId === roleId) || null;
  }

  function definitionValid(role, portal = portalNow()) {
    return Boolean(role && role.portal === portal && role.status === 'active' &&
      role.orgId === (portal === 'school' ? 'school-experiment' : 'bureau-office-root') &&
      role.deleted !== true && role.deleted !== 1 && role.authorized !== false &&
      role.canAccess !== false && role.permissionDenied !== true);
  }

  function roleMembers(roleId, portal = portalNow()) {
    if (!definitionValid(roleById(roleId, portal), portal)) return [];
    return unique(memberships[portal]?.[roleId] || []).map(id => getPerson(id, portal))
      .filter(person => person?.status === 'active' && person?.canReceive === true);
  }

  function roleInvalid(item, portal = portalNow()) {
    return !definitionValid(roleById(roleIdOf(item), portal), portal) ||
      (item?.portal && item.portal !== portal) || (item?.orgId && item.orgId !== roleById(roleIdOf(item), portal)?.orgId) || !roleMembers(roleIdOf(item), portal).length;
  }

  function roleValue(roleId, previous = {}, portal = portalNow()) {
    const role = roleById(roleId, portal);
    const name = role?.name || previous.roleNameSnapshot || previous.nameSnapshot || previous.name || roleId;
    return {...previous, id: roleId, scopeId: roleId, roleId, name, roleNameSnapshot: name,
      roleKind: role?.kind || previous.roleKind || '', orgId: role?.orgId || previous.orgId || '', portal, category: 'role', level: 'scope',
      scopeType: 'role', selectionMode: 'dynamic', count: roleMembers(roleId, portal).length,
      requiresReselection: roleInvalid({...previous, roleId}, portal)};
  }

  function selectedRoles(store = state.recipients) {
    return itemsOf(store).filter(isRoleItem);
  }

  function roleSummary(store = state.recipients) {
    const roles = selectedRoles(store), people = new Set();
    roles.forEach(role => roleMembers(roleIdOf(role)).forEach(person => people.add(person.personId)));
    return {roleCount: unique(roles.map(roleIdOf)).length, personCount: people.size};
  }

  function setRole(roleId, checked, store = state.recipientPickerDraft) {
    if (!(store instanceof Map)) return false;
    if (checked && roleInvalid({roleId})) return false;
    checked ? store.set(roleKey(roleId), roleValue(roleId)) : store.delete(roleKey(roleId));
    track(checked ? 'survey_role_select' : 'survey_role_unselect', {
      role_id: roleId, selection_mode: 'dynamic', resolved_person_count: roleMembers(roleId).length,
      module_selected_count: roleSummary(store).personCount,
    });
    return true;
  }

  function roleModuleMarkup() {
    const roles = selectedRoles(), summary = roleSummary();
    const tags = roles.map(item => {
      const invalid = roleInvalid(item), label = item.name || item.roleNameSnapshot || roleIdOf(item);
      return `<span class="${invalid ? 'needs-reselection' : 'scope-recipient'}"><span class="recipient-scope-name">${esc(label)}${invalid ? '（角色已失效，请重新选择）' : ''}</span><button type="button" data-remove-recipient="${esc(roleKey(roleIdOf(item)))}" aria-label="移除${esc(label)}">×</button></span>`;
    }).join('');
    return `<article class="recipient-overview-module survey-role-module-v111" data-recipient-module="role"><header><div><h3>角色</h3></div><div class="recipient-module-actions"><strong class="recipient-module-count" data-module-count="role">选择角色 ${summary.roleCount} 个，覆盖 ${summary.personCount} 人</strong><button type="button" data-open-recipient-category="role">选择角色</button></div></header><div class="recipient-module-selection">${tags ? `<div class="recipient-module-tags">${tags}</div>` : '<span class="recipient-module-empty">暂未选择</span>'}</div></article>`;
  }

  function pickerMarkup() {
    const keyword = String(state.surveyRoleSearchV111 || '').trim();
    const roles = (directory[state.portal] || []).filter(role => !keyword || role.name.includes(keyword));
    const current = roleById(state.surveyRolePreviewV111) || roles[0] || null;
    if (current) state.surveyRolePreviewV111 = current.roleId;
    const rows = ['system', 'appointment'].map(kind => {
      const filtered = roles.filter(role => role.kind === kind);
      if (!filtered.length) return '';
      return `<section class="survey-role-group-v111"><h4>${kind === 'system' ? '系统角色' : '任职身份'}</h4>${filtered.map(role => {
        const count = roleMembers(role.roleId).length, checked = state.recipientPickerDraft.has(roleKey(role.roleId));
        const invalid = !definitionValid(role) || !count;
        return `<div class="survey-role-row-v111 ${current?.roleId === role.roleId ? 'active' : ''}"><label><input type="checkbox" data-role-toggle="${esc(role.roleId)}" ${checked ? 'checked' : ''} ${invalid && !checked ? 'disabled' : ''}><span>${esc(role.name)}<small>${invalid ? '暂无有效成员' : `${count} 人`}</small></span></label><button type="button" data-role-preview="${esc(role.roleId)}" aria-label="查看${esc(role.name)}成员">查看成员 ›</button></div>`;
      }).join('')}</section>`;
    }).join('');
    const members = current ? roleMembers(current.roleId) : [];
    const selected = current && state.recipientPickerDraft.has(roleKey(current.roleId));
    const selectedTags = selectedRoles(state.recipientPickerDraft).map(role => `<span class="${roleInvalid(role) ? 'invalid' : ''}">${esc(role.name || roleIdOf(role))}<button type="button" data-role-draft-remove="${esc(roleIdOf(role))}" aria-label="取消选择${esc(role.name || '')}">×</button></span>`).join('');
    const preview = current ? `<header><div><h4>${esc(current.name)}</h4><span>${members.length} 名有效成员</span></div><button type="button" class="btn ${selected ? '' : 'primary'}" data-role-select-active="${esc(current.roleId)}" ${!members.length && !selected ? 'disabled' : ''}>${selected ? '取消选择该角色' : '选择该角色全部成员'}</button></header><div class="survey-role-members-v111">${members.length ? members.map(person => `<div class="survey-role-member-v111" data-role-member="${esc(person.personId)}"><span class="survey-role-avatar-v111">${esc(person.name.slice(0, 1))}</span><div><b>${esc(person.name)}</b><small>${esc(person.departmentNames.join('、') || person.departmentName || '—')}${person.position ? ` · ${esc(person.position)}` : ''}</small></div></div>`).join('') : '<div class="empty-state"><b>暂无有效成员</b><span>该角色当前不可新增选择</span></div>'}</div>` : '<div class="empty-state"><b>未找到符合条件的角色</b><span>请调整角色名称</span></div>';
    return `<div class="survey-role-picker-v111"><div class="survey-role-search-v111"><div class="recipient-search-box"><span>⌕</span><input id="survey-role-search-v111" maxlength="50" value="${esc(state.surveyRoleSearchV111 || '')}" placeholder="搜索角色或任职身份名称" aria-label="搜索角色或任职身份名称"></div></div><div class="survey-role-layout-v111"><aside class="survey-role-list-v111">${rows || '<div class="empty-state"><b>未找到符合条件的角色</b></div>'}</aside><section class="survey-role-preview-v111" aria-label="角色成员预览">${preview}</section></div><div class="survey-role-selected-v111"><b>已选角色</b><div>${selectedTags || '<span class="subtle">暂未选择</span>'}</div></div></div>`;
  }

  function renderRoleModal() {
    const modalRoot = $('#modal');
    if (!modalRoot || state.recipientPickerCategory !== 'role' || state.recipientPickerMode !== 'pc' || !state.recipientPickerDraft) return;
    const summary = roleSummary(state.recipientPickerDraft);
    modalRoot.className = 'modal-mask show recipient-picker-mask survey-role-mask-v111';
    modalRoot.innerHTML = `<div class="modal recipient-picker-modal survey-role-modal-v111" data-recipient-picker="role" role="dialog" aria-modal="true" aria-labelledby="survey-role-title-v111"><header class="recipient-picker-head"><div><h3 id="survey-role-title-v111">选择角色</h3><p>${state.portal === 'bureau' ? '选择局机关角色及任职身份' : '选择本校角色及任职身份'}</p></div><div class="recipient-picker-tools"><button type="button" class="recipient-picker-close" data-picker-cancel aria-label="关闭">×</button></div></header><section class="recipient-picker-body">${pickerMarkup()}</section><div class="modal-actions recipient-picker-actions"><span data-picker-module-total>已选择 ${summary.roleCount} 个角色，覆盖 ${summary.personCount} 人</span><div><button type="button" class="btn" data-picker-cancel>取消</button><button type="button" class="btn primary" data-picker-confirm>确定</button></div></div></div>`;
    modalRoot.onclick = event => { if (event.target === modalRoot) discardRecipientPicker('mask'); };
    bindRoleControls(modalRoot);
    if (typeof decorateOverlay === 'function') decorateOverlay($('.survey-role-modal-v111', modalRoot), 'role-picker');
  }

  function bindRoleControls(container) {
    $$('[data-picker-cancel]', container).forEach(button => button.onclick = () => discardRecipientPicker('cancel'));
    $('[data-picker-confirm]', container)?.addEventListener('click', () => commitRecipientPicker());
    $$('[data-role-toggle]', container).forEach(input => input.onchange = () => {
      setRole(input.dataset.roleToggle, input.checked);
      state.surveyRolePreviewV111 = input.dataset.roleToggle;
      renderRoleModal();
    });
    $$('[data-role-preview]', container).forEach(button => button.onclick = () => {
      state.surveyRolePreviewV111 = button.dataset.rolePreview;
      track('survey_role_preview', {role_id: button.dataset.rolePreview});
      renderRoleModal();
    });
    $$('[data-role-draft-remove]', container).forEach(button => button.onclick = () => {
      setRole(button.dataset.roleDraftRemove, false);
      renderRoleModal();
    });
    $('[data-role-select-active]', container)?.addEventListener('click', event => {
      const roleId = event.currentTarget.dataset.roleSelectActive;
      setRole(roleId, !state.recipientPickerDraft.has(roleKey(roleId)));
      renderRoleModal();
    });
    const search = $('#survey-role-search-v111', container);
    if (search) search.oninput = () => {
      const cursor = search.selectionStart;
      state.surveyRoleSearchV111 = search.value.slice(0, 50);
      track('survey_role_search', {search_keyword: state.surveyRoleSearchV111});
      renderRoleModal();
      const next = $('#survey-role-search-v111', $('#modal'));
      next?.focus();
      next?.setSelectionRange(cursor, cursor);
    };
  }

  const wrapped = (name, base, implementation) => {
    if (base?.surveyRoleV111 === name) return base;
    const value = implementation(base);
    Object.defineProperty(value, 'surveyRoleV111', {value: name});
    return value;
  };

  function install(rerender = false) {
    if (typeof state === 'undefined' || typeof recipientResolvedSelection !== 'function') return;

    isDynamicRecipientScope = wrapped('isDynamicRecipientScope', isDynamicRecipientScope, base => item =>
      isRoleItem(item) ? item?.level === 'scope' && item?.selectionMode === 'dynamic' : base(item));
    recipientScopeDefinition = wrapped('recipientScopeDefinition', recipientScopeDefinition, base => (category, id) =>
      category === 'role' ? roleById(id) : base(category, id));
    recipientScopeMembers = wrapped('recipientScopeMembers', recipientScopeMembers, base => (category, id) =>
      category === 'role' ? roleMembers(id) : base(category, id));
    recipientScopeDefinitions = wrapped('recipientScopeDefinitions', recipientScopeDefinitions, base => category =>
      category === 'role' ? directory[state.portal] || [] : base(category));
    recipientScopeIsInvalid = wrapped('recipientScopeIsInvalid', recipientScopeIsInvalid, base => item =>
      isRoleItem(item) ? roleInvalid(item) : base(item));

    normalizeRecipientMap = wrapped('normalizeRecipientMap', normalizeRecipientMap, base => input => {
      const entries = entriesOf(input), nonRoles = entries.filter(([, item]) => !isRoleItem(item));
      const result = base(new Map(nonRoles));
      entries.filter(([, item]) => isRoleItem(item)).forEach(([, item]) => {
        const value = roleValue(roleIdOf(item), clone(item));
        result.set(roleKey(value.roleId), value);
      });
      return result;
    });

    recipientResolvedSelection = wrapped('recipientResolvedSelection', recipientResolvedSelection, base => (input, category = '') => {
      const entries = entriesOf(input), roleEntries = entries.filter(([, item]) => isRoleItem(item));
      const filtered = entries.filter(([, item]) => !isRoleItem(item));
      const source = input instanceof Map ? new Map(filtered) : filtered.map(([, item]) => item);
      const result = base(source, category);
      if (category && category !== 'role') return result;
      const people = new Map(result.people || []), invalidScopes = [...(result.invalidScopes || [])];
      roleEntries.forEach(([, item]) => {
        if (roleInvalid(item)) { invalidScopes.push(item); return; }
        const roleId = roleIdOf(item), role = roleById(roleId);
        roleMembers(roleId).forEach(person => {
          const previous = people.get(person.personId) || {};
          people.set(person.personId, {...person, ...previous, personId: person.personId, id: person.personId,
            sourceCategories: unique([...(previous.sourceCategories || []), ...(previous.category ? [previous.category] : []), 'role']),
            sourceRoleIds: unique([...(previous.sourceRoleIds || []), roleId]),
            roleNames: unique([...(previous.roleNames || []), role.name]),
          });
        });
      });
      /* Preserve every intersecting scope's source without changing its selection semantics. */
      filtered.forEach(([, item]) => {
        const sourceCategory = recipientItemCategory(item);
        const members = isDynamicRecipientScope(item) && !recipientScopeIsInvalid(item)
          ? recipientScopeMembers(item.scopeType || sourceCategory, recipientScopeId(item))
          : (item.personId || item.level === 'person') ? [item] : [];
        members.forEach(person => {
          const personId = person.personId || person.id, previous = people.get(personId);
          if (!previous?.sourceRoleIds?.length) return;
          people.set(personId, {...previous,
            sourceCategories: unique([...(previous.sourceCategories || []), sourceCategory]),
            departmentSourceIds: unique([...(previous.departmentSourceIds || []), ...(sourceCategory === 'department' ?
              (isDynamicRecipientScope(item) ? [recipientScopeId(item)] : item.sourceScopeIds || []) : [])]),
            workgroupSourceIds: unique([...(previous.workgroupSourceIds || []), ...(sourceCategory === 'workgroup' ?
              (isDynamicRecipientScope(item) ? [recipientScopeId(item)] : item.sourceScopeIds || []) : [])]),
          });
        });
      });
      return {...result, people, personIds: new Set(people.keys()), invalidScopes,
        total: people.size + Number(result.rangeTotal || 0)};
    });

    recipientSelectionContract = wrapped('recipientSelectionContract', recipientSelectionContract, base => (store = state.recipients) => {
      const result = base(new Map(entriesOf(store).filter(([, item]) => !isRoleItem(item))));
      const rules = selectedRoles(store).filter(item => !roleInvalid(item)).map(item => ({
        selectionMode: 'dynamic', scopeType: 'role', scopeId: roleIdOf(item), roleId: roleIdOf(item),
        roleKind: roleById(roleIdOf(item))?.kind || item.roleKind, orgId: roleById(roleIdOf(item))?.orgId || item.orgId, portal: state.portal,
        nameSnapshot: roleById(roleIdOf(item))?.name || item.name, roleNameSnapshot: roleById(roleIdOf(item))?.name || item.name,
      }));
      return {...result, recipientRules: [...(result.recipientRules || []), ...rules]};
    });

    selectedRecipientSnapshot = wrapped('selectedRecipientSnapshot', selectedRecipientSnapshot, base => () =>
      [...base().filter(item => !isRoleItem(item)), ...selectedRoles().filter(item => !roleInvalid(item))
        .map(item => roleValue(roleIdOf(item), clone(item)))]);

    surveyRecipientItems = wrapped('surveyRecipientItems', surveyRecipientItems, base => survey => {
      const values = base(survey).map(item => isRoleItem(item) ? roleValue(roleIdOf(item), item) : item);
      (survey?.recipientRules || []).filter(isRoleItem).forEach(rule => {
        const roleId = roleIdOf(rule);
        if (!values.some(item => isRoleItem(item) && roleIdOf(item) === roleId)) values.push(roleValue(roleId, rule));
      });
      return values;
    });

    draftRecipientSnapshot = wrapped('draftRecipientSnapshot', draftRecipientSnapshot, base => survey =>
      base(survey).map(item => isRoleItem(item) ? roleValue(roleIdOf(item), item) : item));
    draftPayload = wrapped('draftPayload', draftPayload, base => existing => {
      const value = base(existing);
      return {...value, recipientRoleSchemaVersion: 1,
        recipientSelections: [...normalizeRecipientMap(state.recipients).entries()].map(([key, item]) => [key, clone(item)]),
        recipientSnapshot: selectedRecipientSnapshot(), ...recipientSelectionContract()};
    });
    loadEditableSurveyState = wrapped('loadEditableSurveyState', loadEditableSurveyState, base => survey => {
      base(survey);
      const stored = Array.isArray(survey?.recipientSelections) && survey.recipientSelections.length
        ? entriesOf(survey.recipientSelections).map(([, item]) => item)
        : Array.isArray(survey?.recipientSnapshot) && survey.recipientSnapshot.length
          ? survey.recipientSnapshot : surveyRecipientItems(survey);
      const result = new Map(entriesOf(state.recipients).filter(([, item]) => !isRoleItem(item)));
      stored.filter(isRoleItem).forEach(item => result.set(roleKey(roleIdOf(item)), roleValue(roleIdOf(item), clone(item))));
      state.recipients = normalizeRecipientMap(result);
      refreshRecipientContractState();
    });

    recipientDisplayItems = wrapped('recipientDisplayItems', recipientDisplayItems, base => (store = state.recipients) => {
      const values = base(store).filter(item => !isRoleItem(item));
      return [...values, ...selectedRoles(store).filter(item => !roleInvalid(item))];
    });
    recipientSelectionError = wrapped('recipientSelectionError', recipientSelectionError, base => () => {
      const invalid = selectedRoles().find(item => roleInvalid(item));
      if (invalid) {
        track('survey_role_validation_failed', {role_id: roleIdOf(invalid), reason: 'invalid_or_empty_role'});
        return '已选角色已失效或无有效成员，请重新选择';
      }
      return base();
    });

    setDraftDynamicScope = wrapped('setDraftDynamicScope', setDraftDynamicScope, base => (category, id, checked) =>
      category === 'role' ? setRole(id, checked) : base(category, id, checked));
    beginRecipientPicker = wrapped('beginRecipientPicker', beginRecipientPicker, base => (category, mode) => {
      if (category !== 'role') return base(category, mode);
      if (mode !== 'pc' || state.preview === 'mobile') return;
      clearRecipientPickerState();
      state.recipientPickerDraft = new Map(selectedRoles().map(item => [roleKey(roleIdOf(item)), roleValue(roleIdOf(item), clone(item))]));
      state.recipientPickerCategory = 'role';
      state.recipientPickerMode = 'pc';
      state.surveyRoleSearchV111 = '';
      state.surveyRolePreviewV111 = selectedRoles(state.recipientPickerDraft)[0]?.roleId || directory[state.portal]?.[0]?.roleId || '';
      track('survey_role_picker_open', {source: 'pc', module_selected_count: roleSummary(state.recipientPickerDraft).personCount});
    });
    commitRecipientPicker = wrapped('commitRecipientPicker', commitRecipientPicker, base => () => {
      if (state.recipientPickerCategory === 'role') {
        const invalid = selectedRoles(state.recipientPickerDraft).find(item => roleInvalid(item));
        if (invalid) {
          track('survey_role_validation_failed', {role_id: roleIdOf(invalid), reason: 'invalid_or_empty_role'});
          toast('已选角色已失效或无有效成员，请重新选择');
          return false;
        }
        track('survey_role_picker_confirm', {role_count: roleSummary(state.recipientPickerDraft).roleCount});
      }
      return base();
    });
    discardRecipientPicker = wrapped('discardRecipientPicker', discardRecipientPicker, base => (source = 'cancel', rerender = true) => {
      if (state.recipientPickerCategory === 'role') track('survey_role_picker_cancel', {source});
      return base(source, rerender);
    });
    renderPcRecipientPickerModal = wrapped('renderPcRecipientPickerModal', renderPcRecipientPickerModal, base => () =>
      state.recipientPickerCategory === 'role' ? renderRoleModal() : base());
    objectStep = wrapped('objectStep', objectStep, base => () => {
      const html = base();
      if (state.preview === 'mobile' || html.includes('data-recipient-module="role"')) return html;
      return html.replace('</div><div class="footer-actions pc-recipient-actions">', `${roleModuleMarkup()}</div><div class="footer-actions pc-recipient-actions">`);
    });
    if (document.documentElement?.dataset) document.documentElement.dataset.surveyRoleV111 = 'ready';
    if (rerender && state.portal && typeof renderShell === 'function') renderShell();
  }

  const api = {
    version: '1.11', directory, memberships, roleById, roleMembers, roleValue, roleInvalid,
    getPerson, getDepartments, getPersonContext, roleSummary, roleKey, isRoleItem,
    setRole, install, markup: {module: roleModuleMarkup, picker: pickerMarkup},
    resolve(input, category = '') { return recipientResolvedSelection(input, category); },
  };
  root.SurveyRoleV111 = api;
  if (typeof window !== 'undefined') window.SurveyRoleV111 = api;
  install(false);
  document.addEventListener('DOMContentLoaded', () => install(true));
  if (typeof window !== 'undefined') window.addEventListener('load', () => install(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && state.recipientPickerCategory === 'role' && state.recipientPickerMode === 'pc') {
      discardRecipientPicker('escape');
    }
  });
})();

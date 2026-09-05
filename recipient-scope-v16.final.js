/* Recipient scope V1.6 stable final override.
 * Load after app.js and any person-only recipient picker override.
 */
(() => {
  'use strict';

  const RANGE_CATEGORIES = new Set(['department', 'workgroup']);
  const unique = values => [...new Set((values || []).filter(Boolean))];
  const manualKey = (category, scopeId) => `${category}:${scopeId}`;
  const personIdOf = person => person?.personId || person?.id || '';
  const pickerBodyFallback = recipientPickerBody;
  const bindPickerFallback = bindRecipientPickerControls;
  const bindOverviewFallback = bindRecipientOverviewV2;
  const scopeMembersFallback = recipientScopeMembers;
  const surveyItemsFallback = surveyRecipientItems;

  state.recipientManualPartialScopes = state.recipientManualPartialScopes instanceof Set
    ? state.recipientManualPartialScopes
    : new Set();
  state.recipientPickerManualPartialScopes = state.recipientPickerManualPartialScopes instanceof Set
    ? state.recipientPickerManualPartialScopes
    : null;

  recipientScopeMembers = function (category, scopeId) {
    return scopeMembersFallback(category, scopeId)
      .filter(person => person?.status === 'active' && person?.canReceive === true);
  };

  recipientDeepClone = function (item = {}) {
    return {
      ...item,
      sourceCategories: [...(item.sourceCategories || [])],
      sourceScopeIds: [...(item.sourceScopeIds || [])],
      sourceDepartmentIds: [...(item.sourceDepartmentIds || [])],
      departmentSourceIds: [...(item.departmentSourceIds || [])],
      workgroupSourceIds: [...(item.workgroupSourceIds || [])],
      explicitCategories: [...(item.explicitCategories || [])],
      workgroupIds: [...(item.workgroupIds || [])],
      workgroupNames: [...(item.workgroupNames || [])],
      departments: (item.departments || []).map(value => ({...value})),
      excludedChildIds: [...(item.excludedChildIds || [])]
    };
  };

  isDynamicRecipientScope = function (item) {
    const category = item?.scopeType || recipientItemCategory(item || {});
    return Boolean(
      item &&
      RANGE_CATEGORIES.has(category) &&
      item.level === 'scope' &&
      ['dynamic', 'dynamic_department'].includes(item.selectionMode)
    );
  };

  recipientScopeObject = function (category, scopeId) {
    const definition = recipientScopeDefinition(category, scopeId);
    const members = recipientScopeMembers(category, scopeId);
    const scopeName = definition?.name || scopeId;
    const value = {
      id: scopeId,
      scopeId,
      scopeName,
      name: scopeName,
      category,
      level: 'scope',
      scopeType: category,
      selectionMode: 'dynamic',
      count: members.length
    };
    if (category === 'department') {
      Object.assign(value, {departmentId: scopeId, departmentNameSnapshot: scopeName});
    } else {
      Object.assign(value, {workgroupId: scopeId, workgroupNameSnapshot: scopeName});
    }
    return value;
  };

  recipientScopeIsInvalid = function (item) {
    if (!isDynamicRecipientScope(item)) return false;
    const category = item.scopeType || recipientItemCategory(item);
    const scopeId = recipientScopeId(item);
    const definition = recipientScopeDefinition(category, scopeId);
    const inaccessible = definition && (
      definition.deleted === true ||
      definition.deleted === 1 ||
      definition.status === 'deleted' ||
      definition.authorized === false ||
      definition.canAccess === false ||
      definition.permissionDenied === true
    );
    return !definition || inaccessible || (category === 'department' && !definition.isLeaf) || !recipientScopeMembers(category, scopeId).length;
  };

  normalizeRecipientMap = function (input) {
    const result = new Map();
    for (const [storedKey, rawValue] of input || []) {
      const base = recipientDeepClone(rawValue || {});
      const category = base.scopeType || recipientItemCategory(base);
      const identity = base.scopeId || base.departmentId || base.workgroupId || base.personId || base.schoolId || base.id || String(storedKey).split(':').pop();

      if (isDynamicRecipientScope(base)) {
        const definition = recipientScopeDefinition(category, identity);
        const name = definition?.name || base.scopeName || base.departmentNameSnapshot || base.workgroupNameSnapshot || base.name || identity;
        const value = {...base, ...recipientScopeObject(category, identity), name, scopeName: name};
        value.requiresReselection = recipientScopeIsInvalid(value);
        result.set(recipientScopeSelectionKey(category, identity), value);
        continue;
      }

      const isPerson = base.level === 'person' || Boolean(base.personId);
      const categories = isPerson && base.sourceCategories?.length
        ? unique(base.sourceCategories)
        : [recipientItemCategory(base)];

      categories.forEach(rawCategory => {
        const itemCategory = rawCategory === 'legacy' ? 'department' : rawCategory;
        const value = recipientDeepClone(base);
        const itemId = value.personId || value.schoolId || value.id || String(storedKey).split(':').pop();
        value.id = itemId;
        value.category = itemCategory;

        if (isPerson) {
          value.level = 'person';
          value.personId = itemId;
          value.count = 1;
          const categorySources = itemCategory === 'department'
            ? (value.departmentSourceIds?.length
              ? value.departmentSourceIds
              : (value.departments || []).map(entry => entry.departmentId))
            : itemCategory === 'workgroup'
              ? (value.workgroupSourceIds?.length ? value.workgroupSourceIds : value.workgroupIds)
              : [];
          const sources = unique(categorySources?.length ? categorySources : value.sourceScopeIds);
          if (!sources.length && itemCategory === 'department' && value.departmentId) sources.push(value.departmentId);
          value.sourceScopeIds = unique(sources);
          const explicitForCategory = value.explicitCategories?.length
            ? value.explicitCategories.includes(itemCategory)
            : value.explicitSelection;
          value.explicitSelection = Boolean(explicitForCategory || !value.sourceScopeIds.length);
        }

        if (state.portal === 'bureau' && itemCategory === 'school') {
          const school = RECIPIENT_DATA.bureau.school.find(entry => entry.id === (value.schoolId || itemId));
          if (school && !recipientLegacySchoolRole(value, itemId)) {
            Object.assign(value, {
              id: school.id,
              schoolId: school.id,
              name: school.name,
              type: school.type,
              count: school.staffCount,
              staffCount: school.staffCount,
              level: 'school',
              selectionMode: 'all_staff'
            });
          } else if (school || recipientLegacySchoolRole(value, itemId)) {
            Object.assign(value, {
              requiresReselection: true,
              count: 0,
              legacyName: value.name || school?.name || '历史学校角色范围'
            });
          }
        }

        const key = recipientSelectionKey(itemCategory, value.personId || value.schoolId || value.id);
        const existing = result.get(key);
        if (existing && isPerson) {
          value.sourceScopeIds = unique([...(existing.sourceScopeIds || []), ...(value.sourceScopeIds || [])]);
          value.explicitSelection = Boolean(existing.explicitSelection || value.explicitSelection);
          value.workgroupIds = unique([...(existing.workgroupIds || []), ...(value.workgroupIds || [])]);
        }
        result.set(key, existing && isPerson ? {...existing, ...value} : value);
      });
    }
    return result;
  };

  recipientResolvedSelection = function (input, category = '') {
    const items = input instanceof Map ? [...input.values()] : Array.isArray(input) ? input : [];
    const people = new Map();
    const invalidScopes = [];
    let rangeTotal = 0;

    items.forEach(item => {
      const itemCategory = recipientItemCategory(item);
      if (category && itemCategory !== category) return;
      if (item.requiresReselection && !isDynamicRecipientScope(item)) {
        invalidScopes.push(item);
        return;
      }
      if (isDynamicRecipientScope(item)) {
        const scopeType = item.scopeType || itemCategory;
        const scopeId = recipientScopeId(item);
        if (recipientScopeIsInvalid(item)) {
          invalidScopes.push(item);
          return;
        }
        recipientScopeMembers(scopeType, scopeId).forEach(person => {
          const personId = personIdOf(person);
          if (personId) people.set(personId, {...person, id: personId, personId});
        });
        return;
      }
      if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        if (!personId) return;
        const frozen = item.frozen === true || item.selectionMode === 'snapshot';
        const current = !frozen && RANGE_CATEGORIES.has(itemCategory) ? recipientDirectoryPerson(personId) : null;
        if (!frozen && RANGE_CATEGORIES.has(itemCategory) && !current) return;
        people.set(personId, {...item, ...(current || {}), id: personId, personId});
        return;
      }
      rangeTotal += Number(item.staffCount ?? item.count ?? 0);
    });

    return {people, personIds: new Set(people.keys()), rangeTotal, total: people.size + rangeTotal, invalidScopes};
  };

  recipientSelectionContract = function (store = state.recipients) {
    const recipientRules = [];
    const explicitPersonIds = [];
    for (const item of store?.values?.() || []) {
      if (isDynamicRecipientScope(item) && !recipientScopeIsInvalid(item)) {
        const scopeType = item.scopeType || recipientItemCategory(item);
        const scopeId = recipientScopeId(item);
        const name = recipientScopeDefinition(scopeType, scopeId)?.name || item.scopeName || item.name || scopeId;
        const rule = {selectionMode: 'dynamic', scopeType, scopeId, nameSnapshot: name};
        if (scopeType === 'department') Object.assign(rule, {departmentId: scopeId, departmentNameSnapshot: name});
        else Object.assign(rule, {workgroupId: scopeId, workgroupNameSnapshot: name});
        recipientRules.push(rule);
      } else if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        if (personId && !explicitPersonIds.includes(personId)) explicitPersonIds.push(personId);
      }
    }
    return {recipientRules, explicitPersonIds};
  };

  normalizeCompleteRecipientScopes = function () {
    const store = state.recipientPickerDraft;
    if (!(store instanceof Map)) return store;
    const category = state.recipientPickerCategory;
    const categories = RANGE_CATEGORIES.has(category) ? [category] : [...RANGE_CATEGORIES];
    const manual = state.recipientPickerManualPartialScopes || new Set();

    categories.forEach(scopeCategory => {
      recipientScopeDefinitions(scopeCategory).forEach(definition => {
        const scopeId = definition.id || definition.scopeId;
        const members = recipientScopeMembers(scopeCategory, scopeId);
        if (!members.length) return;
        const key = recipientScopeSelectionKey(scopeCategory, scopeId);
        const splitKey = manualKey(scopeCategory, scopeId);
        if (store.has(key)) {
          manual.delete(splitKey);
          members.forEach(person => removeDraftPersonSource(scopeCategory, personIdOf(person), scopeId));
          return;
        }
        const ownSourceComplete = members.every(person => recipientPersonSelectedInScope(scopeCategory, personIdOf(person), scopeId, store));
        const coveredIds = recipientResolvedSelection(store, scopeCategory).personIds;
        const globallyCovered = members.every(person => coveredIds.has(personIdOf(person)));
        const complete = manual.has(splitKey) ? ownSourceComplete : globallyCovered;
        if (!complete) return;
        store.set(key, recipientScopeObject(scopeCategory, scopeId));
        manual.delete(splitKey);
        members.forEach(person => removeDraftPersonSource(scopeCategory, personIdOf(person), scopeId));
      });
    });
    state.recipientPickerManualPartialScopes = manual;
    return store;
  };

  setDraftDynamicScope = function (category, scopeId, checked) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const definition = recipientScopeDefinition(category, scopeId);
    const members = recipientScopeMembers(category, scopeId);
    if (!definition || (category === 'department' && !definition.isLeaf) || !members.length) return;
    const key = recipientScopeSelectionKey(category, scopeId);
    const splitKey = manualKey(category, scopeId);
    if (checked) {
      state.recipientPickerManualPartialScopes?.delete(splitKey);
      state.recipientPickerDraft.set(key, recipientScopeObject(category, scopeId));
      members.forEach(person => removeDraftPersonSource(category, personIdOf(person), scopeId));
      normalizeCompleteRecipientScopes();
    } else {
      state.recipientPickerDraft.delete(key);
      state.recipientPickerManualPartialScopes?.add(splitKey);
      members.forEach(person => removeDraftPersonSource(category, personIdOf(person), scopeId));
    }
    recipientTrack(checked ? 'recipient_scope_select' : 'recipient_scope_unselect', {
      category,
      scope_type: category,
      scope_id: scopeId,
      selection_mode: checked ? 'dynamic' : 'none',
      resolved_person_count: members.length,
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft)
    });
  };

  convertDraftScopeToPeople = function (category, scopeId, excludedPersonId) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const members = recipientScopeMembers(category, scopeId);
    state.recipientPickerDraft.delete(recipientScopeSelectionKey(category, scopeId));
    state.recipientPickerManualPartialScopes?.add(manualKey(category, scopeId));
    members.forEach(person => {
      const personId = personIdOf(person);
      if (personId === excludedPersonId) removeDraftPersonSource(category, personId, scopeId);
      else mergeDraftPersonSource(category, person, scopeId);
    });
    recipientTrack('recipient_scope_convert_to_people', {
      category,
      scope_type: category,
      scope_id: scopeId,
      person_id: excludedPersonId,
      selection_mode: 'explicit_people',
      resolved_person_count: members.length,
      converted_person_count: Math.max(0, members.length - 1),
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft)
    });
  };

  removeDraftPersonEverywhere = function (category, personId) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const scopes = [...state.recipientPickerDraft.values()].filter(item =>
      isDynamicRecipientScope(item) &&
      recipientItemCategory(item) === category &&
      recipientScopeMembers(category, recipientScopeId(item)).some(person => personIdOf(person) === personId)
    );
    scopes.forEach(scope => convertDraftScopeToPeople(category, recipientScopeId(scope), personId));
    state.recipientPickerDraft.delete(recipientSelectionKey(category, personId));
  };

  setDraftPerson = function (category, person, checked, scopeId = '') {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const personId = personIdOf(person);
    const splitKey = scopeId ? manualKey(category, scopeId) : '';
    if (checked) {
      mergeDraftPersonSource(category, {...person, personId}, scopeId);
    } else if (scopeId && recipientDraftScopeHas(category, scopeId)) {
      convertDraftScopeToPeople(category, scopeId, personId);
    } else if (scopeId) {
      removeDraftPersonSource(category, personId, scopeId);
      state.recipientPickerManualPartialScopes?.add(splitKey);
    } else {
      state.recipientPickerDraft.delete(recipientSelectionKey(category, personId));
    }
    normalizeCompleteRecipientScopes();
    recipientTrack(checked ? 'recipient_person_select' : 'recipient_person_unselect', {
      category,
      person_id: personId,
      department_id: category === 'department' ? scopeId : '',
      workgroup_id: category === 'workgroup' ? scopeId : '',
      selection_mode: 'explicit_people',
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft)
    });
  };

  beginRecipientPicker = function (category, mode) {
    if (!recipientOverviewTabs().some(tab => tab[0] === category)) return;
    const entries = recipientItemsForCategory(category)
      .filter(item => !(category === 'school' && item.requiresReselection))
      .map(item => [item._selectionKey, recipientDeepClone(item)]);
    state.recipientPickerDraft = new Map(entries);
    state.recipientPickerManualPartialScopes = new Set(
      [...state.recipientManualPartialScopes].filter(key => key.startsWith(`${category}:`))
    );
    state.recipientPickerCategory = category;
    state.recipientPickerMode = mode;
    state.recipientPickerSearch = '';
    state.recipientPickerGroupSearch = '';
    state.recipientPickerPersonSearch = '';
    state.recipientPickerSchoolType = '';
    state.recipientTab = category;
    if (category === 'workgroup' && !recipientWorkgroupLeaf(state.recipientWorkgroupId)) {
      state.recipientWorkgroupId = recipientAllWorkgroupLeaves()[0]?.id || '';
    }
    recipientTrack('recipient_picker_open', {
      category,
      source: mode,
      module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft)
    });
  };

  commitRecipientPicker = function () {
    const category = state.recipientPickerCategory;
    const mode = state.recipientPickerMode;
    const draft = state.recipientPickerDraft;
    if (!(draft instanceof Map)) return;
    normalizeCompleteRecipientScopes();
    [...state.recipients.entries()].forEach(([key, item]) => {
      if (recipientItemCategory(item) === category) state.recipients.delete(key);
    });
    draft.forEach((item, key) => state.recipients.set(key, recipientDeepClone(item)));
    [...state.recipientManualPartialScopes]
      .filter(key => key.startsWith(`${category}:`))
      .forEach(key => state.recipientManualPartialScopes.delete(key));
    (state.recipientPickerManualPartialScopes || new Set()).forEach(key => state.recipientManualPartialScopes.add(key));
    const count = recipientCategoryCount(category);
    refreshRecipientContractState();
    recipientTrack('recipient_picker_confirm', {category, source: mode, module_selected_count: count});
    clearRecipientPickerState();
    if (mode === 'mobile') {
      state.page = 'mobile/recipients';
      location.replace('#mobile/recipients');
    } else {
      renderShell();
    }
  };

  recipientDisplayItemsForCategory = function (category, store = state.recipients) {
    const items = recipientItemsForCategory(category, store);
    const scopes = items.filter(item => isDynamicRecipientScope(item) && !recipientScopeIsInvalid(item));
    const manual = store === state.recipientPickerDraft
      ? (state.recipientPickerManualPartialScopes || new Set())
      : state.recipientManualPartialScopes;
    return items.filter(item => {
      if (!(item.level === 'person' || item.personId)) return true;
      if ((item.sourceScopeIds || []).some(scopeId => manual.has(manualKey(category, scopeId)))) return true;
      return !scopes.some(scope => recipientScopeMembers(scope.scopeType || category, recipientScopeId(scope))
        .some(person => personIdOf(person) === personIdOf(item)));
    });
  };

  recipientModuleMarkupV2 = function ([category, label]) {
    const items = recipientDisplayItemsForCategory(category);
    const count = recipientCategoryCount(category);
    const tags = items.map(item => {
      const invalid = item.requiresReselection || recipientScopeIsInvalid(item);
      const scope = isDynamicRecipientScope(item);
      const text = invalid ? `${item.name}（范围已失效，请重新选择）` : item.name;
      return `<span class="${invalid ? 'needs-reselection' : ''} ${scope ? 'scope-recipient' : ''}"><span class="recipient-scope-name">${esc(text)}</span><button type="button" data-remove-recipient="${esc(item._selectionKey)}" aria-label="移除${esc(item.name)}">×</button></span>`;
    }).join('');
    return `<article class="recipient-overview-module" data-recipient-module="${category}"><header><div><h3>${esc(label)}</h3></div><div class="recipient-module-actions"><strong class="recipient-module-count" data-module-count="${category}">已选择 ${count} 人</strong><button type="button" data-open-recipient-category="${category}">添加人员</button></div></header><div class="recipient-module-selection">${tags ? `<div class="recipient-module-tags">${tags}</div>` : '<span class="recipient-module-empty">暂未选择</span>'}</div></article>`;
  };

  const otherScopeBadge = value => value.coveredByOther
    ? '<em class="recipient-other-scope">已由其他范围选中</em>'
    : '';

  departmentPickerMarkup = function (mobile = false) {
    const groups = departmentFilteredGroups();
    const keyword = state.recipientPickerSearch.trim();
    const people = departmentFilteredPeople();
    const selected = people.filter(person => recipientPersonSelectedInScope('department', personIdOf(person), person.departmentId, state.recipientPickerDraft)).length;
    const allSelected = Boolean(people.length) && selected === people.length;
    const rows = groups.map(group => {
      const open = keyword ? true : recipientExpanded(group.id, group.isLeaf ? !mobile : true);
      const scopeState = recipientScopeState('department', group.id, state.recipientPickerDraft);
      const members = group.allPeople;
      const selectable = group.isLeaf && members.length > 0;
      const hasChildren = (DEPARTMENT_PEOPLE[state.portal] || []).some(child => child.parentId === group.id);
      const children = group.people.length
        ? group.people.map(person => {
            const value = recipientPersonPickerState('department', person.personId, group.id, state.recipientPickerDraft);
            return `<label class="${mobile ? 'mobile-recipient-child' : 'recipient-row'} department-person-row" data-picker-person-row="${person.personId}"><input type="checkbox" data-picker-person="${person.personId}" data-picker-person-scope="${group.id}" ${value.checked ? 'checked' : ''}><span>${esc(person.name)}</span>${otherScopeBadge(value)}</label>`;
          }).join('')
        : '<div class="recipient-department-empty">该部门暂无可选人员</div>';
      const selector = group.isLeaf
        ? `<label class="recipient-department-scope ${selectable ? '' : 'is-disabled'}"><input type="checkbox" data-picker-dynamic-scope="department" data-picker-scope-id="${group.id}" ${scopeState.checked ? 'checked' : ''} ${selectable ? '' : 'disabled'}><span><b>${esc(group.name)}</b><small>${members.length ? `${members.length} 名可选人员` : '暂无可选人员'}</small></span></label>`
        : `<div class="recipient-department-label"><b>${esc(group.name)}</b><small>下级部门</small></div>`;
      const toggle = hasChildren || group.isLeaf
        ? `<button type="button" class="${mobile ? '' : 'recipient-expander'}" data-picker-toggle-department="${group.id}" aria-label="${open ? '收起' : '展开'}${esc(group.name)}">${mobile ? `${open ? '收起' : '下级'}　›` : (open ? '⌄' : '›')}</button>`
        : '';
      return `<article class="${mobile ? 'mobile-recipient-group' : 'recipient-group department-group'} ${open ? 'open expanded' : ''} ${group.isLeaf ? 'is-leaf' : 'is-branch'}" style="--department-depth:${group.depth}" data-picker-department="${group.id}"><div class="${mobile ? 'mobile-recipient-row' : 'recipient-parent-row'} department-group-row">${toggle}${selector}</div>${group.isLeaf ? `<div class="${mobile ? 'mobile-recipient-children ' : ''}recipient-children ${open ? 'show' : ''}">${children}</div>` : ''}</article>`;
    }).join('');
    return `<div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" type="text" maxlength="50" value="${esc(state.recipientPickerSearch)}" placeholder="${mobile ? '请输入姓名或部门' : '搜索姓名或部门'}"></div></div>${mobile ? `<label class="mobile-recipient-select-all"><input type="checkbox" data-picker-department-all ${allSelected ? 'checked' : ''} ${people.length ? '' : 'disabled'}><span>全选当前结果</span></label>` : '<div class="recipient-table-head person-head name-only"><span>部门及人员</span></div>'}<div class="${mobile ? 'mobile-recipient-list' : 'recipient-tree pc-recipient-tree'}">${rows || '<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整姓名或部门关键词</span></div>'}</div>`;
  };

  workgroupTreeMarkup = function (mobile = false) {
    const keyword = state.recipientPickerGroupSearch.trim();
    const renderLeaf = (leaf, depth = 0, force = false) => {
      if (keyword && !force && !leaf.name.includes(keyword)) return '';
      const active = leaf.id === state.recipientWorkgroupId;
      const members = recipientWorkgroupMembers(leaf.id);
      const scopeState = recipientScopeState('workgroup', leaf.id, state.recipientPickerDraft);
      const rowClass = mobile ? 'mobile-workgroup-leaf-row' : 'recipient-workgroup-leaf-row';
      return `<div class="${rowClass} ${active ? 'active' : ''}" style="--tree-depth:${depth}"><label class="recipient-workgroup-scope ${members.length ? '' : 'is-disabled'}" title="选择整个${esc(leaf.name)}"><input type="checkbox" data-picker-dynamic-scope="workgroup" data-picker-scope-id="${leaf.id}" ${scopeState.checked ? 'checked' : ''} ${members.length ? '' : 'disabled'}><span class="sr-only">选择整个${esc(leaf.name)}</span></label><button type="button" class="${mobile ? 'mobile-workgroup-node' : 'recipient-workgroup-node'}" data-workgroup-node="${leaf.id}"><span>${esc(leaf.name)}</span><em>${members.length} 人　›</em></button></div>`;
    };
    const nodes = RECIPIENT_WORKGROUP_TREE_V2.map(node => {
      if (node.children?.length) {
        const parentMatch = node.name.includes(keyword);
        const children = node.children.map(child => renderLeaf(child, 1, parentMatch)).join('');
        if (keyword && !parentMatch && !children) return '';
        const open = keyword ? true : recipientExpanded(node.id, true);
        return `<section class="recipient-workgroup-branch ${open ? 'open' : ''}"><button type="button" class="recipient-workgroup-parent" data-workgroup-parent-toggle="${node.id}"><span>${open ? '⌄' : '›'}　${esc(node.name)}</span></button><div class="recipient-workgroup-children ${open ? 'show' : ''}">${children}</div></section>`;
      }
      return renderLeaf(node, 0);
    }).join('');
    return nodes || '<div class="recipient-filter-empty"><b>未找到符合条件的工作组</b><span>请调整工作组名称</span></div>';
  };

  workgroupMemberMarkup = function (mobile = false) {
    const group = recipientWorkgroupLeaf(state.recipientWorkgroupId);
    const allMembers = recipientWorkgroupMembers(group?.id);
    const keyword = state.recipientPickerPersonSearch.trim();
    const visibleMembers = allMembers.filter(person => !keyword || person.name.includes(keyword));
    const scopeState = recipientScopeState('workgroup', group?.id || '', state.recipientPickerDraft);
    const rows = visibleMembers.map(person => {
      const value = recipientPersonPickerState('workgroup', person.personId, group?.id || '', state.recipientPickerDraft);
      return `<label class="${mobile ? 'mobile-recipient-child' : 'recipient-workgroup-person'}" data-workgroup-person-row="${person.personId}"><input type="checkbox" data-picker-workgroup-person="${person.personId}" data-picker-person-scope="${group?.id || ''}" ${value.checked ? 'checked' : ''}><span>${esc(person.name)}</span>${otherScopeBadge(value)}</label>`;
    }).join('');
    return `<div class="recipient-workgroup-panel-head"><div><h4>${esc(group?.name || '工作组')}</h4><span>${allMembers.length} 名可选人员</span></div></div><div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-person-search" type="text" maxlength="50" value="${esc(state.recipientPickerPersonSearch)}" placeholder="搜索人员姓名"></div></div><label class="${mobile ? 'mobile-recipient-select-all' : 'recipient-workgroup-select-all'}"><input type="checkbox" data-workgroup-select-all ${scopeState.checked ? 'checked' : ''} ${allMembers.length ? '' : 'disabled'}><span>全选本组</span></label><div class="${mobile ? 'mobile-recipient-list' : 'recipient-workgroup-person-list'}">${rows || (allMembers.length ? '<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整人员姓名</span></div>' : '<div class="recipient-filter-empty"><b>该工作组暂无可选人员</b><span>请选择其他工作组</span></div>')}</div>`;
  };

  recipientPickerBody = function (category, mobile = false) {
    if (category === 'department') return departmentPickerMarkup(mobile);
    if (category === 'workgroup') return mobile ? workgroupTreeMarkup(true) : workgroupPickerMarkup();
    return pickerBodyFallback(category, mobile);
  };

  recipientTabMeta = function () {
    return state.portal === 'bureau'
      ? {
          department: ['内部部门', '可选择整个部门，也可展开后选择具体人员'],
          workgroup: ['工作组', '可选择整个工作组，也可进入成员列表选择具体人员'],
          school: ['学校', '直接选择具体学校，默认覆盖该校全部有效教职工']
        }
      : {
          department: ['内部部门', '可选择整个部门，也可展开后选择具体人员'],
          parent: ['家长', '按年级或班级选择学生家长'],
          class: ['班级', '按年级选择全部或部分班级']
        };
  };

  mobileRecipientsPage = function () {
    const parts = state.page.split('/');
    const category = parts[2];
    if (category) {
      ensureMobileRecipientPicker(category);
      if (category === 'workgroup') return parts[3] ? mobileWorkgroupPeoplePage(parts[3]) : mobileWorkgroupTreePage();
      return mobileCategoryPickerPage(category);
    }
    clearRecipientPickerState();
    const rule = state.portal === 'school'
      ? '三个模块均为非必填，但至少选择一项。'
      : '可组合选择内部部门、工作组和学校。';
    return `${statsMobileHead('选择成员', state.recipientReturnPage || '#mobile/create')}<section class="mobile-recipient-page mobile-recipient-overview"><div class="recipient-overview-intro"><b>接收对象</b><span>${rule}</span></div>${recipientOverviewMarkupV2()}</section><footer class="mobile-recipient-footer overview-only"><a href="#mobile/settings" data-mobile-recipient-overview-next>确认</a></footer>`;
  };

  bindRecipientPickerControls = function (root = $('#view')) {
    bindPickerFallback(root);
    const workgroupAll = $('[data-workgroup-select-all]', root);
    if (workgroupAll) {
      const scopeId = state.recipientWorkgroupId;
      const scopeState = recipientScopeState('workgroup', scopeId, state.recipientPickerDraft);
      workgroupAll.checked = scopeState.checked;
      workgroupAll.indeterminate = false;
      workgroupAll.setAttribute('aria-checked', String(scopeState.checked));
      workgroupAll.onchange = () => {
        if (workgroupAll.checked) {
          setDraftDynamicScope('workgroup', scopeId, true);
        } else if (scopeState.checked) {
          setDraftDynamicScope('workgroup', scopeId, false);
        } else {
          recipientScopeMembers('workgroup', scopeId).forEach(person => setDraftPerson('workgroup', person, false, scopeId));
        }
        rerenderRecipientPicker();
      };
    }
  };

  selectedRecipientSnapshot = function () {
    const snapshotAt = formatSystemTime();
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
        sourceScopeIds: new Set(),
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
        recipientScopeMembers(category, scopeId).forEach(person => {
          const record = ensurePerson(person, category);
          if (!record) return;
          record.sourceScopeIds.add(scopeId);
          recipientPersonAffiliations(record.personId).forEach(affiliation => {
            record.departments.set(affiliation.departmentId, {...affiliation});
            if (affiliation.position) record.positions.add(affiliation.position);
          });
          if (category === 'department') {
            const affiliation = recipientPersonAffiliations(record.personId)
              .find(value => value.departmentId === scopeId) || {
                departmentId: scopeId,
                departmentName: definition?.name || person.departmentName || '',
                position: person.position || '',
              };
            record.departments.set(scopeId, {...affiliation});
            if (affiliation.position) record.positions.add(affiliation.position);
          } else if (category === 'workgroup') {
            record.workgroups.set(scopeId, {
              workgroupId: scopeId,
              workgroupName: definition?.name || scopeId,
            });
          }
        });
        return;
      }
      if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        const current = RANGE_CATEGORIES.has(category) ? recipientDirectoryPerson(personId) : null;
        if (RANGE_CATEGORIES.has(category) && !current) return;
        const source = current ? {...item, ...current, personId} : item;
        const record = ensurePerson(source, category);
        if (!record) return;
        const sourceIds = recipientPersonSourceIds(item);
        sourceIds.forEach(scopeId => record.sourceScopeIds.add(scopeId));
        recipientPersonAffiliations(personId).forEach(affiliation => {
          record.departments.set(affiliation.departmentId, {...affiliation});
          if (affiliation.position) record.positions.add(affiliation.position);
        });
        if (category === 'workgroup') {
          const workgroupIds = unique([...(item.workgroupIds || []), ...sourceIds]);
          workgroupIds.forEach((workgroupId, index) => record.workgroups.set(workgroupId, {
            workgroupId,
            workgroupName: item.workgroupNames?.[index] || recipientScopeDefinition('workgroup', workgroupId)?.name || workgroupId,
          }));
        }
        return;
      }
      if (item.level === 'school' || item.schoolId) {
        ranges.push({
          id: item.schoolId || item.id,
          schoolId: item.schoolId || item.id,
          name: item.name,
          type: item.type || '',
          count: Number(item.staffCount ?? item.count ?? 0),
          staffCount: Number(item.staffCount ?? item.count ?? 0),
          category: 'school',
          level: 'school',
          selectionMode: 'all_staff',
        });
        return;
      }
      ranges.push({
        id: item.id,
        name: item.name,
        count: Number(item.count || 0),
        category,
        level: item.level || 'group',
        parent: item.parent || '',
        excludedChildIds: [...(item.excludedChildIds || [])],
      });
    });

    const personSnapshots = [...people.values()].map(record => {
      const departments = [...record.departments.values()];
      const workgroups = [...record.workgroups.values()];
      const positions = [...record.positions];
      return {
        id: record.personId,
        personId: record.personId,
        name: record.name,
        count: 1,
        category: [...record.sourceCategories][0] || 'department',
        level: 'person',
        status: record.status,
        selectionMode: 'snapshot',
        frozen: true,
        snapshotAt,
        sourceCategories: [...record.sourceCategories],
        sourceScopeIds: [...record.sourceScopeIds],
        departmentId: departments[0]?.departmentId || '',
        departmentName: departments[0]?.departmentName || '',
        position: positions[0] || '',
        departments,
        positions,
        workgroupIds: workgroups.map(value => value.workgroupId),
        workgroupNames: workgroups.map(value => value.workgroupName),
      };
    });
    return [...personSnapshots, ...ranges];
  };

  surveyRecipientItems = function (survey) {
    const items = surveyItemsFallback(survey);
    if (!survey?.recipientSnapshot?.length) return items;
    return items.map(item => (item.level === 'person' || item.personId)
      ? {...item, selectionMode: 'snapshot', frozen: true}
      : item);
  };

  bindRecipientOverviewV2 = function () {
    bindOverviewFallback();
    $$('[data-remove-recipient]').forEach(button => {
      button.onclick = () => {
        const key = button.dataset.removeRecipient;
        const item = state.recipients.get(key);
        const category = item ? recipientItemCategory(item) : key.split(':')[0];
        if (isDynamicRecipientScope(item)) {
          state.recipientManualPartialScopes.add(manualKey(category, recipientScopeId(item)));
        } else if (item?.level === 'person' || item?.personId) {
          unique(item.sourceScopeIds).forEach(scopeId => state.recipientManualPartialScopes.add(manualKey(category, scopeId)));
        }
        state.recipients.delete(key);
        refreshRecipientContractState();
        recipientTrack('recipient_item_remove', {
          category,
          object_id: item?.personId || item?.schoolId || item?.id || key,
          selection_mode: isDynamicRecipientScope(item) ? 'dynamic' : 'explicit_people',
          module_selected_count: recipientCategoryCount(category)
        });
        renderShell();
      };
    });
  };

  recipientSelectionError = function () {
    const items = [...state.recipients.values()];
    const legacy = items.some(item => item.requiresReselection && !isDynamicRecipientScope(item));
    const invalid = items.find(item => isDynamicRecipientScope(item) && recipientScopeIsInvalid(item));
    const count = recipientCount();
    if (legacy) return '历史学校角色范围已失效，请重新选择学校';
    if (invalid) {
      const category = invalid.scopeType || recipientItemCategory(invalid);
      recipientTrack('recipient_scope_invalid', {
        category,
        scope_type: category,
        scope_id: recipientScopeId(invalid),
        resolved_person_count: 0,
      });
      return '已选部门或工作组范围已失效，请重新选择';
    }
    if (state.portal === 'school' && !count) return '内部部门、家长、班级至少选择一项';
    if (!count && !state.externalRecipient) return '请选择有效接收人员或开启外部填写';
    return '';
  };

  PRD_FIELD_GROUPS.recipients = [
    ['完整范围回显', '完整覆盖部门或工作组全部有效成员时，仅回显范围名称。', 'normalizeCompleteRecipientScopes() / recipientModuleMarkupV2()'],
    ['部分人员回显', '仅部分覆盖时回显人员姓名；模块人数按 personId 去重。', 'recipientDisplayItemsForCategory()'],
    ['手动拆分', '完整范围取消一人后只拆当前范围；补齐后恢复范围名称。', 'recipientPickerManualPartialScopes'],
    ['重叠来源', '其他完整范围保持有效，并提示“已由其他范围选中”。', 'recipientPersonPickerState()'],
    ['草稿与模板', '保存 scope/person 对象及手动拆分标识。', 'recipientSelections / recipientManualPartialScopes'],
    ['发布快照', '发布时解析最新有效成员并固化带 snapshotAt 的人员快照。', 'selectedRecipientSnapshot()']
  ];
  PRD_FIELD_GROUPS.recipientPicker = [
    ['范围选择', '部门与非空工作组支持完整范围选择。', 'data-picker-dynamic-scope'],
    ['人员选择', '逐人选择；完整覆盖后自动归一化。', 'setDraftPerson()'],
    ['工作组全选状态', '仅完整覆盖全部有效成员时“全选本组”显示选中；选择单个或部分成员时保持未选中且不显示半选。', 'recipientScopeState() / bindRecipientPickerControls()'],
    ['确认与取消', 'PC 与移动端共用临时副本；确认提交，取消回滚。', 'commitRecipientPicker()'],
    ['失效校验', '范围缺失、越权或无有效成员时阻止发布。', 'recipientScopeIsInvalid()']
  ];
  ['create-recipients', 'template-recipients', 'mobile-recipients', 'mobile-settings'].forEach(key => {
    if (!PRD_PAGE_RULES[key]) return;
    PRD_PAGE_RULES[key].goal = '在 PC 与移动端按同一规则选择完整部门、完整工作组或具体人员；完整覆盖自动归一化，发布时按最新有效成员解析并固化人员快照。';
    PRD_PAGE_RULES[key].fields = prdFields(...(PRD_PAGE_FIELD_GROUPS[key] || ['recipients', 'recipientPicker']));
  });
  PRD_OVERLAY_RULES['recipient-picker'] = {
    title: '部门与工作组接收范围选择',
    goal: 'PC 与移动端按相同规则处理完整范围、部分人员、手动拆分、重叠来源和发布人员快照。',
    fields: prdFields('recipientPicker', 'recipients')
  };

  state.recipients = normalizeRecipientMap(state.recipients);
  refreshRecipientContractState();
  if (document.documentElement?.dataset) {
    document.documentElement.dataset.recipientPickerContract = 'v16';
    document.documentElement.dataset.recipientScopeV16 = 'ready';
    document.documentElement.dataset.recipientScopeV16Backup = 'stable';
  }
})();

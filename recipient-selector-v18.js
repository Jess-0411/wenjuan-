/* Recipient selector V1.9: object-aware summaries and unified selector layouts. */
(() => {
  'use strict';

  const V18_SCHEMA_VERSION = 4;
  const rootGlobal = typeof globalThis !== 'undefined' ? globalThis : window;
  const unique = values => [...new Set((values || []).filter(Boolean))];
  const cloneValue = value => {
    if (typeof structuredClone === 'function') {
      try { return structuredClone(value); } catch (_) { /* fall through */ }
    }
    return JSON.parse(JSON.stringify(value));
  };

  /* Prototype directory contract. The same stable IDs are used on PC and mobile. */
  const V18_GUARDIAN_DIRECTORY = {
    orgNodes: [
      {nodeId: 'school-experiment', nodeType: 'school', nodeName: '临江县实验学校', parentId: ''},
      {nodeId: 'stage-primary', nodeType: 'stage', nodeName: '小学', parentId: 'school-experiment'},
      {nodeId: 'grade-primary-1', nodeType: 'grade', nodeName: '一年级', parentId: 'stage-primary'},
      {nodeId: 'class-primary-1-1', nodeType: 'class', nodeName: '一年级1班', parentId: 'grade-primary-1', rosterCount: 42},
      {nodeId: 'class-primary-1-2', nodeType: 'class', nodeName: '一年级2班', parentId: 'grade-primary-1', rosterCount: 44},
      {nodeId: 'grade-primary-2', nodeType: 'grade', nodeName: '二年级', parentId: 'stage-primary'},
      {nodeId: 'class-primary-2-1', nodeType: 'class', nodeName: '二年级1班', parentId: 'grade-primary-2', rosterCount: 43},
      {nodeId: 'stage-junior', nodeType: 'stage', nodeName: '初中', parentId: 'school-experiment'},
      {nodeId: 'grade-junior-7', nodeType: 'grade', nodeName: '七年级', parentId: 'stage-junior'},
      {nodeId: 'class7-1', nodeType: 'class', nodeName: '七年级1班', parentId: 'grade-junior-7', rosterCount: 52},
      {nodeId: 'class7-2', nodeType: 'class', nodeName: '七年级2班', parentId: 'grade-junior-7', rosterCount: 54},
      {nodeId: 'class7-3', nodeType: 'class', nodeName: '七年级3班', parentId: 'grade-junior-7', rosterCount: 53},
      {nodeId: 'grade-junior-8', nodeType: 'grade', nodeName: '八年级', parentId: 'stage-junior'},
      {nodeId: 'class8-1', nodeType: 'class', nodeName: '八年级1班', parentId: 'grade-junior-8', rosterCount: 51},
      {nodeId: 'class8-2', nodeType: 'class', nodeName: '八年级2班', parentId: 'grade-junior-8', rosterCount: 52},
      {nodeId: 'class8-3', nodeType: 'class', nodeName: '八年级3班', parentId: 'grade-junior-8', rosterCount: 50},
      {nodeId: 'grade-junior-9', nodeType: 'grade', nodeName: '九年级', parentId: 'stage-junior'},
      {nodeId: 'class9-1', nodeType: 'class', nodeName: '九年级1班', parentId: 'grade-junior-9', rosterCount: 49},
      {nodeId: 'class9-2', nodeType: 'class', nodeName: '九年级2班', parentId: 'grade-junior-9', rosterCount: 50},
      {nodeId: 'class9-3', nodeType: 'class', nodeName: '九年级3班', parentId: 'grade-junior-9', rosterCount: 48},
    ],
    students: [
      {studentId: 'student-wenyichen', studentName: '温毅宸', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-linjia', studentName: '林佳', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-caiwenqing', studentName: '蔡闻倾', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-zhengjie', studentName: '郑洁8', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-weibangrun', studentName: '韦邦润', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-duanzuli', studentName: '段祖丽', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-xululu', studentName: '许露露', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-1', classId: 'class-primary-1-1', status: 'active'},
      {studentId: 'student-wenyuxuan', studentName: '温宇轩', schoolId: 'school-experiment', stageId: 'stage-primary', gradeId: 'grade-primary-2', classId: 'class-primary-2-1', status: 'active'},
      {studentId: 'student-qiming', studentName: '齐明', schoolId: 'school-experiment', stageId: 'stage-junior', gradeId: 'grade-junior-7', classId: 'class7-1', status: 'active'},
    ],
    studentGuardianRelations: [
      {relationId: 'relation-wenyichen-father', studentId: 'student-wenyichen', guardianId: 'guardian-001', guardianName: '家长1', relationCode: 'father', relationName: '父亲', status: 'active', canReceive: true},
      {relationId: 'relation-wenyichen-mother', studentId: 'student-wenyichen', guardianId: 'guardian-002', guardianName: '丁悦', relationCode: 'mother', relationName: '母亲', status: 'active', canReceive: true},
      {relationId: 'relation-linjia-grandfather', studentId: 'student-linjia', guardianId: 'guardian-046', guardianName: '家长46', relationCode: 'maternal_grandfather', relationName: '外公', status: 'active', canReceive: true},
      {relationId: 'relation-caiwenqing-father', studentId: 'student-caiwenqing', guardianId: 'guardian-091', guardianName: '家长91', relationCode: 'father', relationName: '父亲', status: 'active', canReceive: true},
      {relationId: 'relation-zhengjie-grandfather', studentId: 'student-zhengjie', guardianId: 'guardian-136', guardianName: '家长136', relationCode: 'maternal_grandfather', relationName: '外公', status: 'active', canReceive: true},
      {relationId: 'relation-weibangrun-father', studentId: 'student-weibangrun', guardianId: 'guardian-181', guardianName: '家长181', relationCode: 'father', relationName: '父亲', status: 'active', canReceive: true},
      {relationId: 'relation-duanzuli-grandfather', studentId: 'student-duanzuli', guardianId: 'guardian-226', guardianName: '家长226', relationCode: 'maternal_grandfather', relationName: '外公', status: 'active', canReceive: true},
      {relationId: 'relation-xululu-mother', studentId: 'student-xululu', guardianId: 'guardian-237', guardianName: '家长237', relationCode: 'mother', relationName: '母亲', status: 'active', canReceive: true},
      {relationId: 'relation-wenyuxuan-father', studentId: 'student-wenyuxuan', guardianId: 'guardian-001', guardianName: '家长1', relationCode: 'father', relationName: '父亲', status: 'active', canReceive: true},
      {relationId: 'relation-qiming-mother-disabled', studentId: 'student-qiming', guardianId: 'guardian-301', guardianName: '家长301', relationCode: 'mother', relationName: '母亲', status: 'inactive', canReceive: false},
    ],
  };

  const orgNodeById = id => V18_GUARDIAN_DIRECTORY.orgNodes.find(node => node.nodeId === id) || null;
  const orgChildren = id => V18_GUARDIAN_DIRECTORY.orgNodes.filter(node => node.parentId === id);
  const activeStudents = () => V18_GUARDIAN_DIRECTORY.students.filter(student => student.status === 'active');
  const activeGuardianRelations = () => V18_GUARDIAN_DIRECTORY.studentGuardianRelations
    .filter(relation => relation.status === 'active' && relation.canReceive === true && activeStudents().some(student => student.studentId === relation.studentId));
  const studentById = id => V18_GUARDIAN_DIRECTORY.students.find(student => student.studentId === id) || null;
  const guardianRelationsForStudent = id => activeGuardianRelations().filter(relation => relation.studentId === id);
  const guardianRelationById = id => activeGuardianRelations().find(relation => relation.relationId === id) || null;
  const nodePath = id => {
    const path = [];
    let node = orgNodeById(id);
    while (node) {
      path.unshift(node);
      node = node.parentId ? orgNodeById(node.parentId) : null;
    }
    return path;
  };
  const studentPathText = student => [student.schoolId, student.stageId, student.gradeId, student.classId]
    .map(id => orgNodeById(id)?.nodeName).filter(Boolean).join(' / ');

  const base = {};
  let contractCaptured = false;

  const ensureState = () => {
    if (typeof state === 'undefined') return null;
    if (!state.recipientSelectorV18 || typeof state.recipientSelectorV18 !== 'object') {
      state.recipientSelectorV18 = {
        activeDepartmentId: '',
        activeParentNodeId: 'class-primary-1-1',
        activeClassNodeId: 'grade-junior-7',
      };
    }
    return state.recipientSelectorV18;
  };

  const storeItems = store => store instanceof Map ? [...store.values()] : Array.isArray(store) ? store : [];
  const itemCategory = item => typeof recipientItemCategory === 'function' ? recipientItemCategory(item || {}) : (item?.category || 'department');
  const categoryItems = (category, store) => storeItems(store).filter(item => itemCategory(item) === category && !item?.requiresReselection);
  const isScope = item => typeof isDynamicRecipientScope === 'function' && isDynamicRecipientScope(item);
  const personId = item => item?.personId || item?.id || '';
  const relationId = item => item?.relationId || (item?.level === 'guardian_relation' ? item.id : '');

  function selectionSummary(category, store = state?.recipients) {
    const items = categoryItems(category, store);
    const resolvedRecipientCount = typeof recipientResolvedSelection === 'function'
      ? Number(recipientResolvedSelection(store, category)?.total || 0) : 0;
    const summary = {
      category,
      departmentScopeCount: 0,
      departmentExplicitPersonCount: 0,
      workgroupScopeCount: 0,
      workgroupExplicitPersonCount: 0,
      schoolCount: 0,
      guardianRelationCount: 0,
      classCount: 0,
      resolvedRecipientCount,
      objectCount: 0,
    };
    if (category === 'department' || category === 'workgroup') {
      const scopeIds = unique(items.filter(isScope).map(item => item.scopeId || item.id));
      const people = unique(items.filter(item => item.level === 'person' || item.personId).map(personId));
      if (category === 'department') {
        summary.departmentScopeCount = scopeIds.length;
        summary.departmentExplicitPersonCount = people.length;
      } else {
        summary.workgroupScopeCount = scopeIds.length;
        summary.workgroupExplicitPersonCount = people.length;
      }
      summary.objectCount = scopeIds.length + people.length;
      return summary;
    }
    if (category === 'school') {
      summary.schoolCount = unique(items.map(item => item.schoolId || item.id)).length;
      summary.objectCount = summary.schoolCount;
    } else if (category === 'parent') {
      summary.guardianRelationCount = unique(items.map(relationId).filter(Boolean)).length;
      summary.objectCount = summary.guardianRelationCount;
    } else if (category === 'class') {
      const ids = [];
      items.forEach(item => {
        if (item.classId || item.level === 'class' || orgNodeById(item.id)?.nodeType === 'class') ids.push(item.classId || item.id);
        else {
          const legacy = legacyClassIds(item);
          legacy.forEach(id => ids.push(id));
        }
      });
      summary.classCount = unique(ids).length;
      summary.objectCount = summary.classCount;
    }
    return summary;
  }

  function selectionSummaryText(category, store = state?.recipients) {
    const value = selectionSummary(category, store);
    if (category === 'department') return `选择部门 ${value.departmentScopeCount} 个，选择人员 ${value.departmentExplicitPersonCount} 人`;
    if (category === 'workgroup') return `选择工作组 ${value.workgroupScopeCount} 个，选择人员 ${value.workgroupExplicitPersonCount} 人`;
    if (category === 'school') return `选择学校 ${value.schoolCount} 个`;
    if (category === 'parent') return `选择家长 ${value.guardianRelationCount} 人`;
    if (category === 'class') return `选择班级 ${value.classCount} 个`;
    return `选择对象 ${value.objectCount} 个`;
  }

  function legacyClassIds(item) {
    const source = typeof RECIPIENT_DATA !== 'undefined' ? (RECIPIENT_DATA.school?.class || []) : [];
    const group = source.find(value => value.id === item?.id);
    if (!group) return [];
    const excluded = new Set(item?.excludedChildIds || []);
    return (group.children || []).map(child => child[0]).filter(id => !excluded.has(id));
  }

  const nodeStudents = nodeId => {
    const node = orgNodeById(nodeId);
    if (!node) return [];
    const keyByType = {school: 'schoolId', stage: 'stageId', grade: 'gradeId', class: 'classId'};
    return activeStudents().filter(student => student[keyByType[node.nodeType]] === nodeId);
  };

  function relationValue(relation) {
    const student = studentById(relation.studentId);
    return {
      id: relation.relationId,
      relationId: relation.relationId,
      studentId: relation.studentId,
      studentName: student?.studentName || relation.studentId,
      guardianId: relation.guardianId,
      guardianName: relation.guardianName,
      relationCode: relation.relationCode,
      relationName: relation.relationName,
      schoolId: student?.schoolId || '',
      stageId: student?.stageId || '',
      gradeId: student?.gradeId || '',
      classId: student?.classId || '',
      pathName: student ? studentPathText(student) : '',
      name: `${student?.studentName || '学生'}－${relation.guardianName}（${relation.relationName}）`,
      category: 'parent',
      level: 'guardian_relation',
      selectionMode: 'snapshot_relation',
      status: 'active',
      canReceive: true,
      count: 1,
    };
  }

  function classValue(node) {
    const rosterCount = Number(node?.rosterCount || nodeStudents(node?.nodeId).length || 0);
    return {
      id: node.nodeId,
      classId: node.nodeId,
      name: node.nodeName,
      category: 'class',
      level: 'class',
      selectionMode: 'snapshot_class',
      count: rosterCount,
      rosterCount,
      pathName: nodePath(node.nodeId).map(value => value.nodeName).join(' / '),
    };
  }

  function relationKey(id) { return typeof recipientSelectionKey === 'function' ? recipientSelectionKey('parent', id) : `parent:${id}`; }
  function classKey(id) { return typeof recipientSelectionKey === 'function' ? recipientSelectionKey('class', id) : `class:${id}`; }

  function setGuardianRelation(id, checked) {
    const relation = guardianRelationById(id);
    if (!relation || !(state?.recipientPickerDraft instanceof Map)) return false;
    const key = relationKey(id);
    if (checked) state.recipientPickerDraft.set(key, relationValue(relation));
    else state.recipientPickerDraft.delete(key);
    if (typeof recipientTrack === 'function') recipientTrack(checked ? 'recipient_guardian_select' : 'recipient_guardian_unselect', {
      category: 'parent', relation_id: id, student_id: relation.studentId, guardian_id: relation.guardianId,
      module_selected_count: selectionSummary('parent', state.recipientPickerDraft).guardianRelationCount,
    });
    return true;
  }

  function setStudentGuardians(id, checked) {
    const relations = guardianRelationsForStudent(id);
    relations.forEach(relation => setGuardianRelation(relation.relationId, checked));
    if (typeof recipientTrack === 'function') recipientTrack(checked ? 'recipient_student_guardians_select_all' : 'recipient_student_guardians_unselect_all', {
      category: 'parent', student_id: id, relation_count: relations.length,
      module_selected_count: selectionSummary('parent', state.recipientPickerDraft).guardianRelationCount,
    });
    return relations.length;
  }

  function guardianState(id, store = state?.recipientPickerDraft || state?.recipients) {
    const ids = guardianRelationsForStudent(id).map(relation => relation.relationId);
    const selected = ids.filter(value => store?.has(relationKey(value))).length;
    return {checked: Boolean(ids.length) && selected === ids.length, indeterminate: selected > 0 && selected < ids.length, selected, total: ids.length};
  }

  function filteredGuardianRelations(query = state?.recipientPickerSearch || '', nodeId = '') {
    const keyword = String(query || '').trim();
    let rows = activeGuardianRelations();
    if (nodeId && !keyword) {
      const allowed = new Set(nodeStudents(nodeId).map(student => student.studentId));
      rows = rows.filter(relation => allowed.has(relation.studentId));
    }
    if (keyword) rows = rows.filter(relation => {
      const student = studentById(relation.studentId);
      return [student?.studentName, relation.guardianName, relation.relationName, student ? studentPathText(student) : ''].join(' ').includes(keyword);
    });
    return rows;
  }

  function schoolFilteredState(store = state?.recipientPickerDraft) {
    const schools = typeof filteredBureauSchools === 'function' ? filteredBureauSchools() : [];
    const selected = schools.filter(school => store?.has(recipientSelectionKey('school', school.id))).length;
    return {checked: Boolean(schools.length) && selected === schools.length, indeterminate: selected > 0 && selected < schools.length, selected, total: schools.length};
  }

  function setFilteredSchools(checked) {
    const schools = typeof filteredBureauSchools === 'function' ? filteredBureauSchools() : [];
    schools.forEach(school => setDraftSchool(school, checked));
    if (typeof recipientTrack === 'function') recipientTrack(checked ? 'recipient_school_select_all_filtered' : 'recipient_school_unselect_all_filtered', {
      category: 'school', filtered_count: schools.length,
      school_type: state.recipientPickerSchoolType || '', search_keyword: state.recipientPickerSearch || '',
      module_selected_count: selectionSummary('school', state.recipientPickerDraft).schoolCount,
    });
    return schools.length;
  }

  function setClass(id, checked) {
    const node = orgNodeById(id);
    if (!node || node.nodeType !== 'class' || !(state?.recipientPickerDraft instanceof Map)) return false;
    if (checked) state.recipientPickerDraft.set(classKey(id), classValue(node));
    else state.recipientPickerDraft.delete(classKey(id));
    if (typeof recipientTrack === 'function') recipientTrack(checked ? 'recipient_class_select' : 'recipient_class_unselect', {
      category: 'class', class_id: id,
      module_selected_count: selectionSummary('class', state.recipientPickerDraft).classCount,
    });
    return true;
  }

  function migrateSelectionMap(input) {
    const source = input instanceof Map ? input : new Map(Array.isArray(input) ? input : []);
    const result = new Map();
    source.forEach((raw, storedKey) => {
      const item = typeof recipientDeepClone === 'function' ? recipientDeepClone(raw || {}) : cloneValue(raw || {});
      const category = itemCategory(item);
      if (category === 'parent') {
        if (relationId(item) && guardianRelationById(relationId(item))) {
          const relation = guardianRelationById(relationId(item));
          result.set(relationKey(relation.relationId), {...relationValue(relation), ...item, id: relation.relationId, relationId: relation.relationId});
          return;
        }
        const legacyGroups = typeof RECIPIENT_DATA !== 'undefined' ? (RECIPIENT_DATA.school?.parent || []) : [];
        const legacyGroup = legacyGroups.find(group => group.id === item.id);
        const legacyChild = legacyGroups.flatMap(group => (group.children || []).map(child => ({group, id: child[0]}))).find(value => value.id === item.id);
        const classIds = legacyGroup
          ? (legacyGroup.children || []).map(child => child[0].replace(/^parent/, 'class'))
          : legacyChild ? [legacyChild.id.replace(/^parent/, 'class')] : [];
        const excluded = new Set(item.excludedChildIds || []);
        const effectiveClassIds = classIds.filter(classId => !excluded.has(classId.replace(/^class/, 'parent')));
        const relations = activeGuardianRelations().filter(relation => effectiveClassIds.includes(studentById(relation.studentId)?.classId));
        if (relations.length) relations.forEach(relation => result.set(relationKey(relation.relationId), relationValue(relation)));
        else result.set(String(storedKey), {...item, requiresReselection: true, legacyName: item.name || '历史家长范围'});
        return;
      }
      if (category === 'class') {
        const directClass = item.classId || (item.level === 'class' ? item.id : '') || (orgNodeById(item.id)?.nodeType === 'class' ? item.id : '');
        const ids = directClass ? [directClass] : legacyClassIds(item);
        const valid = ids.map(orgNodeById).filter(node => node?.nodeType === 'class');
        if (valid.length) valid.forEach(node => result.set(classKey(node.nodeId), classValue(node)));
        else result.set(String(storedKey), {...item, requiresReselection: true, legacyName: item.name || '历史班级范围'});
        return;
      }
      result.set(String(storedKey), item);
    });
    return result;
  }

  function activeDepartmentId() {
    const local = ensureState();
    const groups = DEPARTMENT_PEOPLE[state.portal] || [];
    const valid = groups.find(group => group.id === local.activeDepartmentId);
    if (!valid) local.activeDepartmentId = groups.find(group => group.isLeaf && recipientScopeMembers('department', group.id).length)?.id || groups[0]?.id || '';
    return local.activeDepartmentId;
  }

  function departmentTreeRows() {
    const groups = DEPARTMENT_PEOPLE[state.portal] || [];
    const keyword = String(state.recipientPickerGroupSearch || '').trim();
    const byParent = id => groups.filter(group => group.parentId === id);
    const visible = new Set();
    if (keyword) {
      const byId = new Map(groups.map(group => [group.id, group]));
      groups.filter(group => group.name.includes(keyword)).forEach(group => {
        visible.add(group.id);
        let parent = group.parentId;
        while (parent) { visible.add(parent); parent = byId.get(parent)?.parentId || ''; }
      });
    }
    const rows = [];
    const walk = (parentId = '', depth = 0) => byParent(parentId).forEach(group => {
      if (keyword && !visible.has(group.id)) return;
      rows.push({...group, depth});
      walk(group.id, depth + 1);
    });
    walk();
    return rows;
  }

  function pcScopeTreeRow(category, group, activeId) {
    const members = recipientScopeMembers(category, group.id);
    const selectable = category === 'workgroup' ? members.length > 0 : group.isLeaf && members.length > 0;
    const scopeState = recipientScopeState(category, group.id, state.recipientPickerDraft);
    const name = esc(group.name);
    return `<div class="v18-tree-row ${activeId === group.id ? 'active' : ''}" style="--v18-depth:${group.depth || 0}" data-v18-tree-row="${category}">
      <label class="v18-tree-scope ${selectable ? '' : 'is-disabled'}" title="选择整个${name}">
        <input type="checkbox" data-picker-dynamic-scope="${category}" data-picker-scope-id="${esc(group.id)}" ${scopeState.checked ? 'checked' : ''} ${selectable ? '' : 'disabled'}>
        <span class="sr-only">选择整个${name}</span>
      </label>
      <button type="button" data-v18-tree-node="${category}" data-v18-node-id="${esc(group.id)}"><span>${name}</span><em>${selectable ? `${members.length} 人` : '目录'}　›</em></button>
    </div>`;
  }

  function scopePeoplePanel(category, scopeId) {
    const definition = recipientScopeDefinition(category, scopeId);
    const members = recipientScopeMembers(category, scopeId);
    const keyword = String(state.recipientPickerPersonSearch || '').trim();
    const visible = members.filter(person => !keyword || [person.name, person.position, person.departmentName].join(' ').includes(keyword));
    const scopeState = recipientScopeState(category, scopeId, state.recipientPickerDraft);
    const personAttribute = category === 'department' ? 'data-picker-person' : 'data-picker-workgroup-person';
    const rows = visible.map(person => {
      const pickerState = typeof recipientPersonPickerState === 'function'
        ? recipientPersonPickerState(category, person.personId, scopeId, state.recipientPickerDraft)
        : {checked: recipientPersonCovered(category, person.personId, state.recipientPickerDraft), coveredByOther: false};
      return `<label class="v18-object-row" data-v18-object-row="person">
        <input type="checkbox" ${personAttribute}="${esc(person.personId)}" data-picker-person-scope="${esc(scopeId)}" ${pickerState.checked ? 'checked' : ''}>
        <span><b>${esc(person.name)}</b><small>${esc(person.position || person.departmentName || '')}</small></span>
        ${pickerState.coveredByOther ? '<em class="recipient-other-scope">已由其他范围选中</em>' : ''}
      </label>`;
    }).join('');
    return `<section class="v18-object-panel">
      <header><div><h4>${esc(definition?.name || (category === 'department' ? '部门' : '工作组'))}</h4><span>${members.length} 名可选人员</span></div></header>
      <div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-person-search" maxlength="50" value="${esc(state.recipientPickerPersonSearch || '')}" placeholder="搜索人员姓名"></div>
      <label class="v18-select-all"><input type="checkbox" data-v18-scope-select-all="${category}" data-v18-scope-id="${esc(scopeId)}" ${scopeState.checked ? 'checked' : ''} ${members.length ? '' : 'disabled'}><span>${category === 'department' ? '选择整个部门' : '选择整个工作组'}</span></label>
      <div class="v18-object-list">${rows || `<div class="recipient-filter-empty"><b>${members.length ? '未找到符合条件的人员' : '暂无可选人员'}</b><span>${members.length ? '请调整搜索条件' : '请选择其他范围'}</span></div>`}</div>
    </section>`;
  }

  function departmentPickerV18() {
    const id = activeDepartmentId();
    const rows = departmentTreeRows().map(group => pcScopeTreeRow('department', group, id)).join('');
    return `<div class="v18-two-pane" data-recipient-v18-layout="two-pane" data-v18-category="department">
      <aside class="v18-tree-pane" data-recipient-v18-pane="tree">
        <div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-group-search" maxlength="50" value="${esc(state.recipientPickerGroupSearch || '')}" placeholder="搜索部门名称"></div>
        <div class="v18-tree-list">${rows || '<div class="recipient-filter-empty"><b>未找到部门</b><span>请调整部门名称</span></div>'}</div>
      </aside>
      <div class="v18-objects-pane" data-recipient-v18-pane="objects">${scopePeoplePanel('department', id)}</div>
    </div>`;
  }

  function workgroupPickerV18() {
    const leaves = recipientAllWorkgroupLeaves();
    const keyword = String(state.recipientPickerGroupSearch || '').trim();
    if (!leaves.some(group => group.id === state.recipientWorkgroupId)) state.recipientWorkgroupId = leaves[0]?.id || '';
    const rows = leaves.filter(group => !keyword || group.name.includes(keyword)).map((group, index) => pcScopeTreeRow('workgroup', {...group, depth: group.depth || (index ? 1 : 0)}, state.recipientWorkgroupId)).join('');
    return `<div class="v18-two-pane" data-recipient-v18-layout="two-pane" data-v18-category="workgroup">
      <aside class="v18-tree-pane" data-recipient-v18-pane="tree">
        <div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-group-search" maxlength="50" value="${esc(state.recipientPickerGroupSearch || '')}" placeholder="搜索工作组名称"></div>
        <div class="v18-tree-list">${rows || '<div class="recipient-filter-empty"><b>未找到工作组</b><span>请调整工作组名称</span></div>'}</div>
      </aside>
      <div class="v18-objects-pane" data-recipient-v18-pane="objects">${scopePeoplePanel('workgroup', state.recipientWorkgroupId)}</div>
    </div>`;
  }

  function parentTreeRows() {
    const active = ensureState().activeParentNodeId;
    return V18_GUARDIAN_DIRECTORY.orgNodes.map(node => {
      const depth = Math.max(0, nodePath(node.nodeId).length - 1);
      const children = orgChildren(node.nodeId);
      const count = nodeStudents(node.nodeId).reduce((sum, student) => sum + guardianRelationsForStudent(student.studentId).length, 0);
      return `<div class="v18-tree-row ${active === node.nodeId ? 'active' : ''}" style="--v18-depth:${depth}" data-v18-tree-row="parent">
        <span class="v18-node-dot" aria-hidden="true"></span>
        <button type="button" data-v18-tree-node="parent" data-v18-node-id="${esc(node.nodeId)}"><span>${esc(node.nodeName)}</span><em>${children.length ? '下级' : `${count} 人`}　›</em></button>
      </div>`;
    }).join('');
  }

  function parentBreadcrumb(nodeId, mobile = false) {
    const parts = nodePath(nodeId);
    return `<nav class="v18-parent-breadcrumb ${mobile ? 'mobile-recipient-breadcrumb' : ''}" data-parent-breadcrumb aria-label="家长组织路径"><button type="button" data-parent-breadcrumb-node="school-experiment">全部</button>${parts.map((node, index) => `<span>›</span><button type="button" data-parent-breadcrumb-node="${esc(node.nodeId)}" ${index === parts.length - 1 ? 'aria-current="page"' : ''}>${esc(node.nodeName)}</button>`).join('')}</nav>`;
  }

  function guardianRows(relations, showPath = false) {
    const byStudent = new Map();
    relations.forEach(relation => {
      const list = byStudent.get(relation.studentId) || [];
      list.push(relation);
      byStudent.set(relation.studentId, list);
    });
    return [...byStudent.entries()].map(([studentId, rows]) => {
      const student = studentById(studentId);
      const studentState = guardianState(studentId, state.recipientPickerDraft);
      return `<article class="v18-parent-student" data-parent-student="${esc(studentId)}">
        <label class="v18-student-row"><input type="checkbox" data-parent-student-select="${esc(studentId)}" ${studentState.checked ? 'checked' : ''}><span><b>${esc(student?.studentName || studentId)}</b>${showPath ? `<small>${esc(student ? studentPathText(student) : '')}</small>` : ''}</span><em>${rows.length} 位家长</em></label>
        <div class="v18-guardian-list">${rows.map(relation => `<label class="v18-guardian-row" data-parent-guardian-row="${esc(relation.relationId)}"><input type="checkbox" data-parent-guardian-select="${esc(relation.relationId)}" ${state.recipientPickerDraft?.has(relationKey(relation.relationId)) ? 'checked' : ''}><span>${esc(relation.guardianName)}</span><em>${esc(relation.relationName)}</em></label>`).join('')}</div>
      </article>`;
    }).join('');
  }

  function parentObjectsPanel(mobile = false) {
    const local = ensureState();
    const node = orgNodeById(local.activeParentNodeId) || orgNodeById('class-primary-1-1');
    local.activeParentNodeId = node.nodeId;
    const keyword = String(state.recipientPickerSearch || '').trim();
    const children = orgChildren(node.nodeId);
    const relations = filteredGuardianRelations(keyword, node.nodeId);
    const selected = relations.filter(relation => state.recipientPickerDraft?.has(relationKey(relation.relationId))).length;
    const showObjects = keyword || node.nodeType === 'class';
    const navRows = children.map(child => `<button type="button" class="v18-parent-nav-row" data-parent-nav-node="${esc(child.nodeId)}"><span><b>${esc(child.nodeName)}</b><small>${child.nodeType === 'stage' ? '学段' : child.nodeType === 'grade' ? '年级' : '班级'}</small></span><em>›</em></button>`).join('');
    const all = showObjects ? `<label class="${mobile ? 'mobile-recipient-select-all' : 'v18-select-all'}"><input type="checkbox" data-parent-select-all ${relations.length && selected === relations.length ? 'checked' : ''} ${relations.length ? '' : 'disabled'}><span>全选当前结果</span></label>` : '';
    return `<section class="v18-parent-panel ${mobile ? 'mobile' : ''}" data-parent-selector>
      <div class="${mobile ? 'mobile-recipient-search' : 'v18-parent-search'}"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" data-parent-search maxlength="50" value="${esc(state.recipientPickerSearch || '')}" placeholder="请输入学生或家长姓名"></div></div>
      ${keyword ? '<div class="v18-search-context">搜索结果（展示完整组织路径）</div>' : parentBreadcrumb(node.nodeId, mobile)}
      ${all}
      <div class="v18-parent-results" data-parent-results>${showObjects ? (guardianRows(relations, Boolean(keyword)) || '<div class="recipient-filter-empty"><b>暂无符合条件的家长</b><span>请调整搜索条件或选择其他班级</span></div>') : navRows}</div>
    </section>`;
  }

  function parentPickerV18(mobile = false) {
    if (mobile) return parentObjectsPanel(true);
    return `<div class="v18-two-pane" data-recipient-v18-layout="two-pane" data-v18-category="parent">
      <aside class="v18-tree-pane" data-recipient-v18-pane="tree"><div class="v18-tree-title">学校 / 学段 / 年级 / 班级</div><div class="v18-tree-list">${parentTreeRows()}</div></aside>
      <div class="v18-objects-pane" data-recipient-v18-pane="objects">${parentObjectsPanel(false)}</div>
    </div>`;
  }

  function classTreeRows() {
    const active = ensureState().activeClassNodeId;
    return V18_GUARDIAN_DIRECTORY.orgNodes.filter(node => node.nodeType !== 'class').map(node => {
      const depth = Math.max(0, nodePath(node.nodeId).length - 1);
      return `<div class="v18-tree-row ${active === node.nodeId ? 'active' : ''}" style="--v18-depth:${depth}" data-v18-tree-row="class"><span class="v18-node-dot" aria-hidden="true"></span><button type="button" data-v18-tree-node="class" data-v18-node-id="${esc(node.nodeId)}"><span>${esc(node.nodeName)}</span><em>›</em></button></div>`;
    }).join('');
  }

  function classObjectsPanel() {
    const local = ensureState();
    let active = orgNodeById(local.activeClassNodeId);
    if (!active || active.nodeType === 'class') active = orgNodeById('grade-junior-7');
    local.activeClassNodeId = active.nodeId;
    const keyword = String(state.recipientPickerSearch || '').trim();
    let classes;
    if (keyword) classes = V18_GUARDIAN_DIRECTORY.orgNodes.filter(node => node.nodeType === 'class' && node.nodeName.includes(keyword));
    else if (active.nodeType === 'grade') classes = orgChildren(active.nodeId).filter(node => node.nodeType === 'class');
    else {
      const descendants = new Set(nodeStudents(active.nodeId).map(student => student.classId));
      classes = V18_GUARDIAN_DIRECTORY.orgNodes.filter(node => node.nodeType === 'class' && descendants.has(node.nodeId));
    }
    const selected = classes.filter(node => state.recipientPickerDraft?.has(classKey(node.nodeId))).length;
    const rows = classes.map(node => `<label class="v18-object-row" data-v18-object-row="class"><input type="checkbox" data-v18-class-select="${esc(node.nodeId)}" ${state.recipientPickerDraft?.has(classKey(node.nodeId)) ? 'checked' : ''}><span><b>${esc(node.nodeName)}</b><small>${esc(nodePath(node.nodeId).slice(0, -1).map(value => value.nodeName).join(' / '))}</small></span><em>${Number(node.rosterCount || 0)} 人</em></label>`).join('');
    return `<section class="v18-object-panel"><header><div><h4>${esc(active.nodeName)}</h4><span>选择该范围内班级</span></div></header><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" maxlength="50" value="${esc(state.recipientPickerSearch || '')}" placeholder="搜索班级名称"></div><label class="v18-select-all"><input type="checkbox" data-v18-class-select-all ${classes.length && selected === classes.length ? 'checked' : ''} ${classes.length ? '' : 'disabled'}><span>全选当前结果</span></label><div class="v18-object-list">${rows || '<div class="recipient-filter-empty"><b>暂无符合条件的班级</b><span>请选择年级或调整关键词</span></div>'}</div></section>`;
  }

  function classPickerV18() {
    return `<div class="v18-two-pane" data-recipient-v18-layout="two-pane" data-v18-category="class"><aside class="v18-tree-pane" data-recipient-v18-pane="tree"><div class="v18-tree-title">学校 / 学段 / 年级</div><div class="v18-tree-list">${classTreeRows()}</div></aside><div class="v18-objects-pane" data-recipient-v18-pane="objects">${classObjectsPanel()}</div></div>`;
  }

  function schoolPickerV18(mobile = false) {
    const schools = filteredBureauSchools();
    const allState = schoolFilteredState();
    const filters = `<div class="recipient-picker-filters school"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" maxlength="50" value="${esc(state.recipientPickerSearch || '')}" placeholder="${mobile ? '请输入学校名称' : '搜索学校名称'}"></div><select id="recipient-picker-school-type" class="${mobile ? 'mobile-school-filter' : 'select'}"><option value="">全部学校类型</option>${['小学', '初中', '九年一贯制'].map(type => `<option value="${type}" ${state.recipientPickerSchoolType === type ? 'selected' : ''}>${type}</option>`).join('')}</select></div>`;
    const rows = schools.map(school => `<label class="${mobile ? 'mobile-school-direct-row' : 'recipient-school-direct-row'}" data-picker-school-row="${esc(school.id)}"><input type="checkbox" data-picker-school="${esc(school.id)}" ${state.recipientPickerDraft?.has(recipientSelectionKey('school', school.id)) ? 'checked' : ''}><span><b>${esc(school.name)}</b></span><em>${school.staffCount} 名教职工</em></label>`).join('');
    return `${filters}<label class="${mobile ? 'mobile-recipient-select-all' : 'v18-school-select-all'}"><input type="checkbox" data-picker-school-all data-school-select-all-filtered ${allState.checked ? 'checked' : ''} ${schools.length ? '' : 'disabled'}><span>全选当前筛选结果</span><em>${allState.selected}/${allState.total}</em></label>${mobile ? '' : '<div class="recipient-table-head school-direct-head"><span>学校名称</span><span>教职工人数</span></div>'}<div class="${mobile ? 'mobile-recipient-list' : 'recipient-school-direct-list'}" data-recipient-v18-school-list>${rows || '<div class="recipient-filter-empty"><b>未找到符合条件的学校</b><span>请调整名称或学校类型</span></div>'}</div>`;
  }

  function recipientPickerBodyV18(category, mobile = false) {
    if (mobile) {
      if (category === 'parent') return parentPickerV18(true);
      if (category === 'school') return schoolPickerV18(true);
      return base.recipientPickerBody(category, true);
    }
    if (category === 'department') return departmentPickerV18();
    if (category === 'workgroup') return workgroupPickerV18();
    if (category === 'parent') return parentPickerV18(false);
    if (category === 'class') return classPickerV18();
    if (category === 'school') return schoolPickerV18(false);
    return base.recipientPickerBody(category, false);
  }

  function recipientModuleMarkupV18([category, label]) {
    const items = typeof recipientDisplayItemsForCategory === 'function' ? recipientDisplayItemsForCategory(category) : categoryItems(category, state.recipients);
    const tags = items.map(item => {
      const invalid = item.requiresReselection || (isScope(item) && recipientScopeIsInvalid(item));
      const name = invalid ? `${item.name || item.legacyName}（范围已失效，请重新选择）` : item.name;
      return `<span class="${invalid ? 'needs-reselection' : ''} ${isScope(item) ? 'scope-recipient' : ''}"><span class="recipient-scope-name">${esc(name || '')}</span><button type="button" data-remove-recipient="${esc(item._selectionKey || recipientSelectionKey(category, relationId(item) || item.classId || item.schoolId || item.personId || item.id))}" aria-label="移除${esc(name || '')}">×</button></span>`;
    }).join('');
    const actionLabel = {department: '添加人员', workgroup: '添加人员', school: '选择学校', parent: '选择家长', class: '选择班级'}[category] || '添加';
    return `<article class="recipient-overview-module" data-recipient-module="${category}"><header><div><h3>${esc(label)}</h3></div><div class="recipient-module-actions"><strong class="recipient-module-count" data-module-count="${category}">${esc(selectionSummaryText(category))}</strong><button type="button" data-open-recipient-category="${category}">${actionLabel}</button></div></header><div class="recipient-module-selection">${tags ? `<div class="recipient-module-tags">${tags}</div>` : '<span class="recipient-module-empty">暂未选择</span>'}</div></article>`;
  }

  function pickerFooterText(category, store = state.recipientPickerDraft) { return selectionSummaryText(category, store); }

  function renderPcRecipientPickerModalV18() {
    const root = $('#modal');
    if (!root || !state.recipientPickerDraft || state.recipientPickerMode !== 'pc') return;
    const category = state.recipientPickerCategory;
    const label = recipientOverviewTabs().find(tab => tab[0] === category)?.[1] || '接收对象';
    const meta = recipientTabMeta()[category];
    root.className = 'modal-mask show recipient-picker-mask';
    root.innerHTML = `<div class="modal recipient-picker-modal v18-recipient-picker-modal" data-recipient-picker="${category}" data-recipient-selector-version="4"><header class="recipient-picker-head"><div><h3>选择${esc(label)}</h3><p>${esc(meta?.[1] || '选择接收对象')}</p></div><div class="recipient-picker-tools">${prdButton('recipient-picker', 'overlay', 'overlay-prd-trigger')}<button type="button" class="recipient-picker-close" data-picker-cancel aria-label="关闭">×</button></div></header><section class="recipient-picker-body">${recipientPickerBodyV18(category, false)}</section><div class="modal-actions recipient-picker-actions"><span data-picker-module-total>${esc(pickerFooterText(category))}</span><div><button type="button" class="btn" data-picker-cancel>取消</button><button type="button" class="btn primary" data-picker-confirm>确定</button></div></div></div>`;
    root.onclick = event => { if (event.target === root) discardRecipientPicker('mask'); };
    bindPrdButton($('.overlay-prd-trigger', root));
    bindRecipientPickerControls(root);
  }

  function mobileRecipientFooterV18(category, buttonText = '确定', attribute = 'data-picker-confirm') {
    return `<footer class="mobile-recipient-footer module-only"><div><b>${esc(pickerFooterText(category))}</b></div><button type="button" ${attribute}>${buttonText}</button></footer>`;
  }

  function mobileCategoryPickerPageV18(category) {
    const label = recipientOverviewTabs().find(tab => tab[0] === category)?.[1] || '成员';
    return `${statsMobileHead(`选择${label}`, '#mobile/recipients')}<section class="mobile-recipient-page mobile-recipient-picker-page v18-mobile-recipient-picker" data-recipient-selector-version="4">${recipientPickerBodyV18(category, true)}</section>${mobileRecipientFooterV18(category)}`;
  }

  function mobileRecipientsPageV18() {
    const parts = state.page.split('/'), category = parts[2];
    if (category) {
      ensureMobileRecipientPicker(category);
      if (category === 'workgroup') return parts[3] ? mobileWorkgroupPeoplePage(parts[3]) : mobileWorkgroupTreePage();
      return mobileCategoryPickerPageV18(category);
    }
    clearRecipientPickerState();
    const rule = state.portal === 'school' ? '部门、家长、班级均为非必填；纯外部问卷可进入收集设置并开启外部填写。' : '部门、工作组、学校可组合选择。';
    return `${statsMobileHead('选择成员', state.recipientReturnPage || '#mobile/create')}<section class="mobile-recipient-page mobile-recipient-overview"><div class="recipient-overview-intro"><b>接收对象</b><span>${rule}</span></div><div class="recipient-overview-list">${recipientOverviewTabs().map(recipientModuleMarkupV18).join('')}</div></section><footer class="mobile-recipient-footer overview-only"><a href="#mobile/settings" data-mobile-recipient-overview-next>确认</a></footer>`;
  }

  function currentObjectStepV18() {
    const rule = state.portal === 'school' ? '部门、家长、班级均为非必填；纯外部问卷可进入下一步并开启外部填写。' : '部门、工作组、学校可组合选择；学校被选中后覆盖该校全部有效教职工。';
    return `<div class="form-card pc-recipient-card recipient-overview-card"><div class="section-title">选择接收人员</div><p class="recipient-overview-rule">${rule}</p><div class="recipient-overview-list">${recipientOverviewTabs().map(recipientModuleMarkupV18).join('')}</div><div class="footer-actions pc-recipient-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="next">下一步</button></div></div>`;
  }

  function bindV18Controls(root = $('#view')) {
    $$('[data-v18-tree-node]', root).forEach(button => button.onclick = () => {
      const category = button.dataset.v18TreeNode, id = button.dataset.v18NodeId, local = ensureState();
      if (category === 'department') local.activeDepartmentId = id;
      else if (category === 'workgroup') state.recipientWorkgroupId = id;
      else if (category === 'parent') local.activeParentNodeId = id;
      else if (category === 'class') local.activeClassNodeId = id;
      state.recipientPickerPersonSearch = '';
      rerenderRecipientPicker();
    });
    $$('[data-v18-scope-select-all]', root).forEach(input => {
      const category = input.dataset.v18ScopeSelectAll, id = input.dataset.v18ScopeId;
      const value = recipientScopeState(category, id, state.recipientPickerDraft);
      input.checked = value.checked;
      input.indeterminate = value.indeterminate;
      input.setAttribute('aria-checked', value.indeterminate ? 'mixed' : String(value.checked));
      input.onchange = () => { setDraftDynamicScope(category, id, input.checked); rerenderRecipientPicker(); };
    });
    const schoolAll = $('[data-school-select-all-filtered]', root);
    if (schoolAll) {
      const value = schoolFilteredState();
      schoolAll.checked = value.checked;
      schoolAll.indeterminate = value.indeterminate;
      schoolAll.setAttribute('aria-checked', value.indeterminate ? 'mixed' : String(value.checked));
      schoolAll.onchange = () => { setFilteredSchools(schoolAll.checked); rerenderRecipientPicker(); };
    }
    $$('[data-parent-breadcrumb-node]', root).forEach(button => button.onclick = () => {
      ensureState().activeParentNodeId = button.dataset.parentBreadcrumbNode;
      state.recipientPickerSearch = '';
      recipientTrack('recipient_parent_breadcrumb_click', {category: 'parent', node_id: button.dataset.parentBreadcrumbNode});
      rerenderRecipientPicker();
    });
    $$('[data-parent-nav-node]', root).forEach(button => button.onclick = () => {
      ensureState().activeParentNodeId = button.dataset.parentNavNode;
      recipientTrack('recipient_parent_node_open', {category: 'parent', node_id: button.dataset.parentNavNode});
      rerenderRecipientPicker();
    });
    $$('[data-parent-guardian-select]', root).forEach(input => input.onchange = () => {
      setGuardianRelation(input.dataset.parentGuardianSelect, input.checked);
      rerenderRecipientPicker();
    });
    $$('[data-parent-student-select]', root).forEach(input => {
      const value = guardianState(input.dataset.parentStudentSelect);
      input.checked = value.checked;
      input.indeterminate = value.indeterminate;
      input.setAttribute('aria-checked', value.indeterminate ? 'mixed' : String(value.checked));
      input.onchange = () => { setStudentGuardians(input.dataset.parentStudentSelect, input.checked); rerenderRecipientPicker(); };
    });
    const parentAll = $('[data-parent-select-all]', root);
    if (parentAll) {
      const relations = filteredGuardianRelations(state.recipientPickerSearch, ensureState().activeParentNodeId);
      const selected = relations.filter(relation => state.recipientPickerDraft?.has(relationKey(relation.relationId))).length;
      parentAll.checked = Boolean(relations.length) && selected === relations.length;
      parentAll.indeterminate = selected > 0 && selected < relations.length;
      parentAll.setAttribute('aria-checked', parentAll.indeterminate ? 'mixed' : String(parentAll.checked));
      parentAll.onchange = () => {
        relations.forEach(relation => setGuardianRelation(relation.relationId, parentAll.checked));
        recipientTrack(parentAll.checked ? 'recipient_guardian_select_all_filtered' : 'recipient_guardian_unselect_all_filtered', {category: 'parent', filtered_count: relations.length});
        rerenderRecipientPicker();
      };
    }
    $$('[data-v18-class-select]', root).forEach(input => input.onchange = () => { setClass(input.dataset.v18ClassSelect, input.checked); rerenderRecipientPicker(); });
    const classAll = $('[data-v18-class-select-all]', root);
    if (classAll) classAll.onchange = () => {
      $$('[data-v18-class-select]', root).forEach(input => setClass(input.dataset.v18ClassSelect, classAll.checked));
      recipientTrack(classAll.checked ? 'recipient_class_select_all_filtered' : 'recipient_class_unselect_all_filtered', {category: 'class'});
      rerenderRecipientPicker();
    };
    const parentSearch = $('[data-parent-search]', root);
    if (parentSearch) parentSearch.oninput = event => {
      state.recipientPickerSearch = event.target.value.slice(0, 50);
      recipientTrack('recipient_guardian_search', {category: 'parent', search_keyword: state.recipientPickerSearch});
      rerenderRecipientPicker('recipient-picker-search');
    };
  }

  function recipientTabsV18() {
    return state.portal === 'bureau'
      ? [['department', '部门'], ['workgroup', '工作组'], ['school', '学校']]
      : [['department', '部门'], ['parent', '家长'], ['class', '班级']];
  }

  function recipientMetaV18() {
    return state.portal === 'bureau' ? {
      department: ['部门', '左侧选择部门，右侧选择整个部门或具体人员'],
      workgroup: ['工作组', '左侧选择工作组，右侧选择整个工作组或具体人员'],
      school: ['学校', '按名称和学校类型筛选，支持全选当前筛选结果'],
    } : {
      department: ['部门', '左侧选择部门，右侧选择整个部门或具体人员'],
      parent: ['家长', '按学校、学段、年级、班级定位学生及其家长'],
      class: ['班级', '左侧选择学校层级，右侧选择班级'],
    };
  }

  function guardianTaskKey(surveyId, relation, collectionDate = '') {
    const id = typeof relation === 'string' ? relation : relation?.relationId;
    return [surveyId, id, collectionDate].map(value => String(value ?? '')).join(':');
  }

  function captureContract() {
    if (contractCaptured || typeof state === 'undefined') return;
    contractCaptured = true;
    Object.assign(base, {
      recipientPickerBody,
      bindRecipientPickerControls,
      beginRecipientPicker,
      clearRecipientPickerState,
      normalizeRecipientMap,
      recipientResolvedSelection,
      selectedRecipientSnapshot,
      draftPayload,
      surveyTemplateValue,
      draftRecipientSnapshot,
      loadEditableSurveyState,
      loadSurveyTemplateState,
      recipientSelectionError,
      surveyHasResolvedRecipientObjects,
      syncSurveyRecipientAssignments,
      renderRecipientPickerPrd,
    });
  }

  function installPrdRules() {
    if (typeof PRD_FIELD_GROUPS === 'undefined') return;
    PRD_FIELD_GROUPS.recipients = [
      ['接收对象模块', '教育局端为部门、工作组、学校；学校端为部门、家长、班级。', 'recipientOverviewTabs()'],
      ['分类计数', '部门、工作组、人员、学校、家长关系和班级分别按稳定 ID 计数，不用预计覆盖人数替代选择对象数。', 'selectionSummary()'],
      ['范围与人员', '完整部门或工作组回显范围名称；具体人员回显姓名；实际接收人数继续按 personId 解析并去重。', 'recipientModuleMarkupV2() / recipientResolvedSelection()'],
      ['家长关系', '家长按 relationId 保存，回显学生姓名－家长姓名（关系）；同一家长关联不同学生时保留多条关系。', 'V18_GUARDIAN_DIRECTORY / relationValue()'],
      ['发布数据', '部门和工作组保留 dynamic scope，收集期内按最新有效成员实时解析；学校、班级、家长关系沿用既有快照。', 'selectedRecipientSnapshot() / surveyRecipientResolution()'],
      ['版本兼容', '选择数据使用 schemaVersion=4；旧家长与班级范围可映射时转换，无法映射时标记失效并要求重选。', 'migrateSelectionMap()'],
    ];
    PRD_FIELD_GROUPS.recipientPicker = [
      ['PC 布局', '部门、工作组、家长、班级使用左侧层级树与右侧对象列表；节点选择与导航操作独立。', 'data-recipient-v18-layout=two-pane'],
      ['学校全选', 'PC 与移动端全选当前名称和学校类型筛选结果，覆盖分页外命中学校，不影响筛选外已选项。', 'data-school-select-all-filtered'],
      ['移动端家长', '按学校→学段→年级→班级钻取；支持学生/家长搜索、面包屑、学生整选和家长单选。', 'data-parent-selector'],
      ['事务边界', '打开选择器复制当前模块；确定提交，取消、遮罩、返回或 Escape 回滚。', 'beginRecipientPicker() / commitRecipientPicker()'],
      ['有效性', '仅 status=active 且 canReceive=true 的人员和家长关系可选；无有效成员的范围禁用。', 'recipientScopeMembers() / activeGuardianRelations()'],
      ['范围状态', '主动勾选部门或工作组时保存动态范围并显示全选；逐人选中部分或全部成员时均保存明确人员，范围复选框显示半选。', 'recipientScopeState() / setDraftDynamicScope()'],
      ['移动确认', '移动端接收对象总览按钮显示“确认”，确认后进入收集设置。', 'mobileRecipientsPage()'],
    ];
    ['create-recipients', 'template-recipients', 'mobile-recipients', 'mobile-settings'].forEach(key => {
      if (!PRD_PAGE_RULES[key]) return;
      PRD_PAGE_RULES[key].fields = prdFields(...(PRD_PAGE_FIELD_GROUPS[key] || ['recipients', 'recipientPicker']));
    });
    if (PRD_PAGE_RULES['create-recipients']) PRD_PAGE_RULES['create-recipients'].goal = '在 PC 端按统一层级选择器配置部门、工作组、学校、家长或班级，并分别核对对象数与实际接收人数。';
    if (PRD_PAGE_RULES['mobile-recipients']) PRD_PAGE_RULES['mobile-recipients'].goal = '在移动端选择接收对象；学校端家长按学校、学段、年级、班级、学生和家长关系定位。';
    PRD_OVERLAY_RULES['recipient-picker'] = {title: '接收对象选择 V1.9', goal: '统一 PC 与移动端范围选择、范围转人员、实时解析和分类计数口径。', fields: prdFields('recipientPicker', 'recipients')};
  }

  function renderRecipientPickerPrdV18(rule, key, entryType) {
    const features = [
      ['模块命名', '部门', '教育局端与学校端统一使用“部门”。', 'P0', 'PC 与移动端一致'],
      ['PC 选择器', '双栏结构', '部门、工作组、家长、班级使用左侧层级树与右侧对象列表。', 'P0', '导航与选择事件分离'],
      ['学校选择', '筛选结果全选', '全选当前名称与学校类型筛选命中的全部授权学校，筛选外选择保持不变。', 'P0', '支持三态'],
      ['家长选择', '学生与家长', '沿学校、学段、年级、班级定位学生；学生可整选全部有效家长，家长可单选。', 'P0', '按 relationId 保存'],
      ['分类计数', '对象数', '部门、人员、工作组、学校、家长关系和班级分别统计稳定 ID。', 'P0', '与实际接收人数分离'],
      ['事务交互', '确认与回滚', '确定提交临时副本；取消、遮罩、返回和 Escape 不保存。', 'P0', '沿用 V1.7'],
      ['动态范围', '实时解析', '部门和教育局工作组保存 dynamic scope，填写资格和统计人数按当前有效成员实时解析。', 'P0', '按 personId 去重'],
      ['范围状态', '主动选择', '只有主动勾选范围才保存 dynamic scope；逐人选中部分或全部成员均保存明确人员，范围复选框保持半选。', 'P0', '部门与工作组一致'],
      ['范围联动', '转为人员', '从动态范围取消任一成员时删除范围，将其余当前有效成员保存为明确人员。', 'P0', '后续新增成员不自动纳入'],
      ['数据兼容', 'V4 迁移', '旧草稿经兼容层映射；无法映射的范围阻止发布并要求重选。', 'P0', '历史已发布问卷不强制迁移'],
    ];
    const payload = `{"recipientSelectionSchemaVersion":4,"selectionSummary":{"departmentScopeCount":1,"departmentExplicitPersonCount":2,"schoolCount":1,"guardianRelationCount":2,"classCount":1,"resolvedRecipientCount":130},"guardianRelation":{"relationId":"relation-wenyichen-father","studentId":"student-wenyichen","guardianId":"guardian-001","relationName":"父亲"}}`;
    return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType === 'page' ? '页面' : '弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite"><strong>V1.8 选择与计数口径</strong><p>界面分别统计选择对象；发布校验与统计继续使用解析后的实际接收人数。</p><small>家长按学生家长关系生成任务，同一家长对应两个学生时生成两条任务。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局与学校问卷管理员在新增或编辑问卷时通过统一组件选择接收对象，并准确核对动态范围、明确人员及家长关系。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>PC 双栏选择器、移动端层级选择、学校筛选全选、分类计数、动态部门与工作组、范围转人员、实时资格与统计及 V4 兼容。</p><h4>Out of Scope</h4><p>组织架构维护、家长关系维护、首页组件、已有人员选择自动迁移为范围和后端定时任务。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块', '功能点', '需求描述', '优先级（P0 / P1 / P2）', '备注说明'], features)}</section><section><h3>5. 核心流程与交互说明</h3><p>PC 先在左侧定位层级，再在右侧选择范围或对象；主动勾选部门或工作组保存动态范围，逐人选满仍保存明确人员并保持范围半选。移动端家长通过面包屑逐级定位，学生复选框整选其有效家长，家长行可单独选择。所有选择均在临时副本中完成，确认后提交。</p>${prdTable(['字段/信息', '限制与展示规则', '当前原型来源'], rule.fields || [])}</section><section><h3>6. 异常场景与边界条件</h3><p>停用人员和不可接收家长关系不参与选择；空范围禁用；筛选无结果展示空态；无法映射的旧范围标记失效并阻止发布；同一 personId 的内部人员去重，家长按 relationId 计数。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>部门和工作组范围按 scopeId 保存 dynamic scope，填写与统计时实时解析 active 且 canReceive=true 的成员；明确人员按 personId，学校按 schoolId，班级按 classId，家长按 relationId 去重。家长填写任务唯一键为 surveyId + relationId + collectionDate。记录选择、取消、筛选全选、搜索、层级切换、确认和回滚事件。</p><pre>${esc(payload)}</pre></section><section><h3>8. 风险、依赖与限制</h3><p>依赖稳定组织节点、班级、学生、家长及学生家长关系 ID；服务端必须执行组织权限校验并使用与前端一致的有效性和去重规则。</p></section><section><h3>9. 验收标准</h3><p>四端动态部门、教育局动态工作组、逐人选满保持半选、范围转人员、搜索、去重、成员变更后的资格与统计、PC 双栏布局、学校三态全选、移动家长层级、事务回滚及 V4 兼容均符合本规则。</p></section></article>`;
  }

  function installContract(rerender = false) {
    captureContract();
    if (!contractCaptured) return;
    ensureState();

    recipientOverviewTabs = recipientTabsV18;
    recipientTabMeta = recipientMetaV18;
    recipientPickerBody = recipientPickerBodyV18;
    recipientModuleMarkupV2 = recipientModuleMarkupV18;
    renderPcRecipientPickerModal = renderPcRecipientPickerModalV18;
    mobileRecipientFooter = mobileRecipientFooterV18;
    mobileCategoryPickerPage = mobileCategoryPickerPageV18;
    mobileRecipientsPage = mobileRecipientsPageV18;
    objectStep = currentObjectStepV18;

    const baseBegin = base.beginRecipientPicker;
    beginRecipientPicker = function (category, mode) {
      baseBegin(category, mode);
      const local = ensureState();
      if (category === 'department') activeDepartmentId();
      if (category === 'workgroup' && !recipientWorkgroupById(state.recipientWorkgroupId)) state.recipientWorkgroupId = recipientAllWorkgroupLeaves()[0]?.id || '';
      if (category === 'parent' && !orgNodeById(local.activeParentNodeId)) local.activeParentNodeId = 'class-primary-1-1';
      if (category === 'class' && !orgNodeById(local.activeClassNodeId)) local.activeClassNodeId = 'grade-junior-7';
    };

    normalizeRecipientMap = function (input) { return migrateSelectionMap(base.normalizeRecipientMap(input)); };
    recipientResolvedSelection = function (input, category = '') {
      const items = input instanceof Map ? [...input.entries()] : (Array.isArray(input) ? input.map((item, index) => [String(index), item]) : []);
      const relationEntries = items.filter(([, item]) => itemCategory(item) === 'parent' && relationId(item));
      if (!relationEntries.length || (category && category !== 'parent')) return base.recipientResolvedSelection(input, category);
      const remaining = input instanceof Map
        ? new Map(items.filter(([, item]) => !(itemCategory(item) === 'parent' && relationId(item))))
        : items.filter(([, item]) => !(itemCategory(item) === 'parent' && relationId(item))).map(([, item]) => item);
      const resolved = base.recipientResolvedSelection(remaining, category);
      const people = new Map(resolved.people || []);
      relationEntries.forEach(([, item]) => {
        if (item.requiresReselection) return;
        const id = relationId(item);
        people.set(id, {...item, id, personId: id, recipientIdentityType: 'guardian_relation'});
      });
      return {...resolved, people, personIds: new Set(people.keys()), total: people.size + Number(resolved.rangeTotal || 0)};
    };
    selectedRecipientSnapshot = function () {
      const snapshot = base.selectedRecipientSnapshot();
      const replaceCategories = new Set(['parent', 'class']);
      const kept = snapshot.filter(item => !replaceCategories.has(itemCategory(item)));
      const snapshotAt = typeof responseTimestamp === 'function' ? responseTimestamp() : new Date().toISOString();
      const fixed = categoryItems('parent', state.recipients).concat(categoryItems('class', state.recipients)).map(item => ({...cloneValue(item), frozen: true, snapshotAt}));
      return [...kept, ...fixed];
    };
    draftPayload = function (existing = null) {
      const value = base.draftPayload(existing);
      return {...value, recipientSelectionSchemaVersion: V18_SCHEMA_VERSION,
        recipientSelectionSummary: Object.fromEntries(recipientOverviewTabs().map(([category]) => [category, selectionSummary(category, state.recipients)])),
        recipientSnapshot: selectedRecipientSnapshot()};
    };
    surveyTemplateValue = function (existing) {
      return base.surveyTemplateValue(existing);
    };
    draftRecipientSnapshot = function (source) {
      const stored = Array.isArray(source?.recipientSelections) && source.recipientSelections.length
        ? source.recipientSelections.map(entry => Array.isArray(entry) ? entry[1] : entry)
        : null;
      const rows = stored || base.draftRecipientSnapshot(source);
      return Number(source?.recipientSelectionSchemaVersion || 0) >= V18_SCHEMA_VERSION ? [...migrateSelectionMap(new Map((rows || []).map((item, index) => [item?._selectionKey || `${itemCategory(item)}:${item?.relationId || item?.classId || item?.personId || item?.id || index}`, item]))).values()] : rows;
    };
    loadEditableSurveyState = function (survey) {
      base.loadEditableSurveyState(survey);
      state.recipients = normalizeRecipientMap(state.recipients);
    };
    loadSurveyTemplateState = function (item, editing = false) {
      base.loadSurveyTemplateState(item, editing);
      state.recipients = normalizeRecipientMap(state.recipients);
    };
    recipientSelectionError = function () {
      const error = base.recipientSelectionError();
      return String(error || '').replaceAll(['内部', '部门'].join(''), '部门');
    };
    surveyHasResolvedRecipientObjects = function (survey) {
      return base.surveyHasResolvedRecipientObjects(survey) || (typeof surveyRecipientItems === 'function' && surveyRecipientItems(survey).some(item => itemCategory(item) === 'parent' && relationId(item)));
    };
    syncSurveyRecipientAssignments = function (survey, date) {
      const rows = base.syncSurveyRecipientAssignments(survey, date);
      const relations = new Map((typeof surveyRecipientItems === 'function' ? surveyRecipientItems(survey) : [])
        .filter(item => itemCategory(item) === 'parent' && relationId(item)).map(item => [relationId(item), item]));
      rows.forEach(row => {
        const relation = relations.get(row.personId);
        if (!relation) return;
        Object.assign(row, {
          recipientIdentityType: 'guardian_relation', relationId: relation.relationId,
          studentId: relation.studentId, guardianId: relation.guardianId,
          guardianName: relation.guardianName, relationName: relation.relationName,
          taskKey: guardianTaskKey(survey.id, relation.relationId, row.collectionDate || ''),
        });
      });
      return rows;
    };
    bindRecipientPickerControls = function (root = $('#view')) {
      base.bindRecipientPickerControls(root);
      bindV18Controls(root);
    };
    renderRecipientPickerPrd = renderRecipientPickerPrdV18;
    installPrdRules();

    state.recipients = normalizeRecipientMap(state.recipients);
    if (typeof refreshRecipientContractState === 'function') refreshRecipientContractState();
    if (typeof document !== 'undefined' && document.documentElement?.dataset) {
      document.documentElement.dataset.recipientSelectorV18 = 'ready';
      document.documentElement.dataset.recipientSelectionSchema = String(V18_SCHEMA_VERSION);
      document.documentElement.dataset.recipientScopeContract = 'v18-selection-objects';
    }
    if (rerender && state.portal && typeof renderShell === 'function') renderShell();
  }

  const api = {
    version: V18_SCHEMA_VERSION,
    release: '1.8',
    schemaVersion: V18_SCHEMA_VERSION,
    directory: V18_GUARDIAN_DIRECTORY,
    guardianDirectory: V18_GUARDIAN_DIRECTORY,
    summary: selectionSummary,
    selectionSummary,
    selectionSummaryText,
    guardianTaskKey,
    filteredSchools: () => typeof filteredBureauSchools === 'function' ? filteredBureauSchools() : [],
    filteredGuardianRelations,
    migrateSelectionMap,
    markup: {
      department: mobile => mobile ? base.recipientPickerBody?.('department', true) || '' : departmentPickerV18(),
      workgroup: mobile => mobile ? base.recipientPickerBody?.('workgroup', true) || '' : workgroupPickerV18(),
      school: schoolPickerV18,
      parent: parentPickerV18,
      class: mobile => mobile ? base.recipientPickerBody?.('class', true) || '' : classPickerV18(),
      body: recipientPickerBodyV18,
      overviewModule: recipientModuleMarkupV18,
      mobilePage: mobileCategoryPickerPageV18,
    },
    selection: {
      setGuardianRelation,
      setStudentGuardians,
      guardianState,
      setFilteredSchools,
      schoolFilteredState,
      setClass,
      setSearch(value) { if (typeof state !== 'undefined') state.recipientPickerSearch = String(value || '').slice(0, 50); },
      setParentPath(nodeId) { if (orgNodeById(nodeId)) ensureState().activeParentNodeId = nodeId; return ensureState()?.activeParentNodeId || ''; },
    },
    hooks: {install: installContract, ensureState},
  };
  rootGlobal.RECIPIENT_SELECTOR_V18_API = api;
  rootGlobal.__recipientSelectorV18TestApi = api;

  if (typeof state !== 'undefined') installContract(false);
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => installContract(true));
    if (document.readyState && document.readyState !== 'loading') installContract(true);
  }
})();

/* Latest questionnaire-management, inline-editor and statistics contract.
 * This file is loaded after app.js and the recipient compatibility layers, so
 * these user-confirmed rules remain authoritative even when older releases
 * restore their own function references during DOMContentLoaded. */
(() => {
  'use strict';

  const RELEASE = 'v19-latest-requirements';
  const TIPS = Object.freeze({
    submitted: '仅统计内部接收人员的有效提交人数，不包含外部人员提交。',
    pending: '仅统计内部接收人员中尚未提交的人数，不包含外部人员。',
    external: '统计外部人员通过微信扫描二维码提交的有效问卷份数。',
    rate: '完成率 = 已提交 ÷（已提交 + 未提交），不计算外部提交数。',
  });
  const captured = {
    ready: false,
    statsSnapshot: null,
    bindQuestionEditor: null,
  };

  function captureBase() {
    if (captured.ready || typeof state === 'undefined') return;
    captured.statsSnapshot = typeof statsSnapshot === 'function' ? statsSnapshot : null;
    captured.bindQuestionEditor = typeof bindQuestionEditor === 'function' ? bindQuestionEditor : null;
    captured.ready = true;
  }

  function latestStatsSnapshot(survey) {
    const raw = captured.statsSnapshot ? captured.statsSnapshot(survey) : {};
    const total = Math.max(0, Number(raw.total ?? survey?.total ?? 0));
    const internalDone = Math.max(0, Number(raw.internalDone ?? internalSubmittedCount(survey) ?? 0));
    const externalDone = Math.max(0, Number(raw.externalDone ?? externalSubmittedCount(survey) ?? 0));
    const submitted = internalDone + externalDone;
    return {
      ...raw,
      total,
      internalDone,
      externalDone,
      submitted,
      pending: total > 0 ? Math.max(0, total - internalDone) : null,
      rate: total > 0 ? Math.round(internalDone / total * 100) : null,
      hasExternal: Boolean(raw.hasExternal || survey?.allowExternal || externalDone > 0),
    };
  }

  function latestLoadTemplateContent(item, editing = false) {
    resetCreationState();
    state.editingSurveyTemplateId = editing ? item.id : null;
    state.draftTitle = item.title || '';
    state.draftDescription = item.description || '';
    state.draftSurveyTypeId = validSurveyTypeId(item.surveyTypeId) ? String(item.surveyTypeId) : '';
    state.questions = cloneQuestions(item.questions || []);
  }

  function latestTemplateValue(existing) {
    const selectedType = surveyTypeById(state.draftSurveyTypeId);
    const value = {
      id: existing?.id || `${state.portal}-survey-custom-${Date.now()}`,
      title: state.draftTitle.trim(),
      description: state.draftDescription.trim(),
      summary: state.questions.map(question => question.title.trim()).filter(Boolean).slice(0, 4).join('、') || '暂无题目',
      surveyTypeId: selectedType?.id || '',
      questions: cloneQuestions(state.questions),
      creator: existing?.creator || currentUserName(),
      createdAt: existing?.createdAt || formatSystemTime(),
      source: existing?.source || 'custom',
    };
    if (Number.isFinite(existing?.demoRank)) value.demoRank = existing.demoRank;
    return value;
  }

  function latestStatsPage() {
    const rows = statsSurveys();
    const page = paginateItems('stats', rows);
    const mobile = state.preview === 'mobile';
    const cards = page.items.length ? page.items.map(survey => {
      const snapshot = latestStatsSnapshot(survey);
      const available = hasStatsTask(survey);
      const trackable = snapshot.total > 0;
      const submitted = available
        ? `<button data-detail-kind="submitted" data-survey-id="${survey.id}"><strong>${snapshot.submitted}</strong><span>已提交 ${infoTip(TIPS.submitted, '已提交')}</span></button>`
        : '<div class="stats-metric untrackable"><strong>—</strong><span>暂无任务</span></div>';
      const pending = available && trackable
        ? `<button class="pending" data-detail-kind="pending" data-survey-id="${survey.id}"><strong>${snapshot.pending}</strong><span>未提交 ${infoTip(TIPS.pending, '未提交')}</span></button>`
        : `<div class="stats-metric pending untrackable"><strong>—</strong><span>${available ? `未提交 ${infoTip(TIPS.pending, '未提交')}` : '暂无任务'}</span></div>`;
      const rate = available && trackable
        ? `<div class="stats-metric rate" data-stats-static><strong>${snapshot.rate}%</strong><span>完成率 ${infoTip(TIPS.rate, '完成率')}</span></div>`
        : `<div class="stats-metric rate untrackable" data-stats-static><strong>—</strong><span>${available ? `完成率 ${infoTip(TIPS.rate, '完成率')}` : '暂无任务'}</span></div>`;
      return `<article class="stats-survey-card ${available ? '' : 'is-unavailable'}" ${available ? `data-stats-open="${survey.id}" tabindex="0"` : 'aria-disabled="true"'}><div><h3>${esc(survey.title)}</h3><p><span class="tag ${survey.status}">${survey.statusText}</span> · ${available ? `创建于${survey.createdAt.slice(5, 10).replace('-', '月')}日` : '暂无可统计任务日期'}</p></div><div class="stats-card-numbers">${submitted}${pending}${rate}</div></article>`;
    }).join('') : '<div class="mobile-unavailable"><b>暂无统计数据</b><span>我发布的未开始及已有提交问卷将在此展示</span></div>';
    return `${statsMobileHead('教育问卷调研', '#mobile/fill')}${mobileTabs('stats')}${pageHead(state.portal === 'school' ? '校内统计' : '区域统计', mobile ? '查看问卷提交进度、填写明细与题目数据。' : '查看问卷提交进度、收集明细与题目数据。')}<div class="stats-list">${cards}</div>${paginationComponent('stats', page.totalPages, page.page, page.total)}<div class="stats-list-end">共 ${page.total} 份问卷</div>`;
  }

  function latestStatsSummaryCards(survey, snapshot, mobile = state.preview === 'mobile') {
    const submittedTip = infoTip(TIPS.submitted, '已提交');
    const pendingTip = infoTip(TIPS.pending, '未提交');
    const rateTip = infoTip(TIPS.rate, '完成率');
    const trackable = snapshot.total > 0;
    if (mobile) {
      const submitted = `<button class="submitted" data-detail-kind="submitted" data-survey-id="${survey.id}"><strong>${snapshot.submitted}</strong><span>已提交 ${submittedTip}</span><em>查看内部明细</em></button>`;
      const pending = trackable ? `<button class="pending" data-detail-kind="pending" data-survey-id="${survey.id}"><strong>${snapshot.pending}</strong><span>未提交 ${pendingTip}</span><em>查看明细</em></button>` : `<div class="pending stats-metric untrackable"><strong>—</strong><span>未提交 ${pendingTip}</span><em>外部人员无法统计</em></div>`;
      const rate = trackable ? `<div class="rate stats-summary-rate"><strong>${snapshot.rate}%</strong><span>完成率 ${rateTip}</span><em>全部有效提交 / 内部应提交</em></div>` : `<div class="rate stats-summary-rate untrackable"><strong>—</strong><span>完成率 ${rateTip}</span><em>外部人员无法统计</em></div>`;
      return `<div class="stats-summary-grid">${submitted}${pending}${rate}</div>`;
    }
    const submitted = `<button class="submitted" data-detail-kind="submitted" data-survey-id="${survey.id}"><span>已提交 ${submittedTip}</span><strong>${snapshot.submitted}</strong><em>查看内部人员提交明细 →</em></button>`;
    const pending = trackable ? `<button class="pending" data-detail-kind="pending" data-survey-id="${survey.id}"><span>未提交 ${pendingTip}</span><strong>${snapshot.pending}</strong><em>查看未提交明细 →</em></button>` : `<div class="pending stats-metric untrackable"><span>未提交 ${pendingTip}</span><strong>—</strong><em>外部人员无法统计</em></div>`;
    const rate = trackable ? `<div class="rate"><span>完成率 ${rateTip}</span><strong>${snapshot.rate}%</strong><em>全部有效提交 / 内部应提交</em></div>` : `<div class="rate untrackable"><span>完成率 ${rateTip}</span><strong>—</strong><em>外部人员无法统计</em></div>`;
    return `<div class="pc-summary-grid">${submitted}${pending}${rate}</div>`;
  }

  function latestStatsPeoplePage(kind) {
    const survey = statsSurvey();
    if (!survey) return statsUnavailablePage();
    const snapshot = latestStatsSnapshot(survey);
    const submitted = kind === 'submitted';
    const date = isDailySurvey(survey) ? snapshot.date : '';
    const unidentified = !submitted && surveySubmittedPersonState(survey, date, snapshot.internalDone).anonymousCount > 0;
    const trackable = snapshot.hasData && (submitted || snapshot.total > 0);
    const count = submitted ? snapshot.internalDone : trackable ? snapshot.pending : null;
    const rows = trackable ? statsPeopleData(kind, survey) : [];
    const school = state.portal === 'school';
    const back = `#stats/detail/${survey.id}`;
    const pendingHead = school ? '部门/班级' : '部门/学校';
    const listHead = `<div class="people-list-head ${submitted ? '' : 'pending'}"><b>姓名</b><b>${submitted ? (school ? '班级/部门' : '学校') : pendingHead}</b><b>手机号</b></div>`;
    const listRows = rows.length ? rows.map(person => `<div class="people-row ${submitted ? '' : 'pending'}" data-scope-type="${person.scopeType}"><span><b>${esc(person.name)}</b></span><span>${esc(person.scope)}</span><span>${esc(person.mobile)}</span></div>`).join('') : `<div class="pending-empty"><b>${trackable ? (submitted ? '暂无内部人员提交记录' : unidentified ? '未提交名单不可识别' : '暂无未提交人员') : '暂无可查看明细'}</b><span>${trackable ? (submitted ? '当前日期没有可识别的内部人员提交记录。' : unidentified ? '历史提交缺少人员标识，无法生成准确的未提交名单。' : '当前所有可识别接收人员均已提交。') : '当前没有可统计的任务数据。'}</span></div>`;
    const externalNotice = submitted && snapshot.externalDone > 0 ? `<div class="external-detail-notice">外部提交已单独统计，不计入已提交和完成率，且不支持查看人员明细。当前共 ${snapshot.externalDone} 份外部提交。</div>` : '';
    const download = trackable && rows.length ? `<button class="stats-download" data-action="download-stats" data-stats-kind="${kind}">下载${submitted ? '已提交' : '未提交'}明细</button>` : '';
    const content = `${externalNotice}<section class="people-overview"><div class="people-donut ${trackable ? '' : 'untrackable'}"><span>${submitted ? '内部人员' : '全部'}<b>${count === null ? '—' : count}</b></span></div></section><section class="people-list ${submitted ? '' : 'pending-people-list'}">${listHead}${listRows}${download}</section>`;
    if (state.preview === 'mobile') return `${statsMobileHead('填写明细', back)}${content}`;
    return `<div class="pc-stats-page pc-people-page"><div class="pc-stats-breadcrumb"><a class="pc-back-btn" href="${back}">← 返回问卷统计</a><span>收集明细</span></div><header class="pc-people-header"><div><h1>${submitted ? '已提交' : '未提交'}明细</h1><p>${esc(survey.title)}${snapshot.date ? ` · ${snapshot.date}` : ''}</p></div>${trackable && rows.length ? `<button class="btn primary" data-action="download-stats" data-stats-kind="${kind}">下载${submitted ? '已提交' : '未提交'}明细</button>` : '<span class="subtle">暂无可下载明细</span>'}</header><div class="pc-people-layout">${content}</div></div>`;
  }

  function latestCanDeleteSurvey(survey) {
    return Boolean(survey && survey.deleted !== 1 && survey.owner === currentUserName() && ['draft', 'paused'].includes(survey.status));
  }

  function latestPublishedActions(survey) {
    if (survey.status === 'draft') return '<button class="link-btn" data-action="edit-draft">编辑</button><button class="link-btn danger" data-action="delete-survey">删除</button>';
    const qr = survey.allowExternal === true || survey.channel !== 'internal' ? `<button class="link-btn" data-survey-qr="${survey.id}">二维码</button>` : '';
    if (survey.status === 'not_started') return `<a class="link-btn" href="#all-surveys/${survey.id}" data-survey-detail-source="list">查看</a><button class="link-btn" data-action="edit-survey">编辑</button><button class="link-btn" data-action="view-stats">问卷统计</button>${qr}<button class="link-btn danger" data-action="end">结束</button>`;
    const statusActions = survey.status === 'running' ? '<button class="link-btn" data-action="pause">暂停</button><button class="link-btn danger" data-action="end">结束</button>' : survey.status === 'paused' ? '<button class="link-btn" data-action="resume">恢复</button><button class="link-btn danger" data-action="end">结束</button>' : '';
    const remove = survey.status === 'paused' ? '<button class="link-btn danger" data-action="delete-survey">删除</button>' : '';
    const statistics = hasStatsTask(survey) ? '<button class="link-btn" data-action="view-stats">问卷统计</button>' : '<button class="link-btn" type="button" disabled title="暂无可统计任务日期">问卷统计</button>';
    return `${statistics}${qr}${statusActions}${remove}`;
  }

  function latestStatsSurvey() {
    const id = Number(state.page.split('/')[2]);
    if (id) return CONFIG[state.portal].surveys.find(survey => survey.id === id && survey.deleted !== 1 && survey.status !== 'draft');
    return statsSurveys()[0];
  }

  function latestAllSurveysTable(rows, start = 0) {
    return `<div class="table-wrap"><table class="data-table all-surveys-table"><thead><tr><th class="index-col">序号</th><th>问卷名称</th><th>问卷类型</th><th>发送人数</th><th>提交人数</th><th>问卷状态</th><th>创建人员</th><th>创建时间</th><th>操作</th></tr></thead><tbody>${rows.length ? rows.map((survey, index) => `<tr data-id="${survey.id}" data-title="${esc(survey.title)}" data-owner="${esc(survey.owner)}" data-created-date="${survey.createdAt.slice(0, 10)}" data-status="${survey.status}"><td class="index-col">${start + index + 1}</td><td><div class="title-cell">${esc(survey.title)}</div></td><td>${esc(surveyTypeLabel(survey))}</td><td>${sentCount(survey)}</td><td>${submittedCount(survey)}</td><td><span class="tag ${survey.status}">${survey.statusText}</span></td><td>${esc(survey.owner)}</td><td class="nowrap">${survey.createdAt}</td><td><div class="row-actions"><a class="link-btn" href="#all-surveys/${survey.id}" data-survey-detail-source="all-surveys">查看详情</a>${survey.status === 'draft' ? '' : (survey.status === 'not_started' || hasStatsTask(survey)) ? `<a class="link-btn" href="#stats/detail/${survey.id}" data-stats-source="all-surveys">问卷统计</a>` : '<span class="link-btn disabled" aria-disabled="true" title="暂无可统计任务日期">问卷统计</span>'}</div></td></tr>`).join('') : '<tr><td colspan="9"><div class="empty-state"><b>未找到符合条件的问卷</b><span>请调整筛选条件后重试</span></div></td></tr>'}</tbody></table></div>`;
  }

  function latestStatsActionSheet(survey) {
    const stage = $('.device-stage');
    if (!stage || !survey || survey.deleted === 1 || survey.owner !== currentUserName()) return toast('无权操作该问卷');
    syncSurveyTemporalStatus(survey);
    $('.stats-action-mask', stage)?.remove();
    const mask = document.createElement('div');
    const external = survey.status !== 'draft' && (survey.allowExternal === true || survey.channel !== 'internal');
    const statusActions = survey.status === 'running' ? '<button type="button" data-sheet-action="pause">暂停</button><button type="button" class="danger" data-sheet-action="end">结束</button>' : survey.status === 'paused' ? '<button type="button" data-sheet-action="resume">恢复</button><button type="button" class="danger" data-sheet-action="end">结束</button>' : survey.status === 'not_started' ? '<button type="button" class="danger" data-sheet-action="end">结束</button>' : '';
    const remove = survey.status === 'paused' && latestCanDeleteSurvey(survey) ? '<button type="button" class="danger" data-sheet-action="delete">删除</button>' : '';
    mask.className = 'stats-action-mask';
    mask.innerHTML = `<section class="stats-action-sheet" role="dialog" aria-modal="true" aria-label="问卷操作"><header><h3>更多操作</h3><button type="button" class="stats-action-close" aria-label="关闭">×</button></header><div class="stats-action-list">${external ? '<button type="button" data-sheet-action="qr">二维码</button>' : ''}${statusActions}${remove}</div><button type="button" class="stats-action-cancel">取消</button></section>`;
    stage.appendChild(mask);
    const close = () => mask.remove();
    $('.stats-action-close', mask).onclick = close;
    $('.stats-action-cancel', mask).onclick = close;
    mask.onclick = event => { if (event.target === mask) close(); };
    $$('[data-sheet-action]', mask).forEach(button => button.onclick = () => {
      const action = button.dataset.sheetAction;
      close();
      if (survey.deleted === 1 || survey.owner !== currentUserName()) return toast('问卷状态或权限已变化');
      syncSurveyTemporalStatus(survey);
      if (action === 'qr') return openSurveyQr(survey);
      if (action === 'pause' || action === 'resume') {
        const resumed = temporalStatusForDates(survey.startDate, survey.endDate);
        const next = action === 'pause' ? ['暂停问卷？', 'paused', '已暂停'] : ['恢复问卷？', resumed, SURVEY_STATUS_TEXT[resumed]];
        return modal(next[0], `操作后将立即更新“${esc(survey.title)}”的问卷状态。`, '确认', () => { if (survey.deleted === 1 || survey.owner !== currentUserName()) return toast('问卷状态或权限已变化'); survey.status = next[1]; survey.statusText = next[2]; renderShell(); toast('状态已更新'); }, 'stats-confirm-mask');
      }
      if (action === 'end') return modal('提前结束问卷？', `结束后“${esc(survey.title)}”将无法继续提交。`, '确认结束', () => { if (survey.deleted === 1 || survey.owner !== currentUserName()) return toast('问卷状态或权限已变化'); survey.status = 'ended'; survey.statusText = '已结束'; renderShell(); toast('状态已更新'); }, 'stats-confirm-mask');
      if (action !== 'delete' || survey.status !== 'paused' || !latestCanDeleteSurvey(survey)) return;
      modal('删除问卷？', `删除“${esc(survey.title)}”后，该问卷将从我的问卷、问卷管理和统计列表中移除。`, '确认删除', () => { syncSurveyTemporalStatus(survey); if (survey.status !== 'paused' || !latestCanDeleteSurvey(survey)) return toast('问卷状态或权限已变化，无法删除'); survey.deleted = 1; state.page = 'stats'; location.hash = 'stats'; renderShell(); toast('问卷已删除'); }, 'stats-confirm-mask');
    });
  }

  function installLatestPrd() {
    if (typeof PRD_FIELD_GROUPS === 'undefined') return;
    PRD_FIELD_GROUPS.surveyDetail = [
      ['问卷标题/类型/状态', '只读；已删除、不属于当前组织或动态 ID 非法时展示不可用空态。', 's.title / surveyTypeLabel(s) / s.status'],
      ['创建与收集信息', '展示创建人、创建时间和填写周期；详情不展示数据范围字段。', 's.owner / s.createdAt / s.time'],
      ['接收人员', '完整展示发布时选择的人员姓名或范围名称；外部填写追加“外部人员”，按稳定 ID 去重并自动换行。', 'surveyRecipientDisplayNames(s) / surveyRecipientItems(s) / s.target'],
      ['已提交', '仅统计内部接收人员的有效提交人数，不包含外部人员提交。', 'statsSnapshot(s).internalDone'],
      ['未提交', 'max(0，应提交内部人数 - 内部有效提交数)；不计外部人员；无内部应提交人数时为“—”。', 'statsSnapshot(s).pending'],
      ['外部提交数', '统计外部人员通过微信扫描二维码提交的有效问卷份数，不提供人员明细。', 'statsSnapshot(s).externalDone'],
      ['完成率', '已提交 ÷（已提交 + 未提交），四舍五入且不计算外部提交数；无内部应提交人数时为“—”。', 'statsSnapshot(s).rate'],
      ['题目列表', '优先读取问卷保存的题目结构，并完整保留题型专属配置。', 'surveyQuestions(s) / cloneQuestions()'],
      ['答卷明细', '已提交与未提交明细仅展示可识别的内部人员；外部答卷单独统计，不提供人员明细，但继续参与题目答案统计。', 'statsPeopleData("submitted", s) / allSurveyResponsePage()'],
    ];
    PRD_FIELD_GROUPS.createEditor = [
      ['编辑布局', 'PC 为左侧题库与中间题目编辑区两栏；删除右侧题目设置模块及“应用修改”。移动端直接展示完整题目卡片。', 'editorStep() / mobileCreatePage()'],
      ['题目数量', '单份问卷 1～100 题；达到 100 题后禁止继续添加。', 'state.questions.length / canAddQuestion()'],
      ['题目标题', '在原题目卡片内直接输入；必填，1～200 个字符，实时写入草稿状态。', 'state.questions[].title / data-q-title'],
      ['题目类型', '题型仅在新增题目时确定；加入问卷后以只读文本展示，不支持修改。复制题目保留原题型。', 'state.questions[].type / questionCard()'],
      ['选择题选项', '单选、多选为 2～20 个非空选项；单项不超过 50 字，支持新增、修改、删除和拖动排序。', 'state.questions[].options / questionOptionsEditor()'],
      ['必答及专属设置', '卡片内直接设置必答；文件/图片支持仅图片，日期支持时分，位置支持详情地址。', 'required / imageOnly / includeTime / detailedAddress'],
      ['题目操作', '“…”菜单提供上移、下移、复制、删除；删除二次确认；拖拽柄支持调整题目顺序。', 'data-q-action / data-question-drag'],
      ['题库添加', 'PC 点击题库追加到末尾，拖入题目区可插入首位、题目之间或末尾；移动端通过添加问题弹层新增。', 'questionToolbox() / questionDropZone() / mobileQuestionSheet()'],
      ['统一校验', '下一步、保存草稿、保存模板和发布前定位并高亮首个错误题目。', 'firstQuestionError() / showQuestionError()'],
    ];
    PRD_FIELD_GROUPS.stats = [
      ['统计任务', '普通问卷展示累计统计；每日问卷使用按日快照，并在标题右侧展示统计日期。', 'statsSnapshot(s) / statsDateControl(s)'],
      ['默认日期', '每日问卷默认昨天；无昨日任务时回退到最近一个不晚于昨日的已生成任务日。', 'selectedStatsDate(s) / availableStatsDates(s)'],
      ['已提交', '仅统计内部接收人员的有效提交人数，不包含外部人员提交。', 'statsSnapshot(s).internalDone'],
      ['未提交', '仅统计内部接收人员中尚未提交的人数，不包含外部人员；纯外部问卷显示“—”。', 'statsSnapshot(s).pending'],
      ['外部提交数', '统计外部人员通过微信扫描二维码提交的有效问卷份数，不可点击且不提供人员明细。', 'statsSnapshot(s).externalDone'],
      ['完成率', '已提交 ÷（已提交 + 未提交），四舍五入且不计算外部提交数；纯外部问卷显示“—”。', 'statsSnapshot(s).rate'],
      ['四卡片布局', '统计详情展示已提交、未提交、外部提交数、完成率；PC 为四列，移动端为 2×2。纯外部问卷依次显示 0、“—”、N、“—”。', 'statsSummaryCards()'],
      ['提示说明', '四项指标使用指定提示文案，明确已提交、未提交和完成率均不计算外部提交数。', 'infoTip()'],
      ['标题区域', '“数据统计”和“题目数据”标题下方不展示解释性文字；每日问卷日期控件在移动端换行适配。', 'statsDetailPage()'],
      ['人员明细', '已提交与未提交明细及下载仅包含内部人员；外部答卷继续参与题目答案统计。', 'statsPeoplePage() / statsPeopleData()'],
      ['日期联动', '切换日期联动四项指标、人员明细、下载和全部题目统计，并按问卷记忆当前日期。', 'state.statsDateBySurvey / data-stats-date'],
      ['无任务日期', '没有可统计任务日时展示整块空态，禁用统计明细入口。', 'snapshot.hasData'],
    ];
    PRD_FIELD_GROUPS.statsPeople = [
      ['已提交明细', '统计卡片与明细页均仅统计内部接收人员的有效提交人数。', 'statsPeopleData("submitted")'],
      ['外部提交提示', '存在外部提交时显示单独统计、不计入已提交和完成率、且不支持查看人员明细的指定提示。', 'external-detail-notice'],
      ['未提交明细', '仅来自内部应提交范围；纯外部问卷不可进入明细。', 'statsPeopleData("pending")'],
      ['每日统计', '人员列表和下载沿用统计详情当前选中日期。', 'statsSnapshot(s).date / state.statsDateBySurvey'],
      ['越权防护', '外部答卷、已失效答卷、已删除问卷及其他组织数据不得通过详情路由访问。', 'allSurveyResponsePage()'],
    ];
    PRD_FIELD_GROUPS.mobileCreate = [
      ['基础信息', '标题与问卷类型必填，填写描述选填。', 'state.draftTitle / state.draftSurveyTypeId / state.draftDescription'],
      ['题目编辑', '完整题目卡片内编辑标题、选项、必答与题型专属配置；题型创建后仅展示且不可修改。', 'questionCard()'],
      ['新增题目', '底部“添加问题”打开题型选择层；选择后追加题目。', 'mobileQuestionSheet()'],
      ['题目排序', '使用题目拖拽柄调整顺序，输入框、开关和菜单操作不得误触拖动。', 'data-question-drag'],
      ['下一步校验', '标题、类型及全部题目校验通过后进入接收人员。', 'mobile-next-settings / firstQuestionError()'],
    ];

    if (typeof PRD_V16_PROFILES !== 'undefined') {
      Object.assign(PRD_V16_PROFILES.editor, {
        inScope: '双栏设计器、完整题目卡片、题型创建后只读、题库添加、题目与选项排序、必答和专属设置、复制删除及统一校验。',
        features: [
          ['编辑布局', '卡片内联编辑', '移除右侧题目设置模块；标题、选项、必答和题型专属设置在原题目卡片中完成，题型只读展示。', 'P0', '普通问卷 PC 与移动端同结构；模板维护仅 PC'],
          ['题型只读', '创建时确定', '题型在新增题目或使用常用问题时确定，加入问卷后仅展示；如需更换须删除原题并重新添加。', 'P0', '复制题目保留原题型'],
          ['题目添加', '点击与拖放', 'PC 题库点击追加，拖入可指定插入位置；移动端通过添加问题层新增。', 'P0', '最多 100 题'],
          ['结构操作', '排序复制删除', '题目通过拖拽柄排序；“…”菜单提供上移、下移、复制、删除，删除须二次确认。', 'P0', '无效落点不改顺序'],
          ['选择题', '选项编辑', '单选、多选支持 2～20 个非空选项的新增、修改、删除和拖动排序。', 'P0', '单项最多 50 字'],
          ['题型设置', '专属配置', '文件/图片支持仅图片，日期支持时分，位置支持详情地址；缺失字段按 false。', 'P0', '完整克隆与回填'],
          ['统一校验', '首错定位', '下一步、保存草稿、保存模板和发布前执行相同校验并定位首个错误题目。', 'P0', '错误题目高亮'],
        ],
        flow: '从题库点击、拖入或移动端题型选择层新增题目，题型随新增动作确定；加入问卷后直接在卡片内修改标题、选项和设置，并通过拖拽柄或菜单调整结构。',
        exceptions: '题目为空、超过 100 题、标题为空或超长、选择题选项少于 2 项、超过 20 项、选项为空或超长时阻止继续；题型标签点击无响应；拖拽取消或落点无效时保持原顺序。',
        data: '题目保存 id、type、title、required、options、imageOnly、includeTime、detailedAddress。记录 question_add、question_reorder、question_copy、question_delete、question_setting_change、question_validation_failed；【假设】公共属性包含 survey_id、template_id、question_id、question_type、from_index、to_index、timestamp。',
        acceptance: '新增问卷、草稿编辑、未开始编辑和 PC 模板维护均无右侧设置栏；七种题型加入问卷后仅展示且不可修改；复制、模板加载和草稿恢复保留原题型与完整结构；专属设置可回填；题目与选项排序正确；所有保存入口使用同一校验。',
      });
      Object.assign(PRD_V16_PROFILES.stats, {
        inScope: '统计列表、累计与按日快照、已提交、未提交、外部提交数、完成率四项统计卡片、提示图标、内外部口径、明细过滤下载、题目统计和无任务空态。',
        features: [
          ['数据统计', '四项卡片', '详情展示已提交、未提交、外部提交数、完成率；PC 四列，移动端 2×2；纯外部依次显示 0、“—”、N、“—”。', 'P0', '无任务日期时展示整块空态'],
          ['统计口径', '内外部分离', '已提交和未提交仅计算内部接收人员；外部提交数单独计算；完成率仅按内部已提交与未提交计算。', 'P0', '内部应提交为 0 时不计算完成率'],
          ['提示说明', '可访问提示', '四项指标均显示可聚焦提示图标；PC 悬浮或聚焦，移动端点击或聚焦展示指定文案。', 'P0', '文案不得改写'],
          ['每日统计', '日期联动', '默认昨天，无昨日任务回退最近任务日；切换后联动四项指标、明细、下载和题目统计。', 'P0', '未来日期不可选'],
          ['人员明细', '仅内部可见', '已提交与未提交明细和下载仅含内部人员；外部提交单独统计且不支持查看人员明细。', 'P0', '外部明细路由拒绝'],
          ['题目统计', '按题型展示', '全部七种题型使用对应统计视图；标题下方不展示解释性文字。', 'P0', '无任务显示空态'],
        ],
        flow: '从统计列表或问卷管理进入统计详情；普通问卷加载累计快照，每日问卷确定默认日期。用户切换日期或题目后刷新同一快照下全部数据；进入人员明细时仅加载内部人员记录。',
        exceptions: '没有可统计任务日时整块展示空态并禁用明细；应提交内部人数为零时未提交和完成率均为“—”；外部提交不得生成可访问人员详情；混合旧数据无法拆分时按内部提交兼容。',
        data: '已提交=internalDone；未提交=max(0,total-internalDone)；外部提交数=externalDone；完成率=round(internalDone÷(internalDone+pending)×100%)，内部基数为 0 时映射为“—”。每日日期状态按 surveyId 保存。记录 stats_date_change、stats_detail_open、stats_people_open、stats_download、stats_tip_open；【假设】公共属性包含 survey_id、stats_date、internal_done、external_done、submitted、internal_total、rate、timestamp。',
        risks: '正式环境须保证指标、明细、下载和题目聚合来自同一统计快照；外部人员无稳定身份时不得提供明细；业务时区和任务生成日必须统一。',
        acceptance: '纯内部、混合和纯外部问卷的四项统计与计算正确；纯外部显示 0、—、N、—；混合问卷的已提交和完成率不包含外部提交；四项提示文案完全一致；外部提交不出现在明细和下载；每日默认日期、回退和整页联动正确。',
      });
    }

    if (typeof PRD_PAGE_FIELD_GROUPS !== 'undefined' && typeof PRD_PAGE_RULES !== 'undefined') {
      Object.entries(PRD_PAGE_FIELD_GROUPS).forEach(([key, groups]) => {
        if (PRD_PAGE_RULES[key]) PRD_PAGE_RULES[key].fields = prdFields(...groups);
      });
      if (PRD_PAGE_RULES['all-surveys-detail']) PRD_PAGE_RULES['all-surveys-detail'].fields = PRD_FIELD_GROUPS.surveyDetail.filter(row => !['已提交', '未提交', '外部提交数', '完成率'].includes(row[0]));
    }
  }

  function installLatestRequirements(rerender = false) {
    captureBase();
    if (!captured.ready) return;
    canDeleteSurvey = latestCanDeleteSurvey;
    publishedActions = latestPublishedActions;
    statsSurvey = latestStatsSurvey;
    allSurveysTable = latestAllSurveysTable;
    openStatsActionSheet = latestStatsActionSheet;
    if (document.documentElement?.dataset) document.documentElement.dataset.latestRequirements = RELEASE;
    if (rerender && state.portal && typeof renderShell === 'function') renderShell();
  }

  if (typeof state !== 'undefined') installLatestRequirements(false);
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => installLatestRequirements(true));
    window.addEventListener('load', () => installLatestRequirements(true));
    if (document.readyState && document.readyState !== 'loading') installLatestRequirements(true);
    if (typeof window.setTimeout === 'function') window.setTimeout(() => installLatestRequirements(false), 0);
  }
})();

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const storage = new Map();
const appElement = {
  dataset: { portal: 'bureau', prototypeVersion: '1.6' },
  innerHTML: '',
  classList: { add() {}, remove() {}, toggle() {} },
};
const documentStub = {
  addEventListener() {},
  querySelector(selector) { return selector === '#app' ? appElement : null; },
  querySelectorAll() { return []; },
  createElement() { return { style: {}, click() {}, appendChild() {}, remove() {} }; },
  body: { appendChild() {} },
  documentElement: {
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {} },
  },
  title: '',
};
const locationStub = {
  href: 'http://127.0.0.1/bureau.html',
  origin: 'http://127.0.0.1',
  pathname: '/bureau.html',
  hash: '#list',
  replace(value) { this.hash = value; },
};
const windowStub = {
  addEventListener() {},
  removeEventListener() {},
  matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
  innerWidth: 1440,
};
const context = {
  console,
  document: documentStub,
  location: locationStub,
  window: windowStub,
  localStorage: {
    getItem(key) { return storage.get(key) || null; },
    setItem(key, value) { storage.set(key, String(value)); },
  },
  sessionStorage: {
    getItem(key) { return storage.get(`session:${key}`) || null; },
    setItem(key, value) { storage.set(`session:${key}`, String(value)); },
    removeItem(key) { storage.delete(`session:${key}`); },
  },
  navigator: {},
  history: { back() {} },
  URL,
  Blob,
  Intl,
  Date,
  Math,
  Map,
  Set,
  Array,
  Object,
  String,
  Number,
  Boolean,
  RegExp,
  JSON,
  setTimeout,
  clearTimeout,
  requestAnimationFrame(callback) { callback(); },
  scrollTo() {},
};
context.globalThis = context;
windowStub.document = documentStub;
windowStub.location = locationStub;
windowStub.localStorage = context.localStorage;
windowStub.sessionStorage = context.sessionStorage;

const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const finalScopeSource = fs.readFileSync(path.join(__dirname, 'recipient-scope-v16.final.js'), 'utf8');
const exposeSource = `
;globalThis.__qa = {
  state, CONFIG, DEPARTMENT_PEOPLE, RECIPIENT_WORKGROUP_TREE_V2,
  resetCreationState, beginRecipientPicker, commitRecipientPicker,
  recipientScopeMembers, recipientScopeDefinitions, recipientScopeSelectionKey,
  recipientSelectionKey, recipientManualScopeKey, recipientCategoryCount,
  recipientDisplayItemsForCategory, recipientPersonPickerState,
  recipientItemCategory, recipientScopeId, recipientResolvedSelection,
  isDynamicRecipientScope, setDraftDynamicScope, setDraftPerson,
  selectedRecipientSnapshot, normalizeCompleteRecipientScopes,
  normalizeRecipientMap, recipientSelectionError, draftPayload,
  loadEditableSurveyState, surveyTemplateValue, loadSurveyTemplateState,
  draftRecipientSnapshot, recipientScopeIsInvalid, bindRecipientOverviewV2,
  discardRecipientPicker, departmentPickerMarkup, recipientCount,
  silenceRender() { renderShell = function () {}; }
};`;
vm.createContext(context);
vm.runInContext(`${appSource}\n${finalScopeSource}\n${exposeSource}`, context, { filename: 'recipient-scope-qa-bundle.js' });
const q = context.__qa;
q.silenceRender();

let passed = 0;
function test(name, callback) {
  try {
    callback();
    passed += 1;
    console.log(`\u2713 ${name}`);
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

function setPortal(portal, device = 'pc') {
  q.state.portal = portal;
  q.state.preview = device;
  q.resetCreationState();
  q.state.portal = portal;
  q.state.preview = device;
}
function scopeByName(category, name) {
  return q.recipientScopeDefinitions(category).find(item => item.name === name);
}
function personByName(category, scopeId, name) {
  return q.recipientScopeMembers(category, scopeId).find(item => item.name === name);
}
function displayNames(category) {
  return q.recipientDisplayItemsForCategory(category).map(item => item.name).sort();
}
function assertNames(category, names, message) {
  assert.equal(displayNames(category).join('|'), [...names].sort().join('|'), message);
}
function scopeKey(category, scope) {
  return q.recipientScopeSelectionKey(category, scope.id);
}
function personKey(category, person) {
  return q.recipientSelectionKey(category, person.personId);
}
function assertDynamicScope(item, category, scope) {
  assert(item, `${scope.name} 范围对象缺失`);
  assert.equal(item.level, 'scope');
  assert.equal(item.scopeType, category);
  assert.equal(item.scopeId, scope.id);
  assert.equal(item.scopeName, scope.name);
  assert.equal(item.name, scope.name);
  assert.equal(item.selectionMode, 'dynamic');
}
function chooseScope(portal, device, category, scopeName) {
  setPortal(portal, device);
  const scope = scopeByName(category, scopeName);
  assert(scope, `${portal}/${device} 缺少 ${scopeName}`);
  q.beginRecipientPicker(category, device);
  q.setDraftDynamicScope(category, scope.id, true);
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey(category, scope)), category, scope);
  q.commitRecipientPicker();
  return scope;
}
function triggerSummaryRemoval(key) {
  const button = { dataset: { removeRecipient: key }, onclick: null };
  const originalQuerySelectorAll = documentStub.querySelectorAll;
  documentStub.querySelectorAll = selector => selector === '[data-remove-recipient]' ? [button] : [];
  try {
    q.bindRecipientOverviewV2();
    assert.equal(typeof button.onclick, 'function', '汇总标签未绑定删除处理');
    button.onclick();
  } finally {
    documentStub.querySelectorAll = originalQuerySelectorAll;
  }
}

test('PC 与移动端完整部门仅回显范围名称，人数按有效人员计算', () => {
  for (const [portal, device, scopeName] of [
    ['bureau', 'pc', '办公室'],
    ['bureau', 'mobile', '办公室'],
    ['school', 'pc', '行政办公室'],
    ['school', 'mobile', '行政办公室'],
  ]) {
    const scope = chooseScope(portal, device, 'department', scopeName);
    assertNames('department', [scope.name]);
    assert.equal(q.recipientCategoryCount('department'), q.recipientScopeMembers('department', scope.id).length);
  }
});

test('PC 与移动端完整工作组仅回显工作组名称', () => {
  for (const device of ['pc', 'mobile']) {
    const scope = chooseScope('bureau', device, 'workgroup', '项目办');
    assertNames('workgroup', ['项目办']);
    assert.equal(q.recipientCategoryCount('workgroup'), q.recipientScopeMembers('workgroup', scope.id).length);
  }
});

test('直接选择部分人员时仅回显人员姓名', () => {
  for (const device of ['pc', 'mobile']) {
    setPortal('bureau', device);
    const office = scopeByName('department', '办公室');
    const wang = personByName('department', office.id, '王明');
    q.beginRecipientPicker('department', device);
    q.setDraftPerson('department', wang, true, office.id);
    assert(!q.state.recipientPickerDraft.has(scopeKey('department', office)), '部分选择不得生成完整范围对象');
    q.commitRecipientPicker();
    assertNames('department', ['王明']);
    assert.equal(q.recipientCategoryCount('department'), 1);
  }
});

test('逐人选满部门后自动归一化为部门范围对象', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  q.beginRecipientPicker('department', 'pc');
  q.recipientScopeMembers('department', office.id).forEach(person => q.setDraftPerson('department', person, true, office.id));
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('department', office)), 'department', office);
  assert(!q.state.recipientPickerDraft.has(personKey('department', personByName('department', office.id, '王明'))));
  assert(!q.state.recipientPickerManualPartialScopes.has(q.recipientManualScopeKey('department', office.id)));
  q.commitRecipientPicker();
  assertNames('department', ['办公室']);
});

test('逐人选满工作组后自动归一化为工作组范围对象', () => {
  for (const device of ['pc', 'mobile']) {
    setPortal('bureau', device);
    const project = scopeByName('workgroup', '项目办');
    q.beginRecipientPicker('workgroup', device);
    q.recipientScopeMembers('workgroup', project.id)
      .forEach(person => q.setDraftPerson('workgroup', person, true, project.id));
    assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('workgroup', project)), 'workgroup', project);
    q.commitRecipientPicker();
    assertNames('workgroup', ['项目办']);
  }
});

test('取消选择器时回滚临时范围及手动拆分状态', () => {
  setPortal('bureau', 'mobile');
  const office = scopeByName('department', '办公室');
  q.beginRecipientPicker('department', 'mobile');
  q.setDraftDynamicScope('department', office.id, true);
  assert(q.state.recipientPickerDraft.has(scopeKey('department', office)));
  q.discardRecipientPicker('cancel', false);
  assert.equal(q.state.recipients.size, 0, '取消后不得提交临时范围');
  assert.equal(q.state.recipientManualPartialScopes.size, 0, '取消后不得污染正式拆分标识');
});

test('一批人员完整覆盖多个部门时回显全部部门名称且人数全局去重', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const information = scopeByName('department', '信息中心');
  q.beginRecipientPicker('department', 'pc');
  q.recipientScopeMembers('department', office.id).forEach(person => q.setDraftPerson('department', person, true, office.id));
  q.recipientScopeMembers('department', information.id)
    .filter(person => person.name !== '王明')
    .forEach(person => q.setDraftPerson('department', person, true, information.id));
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('department', office)), 'department', office);
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('department', information)), 'department', information);
  assert.equal(q.recipientCategoryCount('department', q.state.recipientPickerDraft), 4, '交叉部门人员必须按 personId 去重');
  q.commitRecipientPicker();
  assertNames('department', ['办公室', '信息中心']);
});

test('从完整部门取消一人仅拆分当前范围，其他范围及 other-scope 标识保持', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const information = scopeByName('department', '信息中心');
  const wang = personByName('department', office.id, '王明');
  q.beginRecipientPicker('department', 'pc');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftDynamicScope('department', information.id, true);
  q.setDraftPerson('department', wang, false, office.id);

  assert(!q.state.recipientPickerDraft.has(scopeKey('department', office)), '当前部门应拆为剩余人员');
  assert(q.state.recipientPickerDraft.has(scopeKey('department', information)), '其他完整部门不得被拆分');
  assert(q.state.recipientPickerManualPartialScopes.has(q.recipientManualScopeKey('department', office.id)), '应记录手动拆分状态');
  const pickerState = q.recipientPersonPickerState('department', wang.personId, office.id);
  assert.equal(pickerState.checked, false, '当前部门中的人员应处于未选状态');
  assert.equal(pickerState.coveredByOther, true, '应提示已由其他范围选中');
  assert(q.departmentPickerMarkup().includes('已由其他范围选中'), '选择器 DOM 必须展示其他范围覆盖提示');
  assert.equal(q.recipientCategoryCount('department', q.state.recipientPickerDraft), 4, '其他范围仍覆盖该人员，总人数不得下降');
  const remainingOfficePerson = personByName('department', office.id, '吴敏');
  const remainingItem = q.state.recipientPickerDraft.get(personKey('department', remainingOfficePerson));
  assert(remainingItem.sourceScopeIds.includes(office.id), '拆分后的具体人员必须保留当前部门来源');
  q.commitRecipientPicker();
  assertNames('department', ['信息中心', '吴敏']);
});

test('手动拆分优先，只有补齐当前部门全部成员后恢复部门名称', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const information = scopeByName('department', '信息中心');
  const wang = personByName('department', office.id, '王明');
  q.beginRecipientPicker('department', 'mobile');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftDynamicScope('department', information.id, true);
  q.setDraftPerson('department', wang, false, office.id);
  q.normalizeCompleteRecipientScopes();
  assert(!q.state.recipientPickerDraft.has(scopeKey('department', office)), '其他范围覆盖不得绕过手动拆分状态');
  q.setDraftPerson('department', wang, true, office.id);
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('department', office)), 'department', office);
  assert(q.state.recipientPickerDraft.has(scopeKey('department', information)));
  assert(!q.state.recipientPickerManualPartialScopes.has(q.recipientManualScopeKey('department', office.id)), '补齐后应清除手动拆分状态');
  q.commitRecipientPicker();
  assertNames('department', ['办公室', '信息中心']);
  assert.equal(q.recipientCategoryCount('department'), 4);
});

test('工作组交叉覆盖、当前范围拆分与重新补齐遵循同一规则', () => {
  setPortal('bureau', 'mobile');
  const project = scopeByName('workgroup', '项目办');
  const electric = scopeByName('workgroup', '电教馆');
  const overlap = q.recipientScopeMembers('workgroup', project.id)
    .find(person => q.recipientScopeMembers('workgroup', electric.id).some(other => other.personId === person.personId));
  assert(overlap, '工作组演示数据缺少交叉人员');

  q.beginRecipientPicker('workgroup', 'mobile');
  q.setDraftDynamicScope('workgroup', project.id, true);
  q.setDraftDynamicScope('workgroup', electric.id, true);
  assert.equal(q.recipientCategoryCount('workgroup', q.state.recipientPickerDraft), 4);
  q.setDraftPerson('workgroup', overlap, false, project.id);
  assert(!q.state.recipientPickerDraft.has(scopeKey('workgroup', project)));
  assert(q.state.recipientPickerDraft.has(scopeKey('workgroup', electric)), '取消当前组成员不得拆分其他工作组');
  assert(q.recipientPersonPickerState('workgroup', overlap.personId, project.id).coveredByOther);
  q.setDraftPerson('workgroup', overlap, true, project.id);
  assertDynamicScope(q.state.recipientPickerDraft.get(scopeKey('workgroup', project)), 'workgroup', project);
  assert(!q.state.recipientPickerManualPartialScopes.has(q.recipientManualScopeKey('workgroup', project.id)));
  q.commitRecipientPicker();
  assertNames('workgroup', ['电教馆', '项目办', '体育股'], '同一批人员完整覆盖的其他工作组也应自动归一化并回显');
  assert.equal(q.recipientCategoryCount('workgroup'), 4);
});

test('删除范围标签只删除该范围，删除人员标签不影响其他范围', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const information = scopeByName('department', '信息中心');
  const research = scopeByName('department', '教研室');
  const explicitPerson = personByName('department', research.id, '李静');

  q.beginRecipientPicker('department', 'pc');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftDynamicScope('department', information.id, true);
  q.setDraftPerson('department', explicitPerson, true, '');
  q.commitRecipientPicker();

  triggerSummaryRemoval(scopeKey('department', office));
  assert(!q.state.recipients.has(scopeKey('department', office)));
  assert(q.state.recipients.has(scopeKey('department', information)), '删除办公室不得删除信息中心来源');
  assert(q.state.recipients.has(personKey('department', explicitPerson)), '删除范围不得删除明确人员');
  assert(q.state.recipientManualPartialScopes.has(q.recipientManualScopeKey('department', office.id)), '删除范围后应抑制被交叉覆盖自动恢复');

  triggerSummaryRemoval(personKey('department', explicitPerson));
  assert(!q.state.recipients.has(personKey('department', explicitPerson)));
  assert(q.state.recipients.has(scopeKey('department', information)), '删除明确人员不得删除完整范围');
});

test('停用、不可接收、空范围和越权范围均不形成有效完整范围', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  assert.equal(q.recipientScopeMembers('department', office.id).length, 2, '停用人员不得参与完整范围或人数计算');
  assert(!q.recipientScopeMembers('department', office.id).some(person => person.name === '郑强'));
  const officeDefinition = q.DEPARTMENT_PEOPLE.bureau.find(item => item.id === office.id);
  const activePerson = officeDefinition.children.find(person => person.status === 'active' && person.canReceive === true);
  const originalCanReceive = activePerson.canReceive;
  try {
    delete activePerson.canReceive;
    assert(!q.recipientScopeMembers('department', office.id).some(person => person.personId === activePerson.personId), 'canReceive 缺失不得默认有效');
    activePerson.canReceive = null;
    assert(!q.recipientScopeMembers('department', office.id).some(person => person.personId === activePerson.personId), 'canReceive=null 不得默认有效');
  } finally {
    activePerson.canReceive = originalCanReceive;
  }

  const emptyWorkgroup = q.recipientScopeDefinitions('workgroup')
    .find(item => q.recipientScopeMembers('workgroup', item.id).length === 0);
  assert(emptyWorkgroup, '应存在空工作组演示数据');
  const invalidWorkgroup = {
    id: emptyWorkgroup.id,
    scopeId: emptyWorkgroup.id,
    scopeName: emptyWorkgroup.name,
    name: emptyWorkgroup.name,
    category: 'workgroup',
    scopeType: 'workgroup',
    level: 'scope',
    selectionMode: 'dynamic',
  };
  assert(q.recipientScopeIsInvalid(invalidWorkgroup), '空工作组必须判为失效');
  q.beginRecipientPicker('workgroup', 'pc');
  q.setDraftDynamicScope('workgroup', emptyWorkgroup.id, true);
  assert(!q.state.recipientPickerDraft.has(scopeKey('workgroup', emptyWorkgroup)), '空工作组不可整组选中');

  const unauthorized = { ...invalidWorkgroup, id: 'missing-scope', scopeId: 'missing-scope', scopeName: '越权范围', name: '越权范围' };
  assert(q.recipientScopeIsInvalid(unauthorized), '缺失或越权范围必须判为失效');
  q.state.recipients.set(q.recipientScopeSelectionKey('workgroup', 'missing-scope'), unauthorized);
  windowStub.__recipientEvents = [];
  assert(q.recipientSelectionError().includes('失效'), '缺失或越权范围必须在发布校验中阻断');
  const unauthorizedEvent = windowStub.__recipientEvents.find(event => event.event === 'recipient_scope_invalid');
  assert(unauthorizedEvent, '缺失或越权范围阻断必须记录埋点');
  assert.equal(unauthorizedEvent.scope_type, 'workgroup');
  assert.equal(unauthorizedEvent.scope_id, 'missing-scope');

  q.state.recipients.clear();
  const officeDefinitionForPermission = q.DEPARTMENT_PEOPLE.bureau.find(item => item.id === office.id);
  try {
    officeDefinitionForPermission.authorized = false;
    const unauthorizedDepartment = {
      id: office.id,
      scopeId: office.id,
      scopeName: office.name,
      name: office.name,
      category: 'department',
      scopeType: 'department',
      level: 'scope',
      selectionMode: 'dynamic',
    };
    assert(q.recipientScopeIsInvalid(unauthorizedDepartment), '权限撤销后的现存范围必须判为失效');
  } finally {
    delete officeDefinitionForPermission.authorized;
  }

  setPortal('school');
  const emptyDepartment = q.recipientScopeDefinitions('department')
    .find(item => q.recipientScopeMembers('department', item.id).length === 0);
  assert(emptyDepartment, '学校端应存在零有效成员演示部门');
  const invalidDepartment = {
    id: emptyDepartment.id,
    scopeId: emptyDepartment.id,
    scopeName: emptyDepartment.name,
    name: emptyDepartment.name,
    category: 'department',
    scopeType: 'department',
    level: 'scope',
    selectionMode: 'dynamic',
  };
  assert(q.recipientScopeIsInvalid(invalidDepartment));
  q.state.recipients.set(scopeKey('department', emptyDepartment), invalidDepartment);
  windowStub.__recipientEvents = [];
  assert(q.recipientSelectionError().includes('失效'), '失效范围必须阻止发布');
  const invalidEvent = windowStub.__recipientEvents.find(event => event.event === 'recipient_scope_invalid');
  assert(invalidEvent, '失效范围阻断必须记录 recipient_scope_invalid');
  assert.equal(invalidEvent.scope_type, 'department');
  assert.equal(invalidEvent.scope_id, emptyDepartment.id);
  assert.equal(invalidEvent.resolved_person_count, 0);
});

test('草稿保存范围/人员及手动拆分状态，再次编辑不错误恢复范围名称', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const wang = personByName('department', office.id, '王明');
  const manualKey = q.recipientManualScopeKey('department', office.id);
  q.beginRecipientPicker('department', 'pc');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftPerson('department', wang, false, office.id);
  q.commitRecipientPicker();
  assertNames('department', ['吴敏']);

  const payload = q.draftPayload();
  assert(Array.isArray(payload.recipientSelections) && payload.recipientSelections.length, '草稿必须保存原始选择对象');
  assert(Array.isArray(payload.recipientManualPartialScopes) && payload.recipientManualPartialScopes.includes(manualKey), '草稿必须保存手动拆分标识');
  assert(Array.isArray(payload.recipientSnapshot) && payload.recipientSnapshot.length === 0, '草稿不得提前固化发布快照');

  const fakeDraft = {
    id: 9901,
    status: 'draft',
    title: '手动拆分草稿',
    surveyTypeId: 101,
    questions: [],
    total: 1,
    ...payload,
  };
  q.loadEditableSurveyState(fakeDraft);
  assert(q.state.recipientManualPartialScopes.has(manualKey));
  assertNames('department', ['吴敏'], '草稿恢复时不得被其他覆盖错误合并为办公室');
});

test('模板保存并恢复手动拆分状态，补齐后才恢复范围名称', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const wang = personByName('department', office.id, '王明');
  const manualKey = q.recipientManualScopeKey('department', office.id);
  q.beginRecipientPicker('department', 'mobile');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftPerson('department', wang, false, office.id);
  q.commitRecipientPicker();

  const template = q.surveyTemplateValue(null);
  assert(template.recipientManualPartialScopes.includes(manualKey));
  q.loadSurveyTemplateState(template, false);
  assert(q.state.recipientManualPartialScopes.has(manualKey));
  assertNames('department', ['吴敏']);

  q.beginRecipientPicker('department', 'mobile');
  q.setDraftPerson('department', wang, true, office.id);
  q.commitRecipientPicker();
  assertNames('department', ['办公室']);
  assert(!q.state.recipientManualPartialScopes.has(manualKey));
});

test('规范化持久化数据时保留动态范围对象，不得提前展开为人员', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const item = {
    id: office.id,
    scopeId: office.id,
    scopeName: office.name,
    name: office.name,
    category: 'department',
    level: 'scope',
    scopeType: 'department',
    selectionMode: 'dynamic',
    count: 2,
  };
  const normalized = q.normalizeRecipientMap(new Map([[scopeKey('department', office), item]]));
  assertDynamicScope(normalized.get(scopeKey('department', office)), 'department', office);
  assert.equal([...normalized.values()].filter(value => value.level === 'person').length, 0);
});

test('发布确认按最新有效成员解析、全局去重并固化不可变人员快照', () => {
  setPortal('bureau');
  const office = scopeByName('department', '办公室');
  const information = scopeByName('department', '信息中心');
  q.beginRecipientPicker('department', 'pc');
  q.setDraftDynamicScope('department', office.id, true);
  q.setDraftDynamicScope('department', information.id, true);
  q.commitRecipientPicker();

  const selectedDepartmentPersonIds = q.recipientResolvedSelection(q.state.recipients, 'department').personIds;
  const overlappingWorkgroup = q.recipientScopeDefinitions('workgroup')
    .find(scope => q.recipientScopeMembers('workgroup', scope.id)
      .some(person => selectedDepartmentPersonIds.has(person.personId)));
  assert(overlappingWorkgroup, '演示数据必须存在与部门重叠的工作组');
  q.beginRecipientPicker('workgroup', 'pc');
  q.setDraftDynamicScope('workgroup', overlappingWorkgroup.id, true);
  q.commitRecipientPicker();

  const coveredAfterScopes = q.recipientResolvedSelection(q.state.recipients).personIds;
  const explicitCandidate = q.recipientScopeDefinitions('department')
    .map(scope => ({ scope, members: q.recipientScopeMembers('department', scope.id).filter(person => !coveredAfterScopes.has(person.personId)) }))
    .find(entry => entry.members.length >= 2);
  assert(explicitCandidate, '演示数据必须存在可单独选择且不会补满范围的人员');
  q.beginRecipientPicker('department', 'pc');
  q.setDraftPerson('department', explicitCandidate.members[0], true, explicitCandidate.scope.id);
  q.commitRecipientPicker();
  assert(q.state.recipients.has(personKey('department', explicitCandidate.members[0])), '混合发布前必须保留显式人员对象');

  const officeDefinition = q.DEPARTMENT_PEOPLE.bureau.find(item => item.id === office.id);
  const originalChildren = officeDefinition.children.map(person => ({ ...person }));
  const newcomer = {
    personId: 'bureau-person-snapshot-new',
    name: '快照新增人员',
    departmentId: office.id,
    departmentName: office.name,
    position: '测试岗',
    status: 'active',
    canReceive: true,
  };

  try {
    officeDefinition.children.push(newcomer);
    let snapshot = q.selectedRecipientSnapshot();
    let people = snapshot.filter(item => item.level === 'person' || item.personId);
    assert.equal(snapshot.filter(item => item.level === 'scope').length, 0, '发布快照不得保留动态范围对象');
    assert(people.some(item => item.personId === newcomer.personId), '发布确认必须解析发布时最新有效成员');
    assert(people.some(item => item.personId === explicitCandidate.members[0].personId), '发布快照必须包含显式人员');
    assert.equal(new Set(people.map(item => item.personId)).size, people.length, '多个范围发布人员必须按 personId 全局去重');
    const crossSourcePerson = people.find(item => item.sourceScopeIds?.includes(overlappingWorkgroup.id)
      && (item.sourceScopeIds.includes(office.id) || item.sourceScopeIds.includes(information.id)));
    assert(crossSourcePerson, '部门与工作组重叠人员必须合并为一条并保留多个范围来源');
    people.forEach(item => {
      assert.equal(item.selectionMode, 'snapshot', '发布人员必须标识快照模式');
      assert.equal(item.frozen, true, '发布人员必须标识为冻结快照');
      assert.equal(typeof item.snapshotAt, 'string');
      assert(item.snapshotAt.length > 0, '发布快照时间不能为空');
    });

    newcomer.status = 'inactive';
    assert(!q.selectedRecipientSnapshot().some(item => item.personId === newcomer.personId), '发布前停用人员必须从最新快照排除');
    newcomer.status = 'active';
    newcomer.canReceive = false;
    assert(!q.selectedRecipientSnapshot().some(item => item.personId === newcomer.personId), '发布前取消接收权限的人员必须排除');
    delete newcomer.canReceive;
    assert(!q.selectedRecipientSnapshot().some(item => item.personId === newcomer.personId), '发布前 canReceive 缺失的人员必须排除');
    newcomer.canReceive = true;
    officeDefinition.children.splice(officeDefinition.children.indexOf(newcomer), 1);
    assert(!q.selectedRecipientSnapshot().some(item => item.personId === newcomer.personId), '发布前移出范围的人员必须排除');
    officeDefinition.children.push(newcomer);
    snapshot = q.selectedRecipientSnapshot();
    people = snapshot.filter(item => item.level === 'person' || item.personId);
    assert(people.some(item => item.personId === newcomer.personId), '重新成为有效成员后必须进入发布快照');

    const publishedSnapshot = JSON.parse(JSON.stringify(snapshot));
    const publishedBeforeOrgChange = JSON.stringify(publishedSnapshot);
    officeDefinition.children.splice(0, officeDefinition.children.length, {
      ...newcomer,
      personId: 'bureau-person-after-publish',
      name: '发布后调入人员',
    });
    const stored = q.draftRecipientSnapshot({ id: 9902, status: 'running', recipientSnapshot: publishedSnapshot });
    assert.equal(JSON.stringify(stored), publishedBeforeOrgChange, '发布后组织变化不得回写已固化快照');
    assert(!stored.some(item => item.personId === 'bureau-person-after-publish'));
  } finally {
    officeDefinition.children.splice(0, officeDefinition.children.length, ...originalChildren);
  }
});

console.log(`recipient scope QA passed (${passed} cases)`);

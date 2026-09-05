const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const storage = new Map();
const appElement = { dataset: { portal: 'bureau', prototypeVersion: '1.6' }, innerHTML: '', classList: { add() {}, remove() {}, toggle() {} } };
const documentStub = {
  addEventListener() {},
  querySelector(selector) { return selector === '#app' ? appElement : null; },
  querySelectorAll() { return []; },
  createElement() { return { style: {}, click() {}, appendChild() {}, remove() {} }; },
  body: { appendChild() {} },
  documentElement: { classList: { add() {}, remove() {}, toggle() {} } },
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

const source = fs.readFileSync('app.js', 'utf8') + `\n;globalThis.__qa={
  state, CONFIG, DEPARTMENT_PEOPLE, RECIPIENT_WORKGROUP_TREE_V2,
  resetCreationState, beginRecipientPicker, commitRecipientPicker,
  recipientScopeMembers, recipientScopeDefinitions, recipientScopeSelectionKey,
  recipientSelectionKey, recipientManualScopeKey, recipientCategoryCount,
  recipientDisplayItemsForCategory, recipientPersonPickerState,
  setDraftDynamicScope, setDraftPerson, selectedRecipientSnapshot,
  normalizeCompleteRecipientScopes, recipientSelectionError,
  draftPayload, loadEditableSurveyState, surveyTemplateValue, loadSurveyTemplateState,
  recipientScopeIsInvalid
};`;
vm.createContext(context);
vm.runInContext(source, context, { filename: 'app.js' });
const q = context.__qa;

function setPortal(portal) {
  q.state.portal = portal;
  q.state.preview = 'pc';
  q.resetCreationState();
}
function scopeByName(category, name) {
  return q.recipientScopeDefinitions(category).find((item) => item.name === name);
}
function personByName(category, scopeId, name) {
  return q.recipientScopeMembers(category, scopeId).find((item) => item.name === name);
}
function displayNames(category) {
  return q.recipientDisplayItemsForCategory(category).map((item) => item.name);
}

setPortal('bureau');
const office = scopeByName('department', '办公室');
const information = scopeByName('department', '信息中心');
assert(office && information, '教育局演示部门缺失');
assert.equal(q.recipientScopeMembers('department', office.id).length, 2, '停用人员不得计入办公室');

q.beginRecipientPicker('department', 'pc');
q.setDraftDynamicScope('department', office.id, true);
q.commitRecipientPicker();
assert.deepEqual(displayNames('department'), ['办公室']);
assert.equal(q.recipientCategoryCount('department'), 2);

q.beginRecipientPicker('department', 'pc');
q.setDraftDynamicScope('department', information.id, true);
q.commitRecipientPicker();
assert(displayNames('department').includes('办公室'));
assert(displayNames('department').includes('信息中心'));
assert.equal(q.recipientCategoryCount('department'), 4, '交叉部门人数必须去重');

q.beginRecipientPicker('department', 'pc');
const wang = personByName('department', office.id, '王明');
q.setDraftPerson('department', wang, false, office.id);
assert(q.state.recipientPickerManualPartialScopes.has(q.recipientManualScopeKey('department', office.id)));
assert(q.state.recipientPickerDraft.has(q.recipientScopeSelectionKey('department', information.id)), '其他完整范围不得拆分');
assert(q.recipientPersonPickerState('department', wang.personId, office.id).coveredByOther, '应标识其他范围覆盖');
q.commitRecipientPicker();
assert(displayNames('department').includes('吴敏'));
assert(displayNames('department').includes('信息中心'));
assert(!displayNames('department').includes('办公室'));
assert.equal(q.recipientCategoryCount('department'), 4);

q.beginRecipientPicker('department', 'pc');
q.setDraftPerson('department', wang, true, office.id);
q.commitRecipientPicker();
assert(displayNames('department').includes('办公室'), '补齐后应恢复部门名称');
assert(displayNames('department').includes('信息中心'));

setPortal('bureau');
q.beginRecipientPicker('department', 'pc');
for (const person of q.recipientScopeMembers('department', office.id)) q.setDraftPerson('department', person, true, office.id);
assert(q.state.recipientPickerDraft.has(q.recipientScopeSelectionKey('department', office.id)), '逐人选满应自动归一化');
q.commitRecipientPicker();
assert.deepEqual(displayNames('department'), ['办公室']);

const project = scopeByName('workgroup', '项目办');
const electric = scopeByName('workgroup', '电教馆');
assert(project && electric, '教育局演示工作组缺失');
q.beginRecipientPicker('workgroup', 'pc');
q.setDraftDynamicScope('workgroup', project.id, true);
q.setDraftDynamicScope('workgroup', electric.id, true);
const projectMembers = q.recipientScopeMembers('workgroup', project.id);
const overlap = projectMembers.find((person) => q.recipientScopeMembers('workgroup', electric.id).some((other) => other.personId === person.personId));
assert(overlap, '工作组演示数据缺少交叉人员');
q.setDraftPerson('workgroup', overlap, false, project.id);
assert(q.state.recipientPickerDraft.has(q.recipientScopeSelectionKey('workgroup', electric.id)), '取消当前工作组成员不得拆分其他工作组');
assert(q.recipientPersonPickerState('workgroup', overlap.personId, project.id).coveredByOther);
q.setDraftPerson('workgroup', overlap, true, project.id);
assert(q.state.recipientPickerDraft.has(q.recipientScopeSelectionKey('workgroup', project.id)), '重新补齐后应恢复工作组范围');
q.commitRecipientPicker();
assert(displayNames('workgroup').includes('项目办'));
assert(displayNames('workgroup').includes('电教馆'));

const draft = q.draftPayload();
assert(draft.recipientSelections.length > 0, '草稿必须保存原始选择');
assert.equal(draft.recipientSnapshot.length, 0, '草稿不得提前固化发布快照');
const fakeDraft = { id: 9901, status: 'draft', title: '范围草稿', surveyTypeId: 101, questions: [], total: q.recipientCategoryCount('workgroup'), ...draft };
q.loadEditableSurveyState(fakeDraft);
assert(displayNames('workgroup').includes('项目办'), '草稿再次编辑应恢复工作组范围');

const template = q.surveyTemplateValue(null);
q.loadSurveyTemplateState(template, false);
assert(displayNames('workgroup').includes('项目办'), '模板再次编辑应恢复工作组范围');
const snapshot = q.selectedRecipientSnapshot();
assert(snapshot.every((item) => item.level !== 'scope'), '发布快照不得保留动态范围');
assert.equal(new Set(snapshot.filter((item) => item.personId).map((item) => item.personId)).size, snapshot.filter((item) => item.personId).length, '发布快照人员必须去重');

setPortal('school');
const emptyDepartment = q.recipientScopeDefinitions('department').find((item) => q.recipientScopeMembers('department', item.id).length === 0);
assert(emptyDepartment, '学校端应存在零有效成员演示部门');
const invalidScope = { id: emptyDepartment.id, scopeId: emptyDepartment.id, name: emptyDepartment.name, category: 'department', scopeType: 'department', level: 'scope', selectionMode: 'dynamic' };
assert(q.recipientScopeIsInvalid(invalidScope), '零有效成员范围必须判为失效');
q.state.recipients.set(q.recipientScopeSelectionKey('department', emptyDepartment.id), invalidScope);
assert(q.recipientSelectionError().includes('失效'), '失效范围必须阻止发布');

console.log('recipient scope QA passed');

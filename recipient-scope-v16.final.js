/* Recipient scope V1.6 compatibility checks.
 * Business selection, frozen snapshot and embedded PRD behavior live in app.js.
 */
(() => {
  'use strict';

  const recipientPageKeys = ['create-recipients', 'template-recipients', 'mobile-recipients', 'mobile-settings'];
  const cloneRows = rows => (rows || []).map(row => [...row]);
  const captured = typeof RECIPIENT_V16_APPROVED_CONTRACT === 'undefined' ? null : RECIPIENT_V16_APPROVED_CONTRACT;
  const approvedContract = {
    recipientDeepClone: captured?.recipientDeepClone || recipientDeepClone,
    isDynamicRecipientScope: captured?.isDynamicRecipientScope || isDynamicRecipientScope,
    recipientDirectoryPerson: captured?.recipientDirectoryPerson || recipientDirectoryPerson,
    recipientScopeMembers: captured?.recipientScopeMembers || recipientScopeMembers,
    recipientScopeIsInvalid: captured?.recipientScopeIsInvalid || recipientScopeIsInvalid,
    normalizeRecipientMap: captured?.normalizeRecipientMap || normalizeRecipientMap,
    recipientResolvedSelection: captured?.recipientResolvedSelection || recipientResolvedSelection,
    recipientSelectionContract: captured?.recipientSelectionContract || recipientSelectionContract,
    setDraftDynamicScope: captured?.setDraftDynamicScope || setDraftDynamicScope,
    setDraftPerson: captured?.setDraftPerson || setDraftPerson,
    recipientPersonSelectedInScope: captured?.recipientPersonSelectedInScope || recipientPersonSelectedInScope,
    recipientPersonCovered: captured?.recipientPersonCovered || recipientPersonCovered,
    recipientPersonPickerState: captured?.recipientPersonPickerState || recipientPersonPickerState,
    recipientScopeState: captured?.recipientScopeState || recipientScopeState,
    recipientCategoryCount: captured?.recipientCategoryCount || recipientCategoryCount,
    recipientCount: captured?.recipientCount || recipientCount,
    selectedRecipientSnapshot: captured?.selectedRecipientSnapshot || selectedRecipientSnapshot,
    bindRecipientPickerControls: captured?.bindRecipientPickerControls || bindRecipientPickerControls,
    draftPayload: captured?.draftPayload || draftPayload,
    surveyTemplateValue: captured?.surveyTemplateValue || surveyTemplateValue,
    draftRecipientSnapshot: captured?.draftRecipientSnapshot || draftRecipientSnapshot,
    recipientSelectionError: captured?.recipientSelectionError || recipientSelectionError,
    loadEditableSurveyState: captured?.loadEditableSurveyState || loadEditableSurveyState,
    surveyRecipientItems: captured?.surveyRecipientItems || surveyRecipientItems,
    recipientAssignmentTotal: captured?.recipientAssignmentTotal || recipientAssignmentTotal,
    statsSnapshot: captured?.statsSnapshot || statsSnapshot,
    statsPeopleData: captured?.statsPeopleData || statsPeopleData,
    surveyRecipientResolution: captured?.surveyRecipientResolution || surveyRecipientResolution,
    surveyAllowsCurrentPerson: captured?.surveyAllowsCurrentPerson || surveyAllowsCurrentPerson,
    canCreateResponse: captured?.canCreateResponse || canCreateResponse,
    renderRecipientPickerPrd: captured?.renderRecipientPickerPrd || renderRecipientPickerPrd,
    recipientFields: cloneRows(captured?.recipientFields || PRD_FIELD_GROUPS.recipients),
    pickerFields: cloneRows(captured?.pickerFields || PRD_FIELD_GROUPS.recipientPicker),
    pageRules: Object.fromEntries(recipientPageKeys.map(key => [key, {
      goal: captured?.pageRules?.[key]?.goal || PRD_PAGE_RULES[key]?.goal || '',
      fields: cloneRows(captured?.pageRules?.[key]?.fields || PRD_PAGE_RULES[key]?.fields),
    }])),
    overlayRule: {
      ...(captured?.overlayRule || PRD_OVERLAY_RULES['recipient-picker'] || {}),
      fields: cloneRows(captured?.overlayRule?.fields || PRD_OVERLAY_RULES['recipient-picker']?.fields),
    },
  };

  const approvedDirectoryPerson = approvedContract.recipientDirectoryPerson;
  approvedContract.recipientDirectoryPerson = function (personId) {
    const person = approvedDirectoryPerson(personId);
    return person?.status === 'active' && person?.canReceive === true ? person : null;
  };
  const approvedScopeMembers = approvedContract.recipientScopeMembers;
  approvedContract.recipientScopeMembers = function (category, scopeId) {
    return approvedScopeMembers(category, scopeId)
      .filter(person => person?.status === 'active' && person?.canReceive === true);
  };

  const baseRecipientDirectoryPerson = recipientDirectoryPerson;
  recipientDirectoryPerson = function (personId) {
    const person = baseRecipientDirectoryPerson(personId);
    return person?.status === 'active' && person?.canReceive === true ? person : null;
  };

  const baseRecipientScopeMembers = recipientScopeMembers;
  recipientScopeMembers = function (category, scopeId) {
    return baseRecipientScopeMembers(category, scopeId)
      .filter(person => person?.status === 'active' && person?.canReceive === true);
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

  function restoreApprovedContract() {
    recipientDeepClone = approvedContract.recipientDeepClone;
    isDynamicRecipientScope = approvedContract.isDynamicRecipientScope;
    recipientDirectoryPerson = approvedContract.recipientDirectoryPerson;
    recipientScopeMembers = approvedContract.recipientScopeMembers;
    recipientScopeIsInvalid = approvedContract.recipientScopeIsInvalid;
    normalizeRecipientMap = approvedContract.normalizeRecipientMap;
    recipientResolvedSelection = approvedContract.recipientResolvedSelection;
    recipientSelectionContract = approvedContract.recipientSelectionContract;
    setDraftDynamicScope = approvedContract.setDraftDynamicScope;
    setDraftPerson = approvedContract.setDraftPerson;
    recipientPersonSelectedInScope = approvedContract.recipientPersonSelectedInScope;
    recipientPersonCovered = approvedContract.recipientPersonCovered;
    recipientPersonPickerState = approvedContract.recipientPersonPickerState;
    selectedRecipientSnapshot = approvedContract.selectedRecipientSnapshot;
    recipientScopeState = approvedContract.recipientScopeState;
    recipientCategoryCount = approvedContract.recipientCategoryCount;
    recipientCount = approvedContract.recipientCount;
    bindRecipientPickerControls = approvedContract.bindRecipientPickerControls;
    draftPayload = approvedContract.draftPayload;
    surveyTemplateValue = approvedContract.surveyTemplateValue;
    draftRecipientSnapshot = approvedContract.draftRecipientSnapshot;
    recipientSelectionError = approvedContract.recipientSelectionError;
    loadEditableSurveyState = approvedContract.loadEditableSurveyState;
    surveyRecipientItems = approvedContract.surveyRecipientItems;
    recipientAssignmentTotal = approvedContract.recipientAssignmentTotal;
    statsSnapshot = approvedContract.statsSnapshot;
    statsPeopleData = approvedContract.statsPeopleData;
    surveyRecipientResolution = approvedContract.surveyRecipientResolution;
    surveyAllowsCurrentPerson = approvedContract.surveyAllowsCurrentPerson;
    canCreateResponse = approvedContract.canCreateResponse;
    renderRecipientPickerPrd = approvedContract.renderRecipientPickerPrd;
    PRD_FIELD_GROUPS.recipients = cloneRows(approvedContract.recipientFields);
    PRD_FIELD_GROUPS.recipientPicker = cloneRows(approvedContract.pickerFields);
    recipientPageKeys.forEach(key => {
      if (!PRD_PAGE_RULES[key]) return;
      PRD_PAGE_RULES[key].goal = approvedContract.pageRules[key].goal;
      PRD_PAGE_RULES[key].fields = cloneRows(approvedContract.pageRules[key].fields);
    });
    PRD_OVERLAY_RULES['recipient-picker'] = {
      ...approvedContract.overlayRule,
      fields: cloneRows(approvedContract.overlayRule.fields),
    };
    if (document.documentElement?.dataset) {
      document.documentElement.dataset.recipientScopeContract = 'v16-frozen-snapshot';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const requiresRefresh = document.documentElement?.dataset?.recipientScopeV17 === 'ready';
    restoreApprovedContract();
    if (requiresRefresh && state.portal) renderShell();
  });

  if (document.documentElement?.dataset) {
    document.documentElement.dataset.recipientScopeCompat = 'v16';
    document.documentElement.dataset.recipientScopeCaptured = approvedContract.selectedRecipientSnapshot.toString().includes("selectionMode:'snapshot'") ? 'frozen' : 'dynamic';
  }
})();

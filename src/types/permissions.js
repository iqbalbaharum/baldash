// Only Module accesses are being checked, as per SK's requirements.
export default Object.freeze({
  MODULE_ALL: 'SKAllPermissions',

  MODULE_USER_MANAGEMENT: 'SKModuleUserManagement',
  USER_ADD: 'SKAddUser',
  USER_EDIT: 'SKEditUser',
  USER_DELETE: 'SKDeleteUser',
  USER_ASSIGN_SCOPE: 'SKAssignUserScope',
  USER_ASSIGN_ROLE: 'SKAssignUserRole',

  MODULE_BRANCH_MANAGEMENT: 'SKModuleBranchManagement',
  BRANCH_ADD: 'SKAddBranch',
  BRANCH_EDIT: 'SKEditBranch',
  BRANCH_DELETE: 'SKDeleteBranch',

  MODULE_ITEM_LIST: 'SKModuleItemList',
  ITEM_LIST_IMPORT: 'SKImportItemList',
  ITEM_LIST_DOWNLOAD: 'SKDownloadItemList',
  ITEM_LIST_VIEW_HISTORY: 'SKViewItemListHistory',

  MODULE_ONLINE_LEADS: 'SKModuleOnlineLeads',
  ONLINE_LEADS_QUALIFY: 'SKQualifyOnlineLeads',
  ONLINE_LEADS_DISQUALIFY: 'SKDisqualifyOnlineLeads',

  MODULE_QUALIFIED_LEADS: 'SKModuleQualifiedLeads',
  QUALIFIED_LEADS_TO_DESIGN: 'SKSendQualifiedLeadsToDesign', // Select
  QUALIFIED_LEADS_ASSIGN: 'SKAssignQualifiedLeads',
  QUALIFIED_LEADS_ADD: 'SKAddQualifiedLeads', // Walk in
  QUALIFIED_LEADS_REQUALIFY: 'SKRequalifyQualifiedLeads',
  QUALIFIED_LEADS_DISQUALIFY: 'SKDisqualifyQualifiedLeads',

  MODULE_DESIGN_PROPOSAL: 'SKModuleDesignProposal',
  DESIGN_OPEN_EXTERNAL: 'SKOpenExternalDesignCad',

  MODULE_ORDER_CONFIRMATION: 'SKModuleOrderPermission',

  MODULE_SERVICE_REPORT: 'SKModuleServiceReport',
})

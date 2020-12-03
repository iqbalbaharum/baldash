// Only Module accesses are being checked, as per SK's requirements.
export default Object.freeze({
  MODULE_ALL: { name: 'SKAllPermissions', description: 'All Modules' },

  MODULE_USER_MANAGEMENT: { name: 'SKModuleUserManagement', description: 'User Management Module' },
  USER_ADD: { name: 'SKAddUser' },
  USER_EDIT: { name: 'SKEditUser' },
  USER_DELETE: { name: 'SKDeleteUser' },
  USER_ASSIGN_SCOPE: { name: 'SKAssignUserScope' },
  USER_ASSIGN_ROLE: { name: 'SKAssignUserRole' },

  MODULE_BRANCH_MANAGEMENT: { name: 'SKModuleBranchManagement' },
  BRANCH_ADD: { name: 'SKAddBranch' },
  BRANCH_EDIT: { name: 'SKEditBranch' },
  BRANCH_DELETE: { name: 'SKDeleteBranch' },

  MODULE_ITEM_LIST: { name: 'SKModuleItemList' },
  ITEM_LIST_IMPORT: { name: 'SKImportItemList' },
  ITEM_LIST_DOWNLOAD: { name: 'SKDownloadItemList' },
  ITEM_LIST_VIEW_HISTORY: { name: 'SKViewItemListHistory' },

  MODULE_ONLINE_LEADS: { name: 'SKModuleOnlineLeads' },
  ONLINE_LEADS_QUALIFY: { name: 'SKQualifyOnlineLeads' },
  ONLINE_LEADS_DISQUALIFY: { name: 'SKDisqualifyOnlineLeads' },

  MODULE_QUALIFIED_LEADS: { name: 'SKModuleQualifiedLeads' },
  QUALIFIED_LEADS_TO_DESIGN: { name: 'SKSendQualifiedLeadsToDesign' }, // Select
  QUALIFIED_LEADS_ASSIGN: { name: 'SKAssignQualifiedLeads' },
  QUALIFIED_LEADS_ADD: { name: 'SKAddQualifiedLeads' }, // Walk in
  QUALIFIED_LEADS_REQUALIFY: { name: 'SKRequalifyQualifiedLeads' },
  QUALIFIED_LEADS_DISQUALIFY: { name: 'SKDisqualifyQualifiedLeads' },

  MODULE_DESIGN_PROPOSAL: { name: 'SKModuleDesignProposal' },
  DESIGN_OPEN_EXTERNAL: { name: 'SKOpenExternalDesignCad' },

  MODULE_ORDER_CONFIRMATION: { name: 'SKModuleOrderPermission' },

  MODULE_SERVICE_REPORT: { name: 'SKModuleServiceReport' },
})

import Permissions from './permissions'

const PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS = [
  Permissions.MODULE_USER_MANAGEMENT,
  Permissions.MODULE_BRANCH_MANAGEMENT,
  Permissions.MODULE_ITEM_LIST,
  Permissions.MODULE_QUALIFIED_LEADS,
  Permissions.MODULE_DESIGN_PROPOSAL,
  Permissions.MODULE_ORDER_CONFIRMATION,
  Permissions.MODULE_SERVICE_REPORT,
]

export default Object.freeze({
  sysadmin: [Permissions.MODULE_ALL],
  callcenter: [Permissions.MODULE_ALL],
  marketing: [Permissions.MODULE_ALL],
  salesconsultant: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
  branchmanager: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
  hQManager: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
  hQsalessupport: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
  hQAccountant: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
  branchManager: [...PERMISSIONS_ALL_EXCEPT_ONLINE_LEADS],
})

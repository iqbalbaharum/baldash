import Permissions from './permissions'

const PERMISSIONS_ALL_MODULE_EXCEPT_ONLINE_LEADS = [
  Permissions.MODULE_QUALIFIED_LEADS,
  Permissions.MODULE_DESIGN_PROPOSAL,
  Permissions.MODULE_ORDER_CONFIRMATION,
  Permissions.MODULE_SERVICE_REPORT,
]

const PERMISSIONS_ALL_MODULE = Object.values(Permissions).filter(p => p.includes('Module'))

export default Object.freeze({
  sysadmin: [...PERMISSIONS_ALL_MODULE],
  callcenter: [...PERMISSIONS_ALL_MODULE],
  marketing: [...PERMISSIONS_ALL_MODULE],
  hQManager: [...PERMISSIONS_ALL_MODULE],
  hQsalessupport: [...PERMISSIONS_ALL_MODULE],
  hQAccountant: [...PERMISSIONS_ALL_MODULE],

  salesconsultant: [
    ...PERMISSIONS_ALL_MODULE_EXCEPT_ONLINE_LEADS,
  ],
  branchManager: [
    ...PERMISSIONS_ALL_MODULE_EXCEPT_ONLINE_LEADS,
  ],
})

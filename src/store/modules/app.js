import Permissions from '../types/permissions'

const app = {
  state: {
    menus: [
      {
        name: 'usermanagement',
        permissions: [Permissions.MODULE_USER_MANAGEMENT],
        label: 'SK Management',
        request: {
          get: 'GetAllUsers',
          delete: 'DeleteUser'
        },
        default_datatab_title: 'Users',
        config: {
          selectiontype: 'multiple'
        },
        buttons: [
          {
            category: 'User',
            tos: [
              {
                name: 'adduser',
                permissions: [Permissions.USER_ADD],
                icon: 'fas fa-user-plus',
                label: 'Add User',
                disabled: false
              },
              {
                name: 'edituser',
                permissions: [Permissions.USER_EDIT],
                icon: 'fas fa-edit',
                label: 'View/Edit',
                disabled: false
              },
              {
                name: 'delete',
                permissions: [Permissions.USER_DELETE],
                icon: 'fas fa-trash-alt',
                label: 'Delete',
                disabled: false
              },
            ]
          },
          {
            category: 'Access',
            tos: [
              {
                name: 'assignuserscope',
                permissions: [Permissions.USER_ASSIGN_SCOPE],
                icon: 'fas fa-user-tag',
                label: 'Scope',
                disabled: false
              },
              {
                name: 'userassignrole',
                permissions: [Permissions.USER_ASSIGN_ROLE],
                icon: 'fas fa-user-tag',
                label: 'Assign Role',
                disabled: false
              },
            ]
          },
          {
            category: 'Filter',
            tos: [
              {
                name: 'filterbyrole',
                icon: 'fas fa-filter',
                label: 'By Role',
                disabled: false
              },
              {
                name: 'filterbybranch',
                icon: 'fas fa-filter',
                label: 'By Branch',
                disabled: false
              },
              {
                name: 'customfilter',
                icon: 'fas fa-filter',
                label: 'Filter',
                disabled: false
              }
            ]
          }
        ]
      },
      {
        name: 'branch',
        permissions: [Permissions.MODULE_BRANCH_MANAGEMENT],
        label: 'Branch',
        request: {
          get: 'GetAllBranches',
          delete: 'DeleteBranch'
        },
        default_datatab_title: 'Branches',
        config: {
          selectiontype: 'multiple'
        },
        buttons: [
          {
            category: 'Management',
            tos: [
              {
                name: 'addbranch',
                permissions: [Permissions.BRANCH_ADD],
                icon: 'fas fa-user-plus',
                label: 'Add Branch',
                disabled: false
              },
              {
                name: 'editbranch',
                permissions: [Permissions.BRANCH_EDIT],
                icon: 'fas fa-edit',
                label: 'View/Edit',
                disabled: false
              },
              {
                name: 'delete',
                permissions: [Permissions.BRANCH_DELETE],
                icon: 'fas fa-trash-alt',
                label: 'Delete',
                disabled: false
              },
            ]
          },
        ]
      },
      {
        name: 'item',
        permissions: [Permissions.MODULE_ITEM_LIST],
        label: 'Item List',
        request: {
          get: 'GetAllItems',
          delete: 'DeleteBranch'
        },
        default_datatab_title: 'Item List',
        config: {
          selectiontype: 'multiple'
        },
        buttons: [
          {
            category: 'Template',
            tos: [
              {
                name: 'importitemlist',
                permissions: [Permissions.ITEM_LIST_IMPORT],
                icon: 'fas fa-upload',
                label: 'Import',
                disabled: false,
              },
              {
                name: 'downloadsample',
                permissions: [Permissions.ITEM_LIST_DOWNLOAD],
                icon: 'fas fa-download',
                label: 'Download',
                disabled: false
              },
              {
                name: 'importitemhistory',
                permissions: [Permissions.ITEM_LIST_VIEW_HISTORY],
                icon: 'fas fa-history',
                label: 'Import History',
                disabled: false,
              }
            ]
          },
        ]
      },
      {
        name: 'onlineleads',
        permissions: [Permissions.MODULE_ONLINE_LEADS],
        label: 'Online Leads',
        request: {
          get: 'GetOnlineLeads',
          delete: 'DeleteLead'
        },
        default_datatab_title: 'Online Leads',
        config: {
          selectiontype: 'multiple'
        },
        buttons: [
          {
            category: 'Leads',
            tos: [
              {
                name: 'qualifyOL',
                permissions: [Permissions.ONLINE_LEADS_QUALIFY],
                icon: 'fas fa-user-tag',
                label: 'Assign To',
                disabled: false
              },
              {
                name: 'disqualifyOL',
                permissions: [Permissions.ONLINE_LEADS_DISQUALIFY],
                icon: 'far fa-star',
                label: 'Disqualify',
                disabled: false
              }
            ]
          },
          {
            category: 'Filter',
            tos: [
              {
                name: 'filtercustomer',
                icon: 'fas fa-filter',
                label: 'Filter',
                disabled: false
              },
            ]
          }
        ]
      },
      {
        name: 'qualifiedleads',
        permissions: [Permissions.MODULE_QUALIFIED_LEADS],
        label: 'Qualified Leads',
        request: {
          get: 'GetQualifiedLeads',
          delete: 'DeleteLead'
        },
        default_datatab_title: `Qualified Leads`,
        config: {
          selectiontype: 'single'
        },
        buttons: [
          {
            category: 'Assignment',
            tos: [
              {
                name: 'assigntodesign',
                permissions: [Permissions.QUALIFIED_LEADS_TO_DESIGN],
                icon: 'fas fa-check',
                label: 'Select',
                disabled: false,
              },
              {
                name: 'qualifyQL',
                permissions: [Permissions.QUALIFIED_LEADS_ASSIGN],
                icon: 'fas fa-user-tag',
                label: 'Assign To',
                disabled: false
              },
            ]
          },
          {
            category: 'Leads',
            tos: [
              {
                name: 'walkinlead',
                permissions: [Permissions.QUALIFIED_LEADS_ADD],
                icon: 'fas fa-walking',
                label: 'Walk In',
                disabled: false
              },
              {
                name: 'requalifyqlead',
                permissions: [Permissions.QUALIFIED_LEADS_REQUALIFY],
                icon: 'fas fa-star',
                label: 'Requalify',
                disabled: false
              },
              {
                name: 'disqualify',
                permissions: [Permissions.QUALIFIED_LEADS_DISQUALIFY],
                icon: 'far fa-star',
                label: 'Disqualify',
                disabled: false
              },
            ]
          }
        ]
      },
      {
        name: 'designproposal',
        permissions: [Permissions.MODULE_DESIGN_PROPOSAL],
        label: 'Design Proposal',
        default_data: 'GetAllLeads',
        default_datatab_title: 'DesignCAD',
        config: {
          selectiontype: 'single'
        },
        buttons: [
          {
            category: 'DesignCAD',
            tos: [
              {
                name: 'opendesigncad',
                permissions: [Permissions.DESIGN_OPEN_EXTERNAL],
                icon: 'fas fa-pencil-ruler',
                label: 'Open External',
                disabled: false,
              }
            ]
          },
        ]
      },
      {
        name: 'orderconfirmation',
        permissions: [Permissions.MODULE_ORDER_CONFIRMATION],
        label: 'Order Confirmation',
        config: {
          selectiontype: 'single'
        },
      },
      {
        name: 'servicereport',
        permissions: [Permissions.MODULE_SERVICE_REPORT],
        label: 'Service Report',
        config: {
          selectiontype: 'single'
        },
      },
    ],
    activeMenu: 'usermanagement',
    tableSelection: [],
    dialog: '',
    datatabs: [],
    activeDataTab: 0,
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ACTIVE_MENU: (state, activeMenu) => {
      state.activeMenu = activeMenu
      state.tableSelection = []
    },
    TOGGLE_DIALOG: (state, name) => {
      state.dialog = name
    },
    UPDATE_TAB: (state, tab) => {
      let tabToUpdate = state.datatabs.find(datatab => datatab.name === tab.name)

      if(typeof tabToUpdate !== 'undefined') {
        tabToUpdate.data = tab.data
      }
    },
    SET_ACTIVE_DATATAB: (state, index) => {
			state.activeDataTab = index
    },
    RESET_DATATABS: (state) => {
      state.datatabs = []
    },
		NEW_TAB: (state, tab) => {
			state.datatabs.push(tab)
		},
		CLOSE_TAB: (state, index) => {
			state.datatabs.splice(index , 1)
    },
    SELECT_TABLE_ITEM: (state, selection) => {
      state.tableSelection = selection
    }
  },
  actions: {
    SetMenu({ commit }, menus) {
      commit('SET_MENUS', menus)
    },
    async SetActiveMenu({ commit, dispatch }, activeMenu) {
      commit('SET_ACTIVE_MENU', activeMenu)
      commit('RESET_DATATABS')
      dispatch('GetData')

      // reset datatab index to 0 everytime change tab
      commit('SET_ACTIVE_DATATAB', 0)
    },
    async GetData({ state, dispatch }) {
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      if (menu[0].request.get) {
        await dispatch(menu[0].request.get, menu[0].default_datatab_title)
      }
    },
    async DeleteData({ state, dispatch }, id) {
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      if (menu[0].request.delete) {
        await dispatch(menu[0].request.delete, id)
      }
    },
    OpenDialog({ commit }, dialogName) {
      commit('TOGGLE_DIALOG', dialogName)
    },
    NewTab({ commit }, tab) {
			commit('NEW_TAB', tab)
		},
    UpdateTab({ commit, state }, tab) {
      if(!tab.name) {
        const menu = state.menus.filter(element => element.name === state.activeMenu)
        tab.name = menu[0].default_datatab_title
      }
      commit('UPDATE_TAB', tab)
    },
		CloseTab({ commit }, index) {
			commit('CLOSE_TAB', index)
		},
		SetActiveDataTab({ commit }, index) {
      commit('SET_ACTIVE_DATATAB', index)
      commit('NEW_TAB', [])
    },
    OnTableSelection({ commit }, selection) {
      commit('SELECT_TABLE_ITEM', selection)
    },
    InitializePage({ state, dispatch }) {
      if(state.menus.length > 0) {
        dispatch('SetActiveMenu', state.menus[0].name)
      }
      
    }
  }
}

export default app

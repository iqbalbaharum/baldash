// import User from './../../models/User'

const app = {
  state: {
    menus: [
      {
        name: 'usermanagement',
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
                icon: 'fas fa-user-plus',
                label: 'Add User',
                disabled: false
              },
              {
                name: 'edituser',
                icon: 'fas fa-edit',
                label: 'Edit',
                disabled: false
              },
              {
                name: 'delete',
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
                name: 'assignrole',
                icon: 'fas fa-user-tag',
                label: 'Scope',
                disabled: false
              }
            ]
          },
          {
            category: 'Assign',
            tos: [
              {
                name: 'assignrole',
                icon: 'fas fa-plus',
                label: 'Assign Role',
                disabled: false
              },
              {
                name: 'assignbranch',
                icon: 'fas fa-plus',
                label: 'Assign Branch',
                disabled: false
              }
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
                icon: 'fas fa-user-plus',
                label: 'Add Branch',
                disabled: false
              },
              {
                name: 'editbranch',
                icon: 'fas fa-edit',
                label: 'Edit',
                disabled: false
              },
              {
                name: 'delete',
                icon: 'fas fa-trash-alt',
                label: 'Delete',
                disabled: false
              },
            ]
          },
          {
            category: 'User',
            tos: [
              {
                name: 'adduser',
                icon: 'fas fa-user-plus',
                label: 'Add User',
                disabled: false
              },
            ]
          }
        ]
      },
      {
        name: 'item',
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
                icon: 'fas fa-upload',
                label: 'Import',
                disabled: false,
              },
              {
                name: 'downloadsample',
                icon: 'fas fa-download',
                label: 'Download',
                disabled: false
              },
              {
                name: 'importitemhistory',
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
                name: 'assignlead',
                icon: 'fas fa-user-tag',
                label: 'Assign To',
                disabled: false
              },
              {
                name: 'disqualify',
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
        label: 'Qualified Leads',
        request: {
          get: 'GetQualifiedLeads',
          delete: 'DeleteLead'
        },
        default_datatab_title: 'Qualified Leads',
        config: {
          selectiontype: 'single'
        },
        buttons: [
          {
            category: 'Assignment',
            tos: [
              {
                name: 'assigntodesign',
                icon: 'fas fa-check',
                label: 'Select',
                disabled: false,
              },
            ]
          },
          {
            category: 'Leads',
            tos: [
              {
                name: 'addlead',
                icon: 'fas fa-walking',
                label: 'Walk In',
                disabled: false
              },
              {
                name: 'requalifyqlead',
                icon: 'fas fa-star',
                label: 'Requalify',
                disabled: false
              },
              {
                name: 'disqualify',
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
                name: 'importonlineleads',
                icon: 'fas fa-pencil-ruler',
                label: 'Open',
                disabled: false,
              },
            ]
          },
        ]
      },
      {
        name: 'orderconfirmation',
        label: 'Order Confirmation',
        config: {
          selectiontype: 'single'
        },
      },
      {
        name: 'servicereport',
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

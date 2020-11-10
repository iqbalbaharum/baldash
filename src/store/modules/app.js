// import User from './../../models/User'

const app = {
  state: {
    menus: [
      {
        name: 'usermanagement',
        label: 'SK Management',
        default_data: 'GetAllUsers',
        default_datatab_title: 'Users',
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
                name: 'deleteuser',
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
        default_data: 'GetAllBranches',
        default_datatab_title: 'Branches',
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
                name: 'edituser',
                icon: 'fas fa-edit',
                label: 'Edit',
                disabled: false
              },
              {
                name: 'deleteuser',
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
        name: 'onlineleads',
        label: 'Online Leads',
        default_data: 'GetAllLeads',
        default_datatab_title: 'Leads',
        buttons: [
          {
            category: 'Template',
            tos: [
              {
                name: 'importonlineleads',
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
                name: 'importonlineleadshistory',
                icon: 'fas fa-history',
                label: 'Import History',
                disabled: false,
              }
            ]
          },
          {
            category: 'Leads',
            tos: [
              {
                name: 'assign',
                icon: 'fas fa-user-tag',
                label: 'Assign To',
                disabled: false
              },
              {
                name: 'disqualify',
                icon: 'fas fa-user-minus',
                label: 'Disqualify',
                disabled: false
              },
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
        label: 'Qualified Leads'
      },
      {
        name: 'designproposal',
        label: 'Design Proposal'
      },
      {
        name: 'orderconfirmation',
        label: 'Order Confirmation'
      },
      {
        name: 'servicereport',
        label: 'Service Report'
      },
    ],
    activeMenu: 'usermanagement',
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
  },
  actions: {
    SetMenu({ commit }, menus) {
      commit('SET_MENUS', menus)
    },
    async SetActiveMenu({ commit, state, dispatch }, activeMenu) {
      commit('SET_ACTIVE_MENU', activeMenu)
      commit('RESET_DATATABS')

      const menu = state.menus.filter(element => element.name === activeMenu)
      if (menu[0].default_data) {
        await dispatch(menu[0].default_data, menu[0].default_datatab_title)
      }

      // reset datatab index to 0 everytime change tab
      commit('SET_ACTIVE_DATATAB', 0)
    },
    OpenDialog({ commit }, dialogName) {
      commit('TOGGLE_DIALOG', dialogName)
    },
    NewTab({ commit }, tab) {
			commit('NEW_TAB', tab)
		},
    UpdateTab({ commit }, tab) {
      commit('UPDATE_TAB', tab)
    },
		CloseTab({ commit }, index) {
			commit('CLOSE_TAB', index)
		},
		SetActiveDataTab({ commit }, index) {
      commit('SET_ACTIVE_DATATAB', index)
      commit('NEW_TAB', [])
    },
  }
}

export default app

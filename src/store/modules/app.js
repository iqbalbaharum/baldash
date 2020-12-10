import Permissions from '../../types/permissions'
import { hasPermission } from '../../utils'

const MENU_CONFIG = [
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
            permissions: [],
            icon: 'fas fa-user-plus',
            label: 'Add User',
            disabled: false
          },
          {
            name: 'edituser',
            permissions: [],
            icon: 'fas fa-edit',
            label: 'View/Edit',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No user selected'
          },
          {
            name: 'delete',
            permissions: [],
            icon: 'fas fa-trash-alt',
            label: 'Delete',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No user selected'
          },
        ]
      },
      {
        category: 'Access',
        tos: [
          {
            name: 'assignScope',
            permissions: [],
            icon: 'fas fa-key',
            label: 'Scope & Roles',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No user selected'
          },
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
            permissions: [],
            icon: 'fas fa-user-plus',
            label: 'Add Branch',
            disabled: false
          },
          {
            name: 'editbranch',
            permissions: [],
            icon: 'fas fa-edit',
            label: 'View/Edit',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No branch selected'
          },
          {
            name: 'delete',
            permissions: [],
            icon: 'fas fa-trash-alt',
            label: 'Delete',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No branch selected'
          },
        ]
      },
      {
        category: 'Auto Suggestion',
        tos: [
          {
            name: 'rrbranch',
            icon: 'fas fa-filter',
            label: 'Arrange Branches',
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
            permissions: [],
            icon: 'fas fa-upload',
            label: 'Import',
            disabled: false,
          },
          {
            name: 'downloadsample',
            permissions: [],
            icon: 'fas fa-download',
            label: 'Download',
            disabled: false
          },
          {
            name: 'importitemhistory',
            permissions: [],
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
            permissions: [],
            icon: 'fas fa-user-tag',
            label: 'Assign To',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No lead selected.'
          },
          {
            name: 'disqualifyOL',
            permissions: [],
            icon: 'far fa-star',
            label: 'Disqualify',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No lead selected.'
          }
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
            permissions: [],
            icon: 'fas fa-check',
            label: 'To Design Proposal',
            disabled: (state) => state.app.tableSelection.length !== 1,
            disabledTooltipText: (state) => state.app.tableSelection.length < 1?
              'No lead selected' : 'Only one lead is allowed at a time.',
          },
          {
            name: 'qualifyQL',
            permissions: [],
            icon: 'fas fa-user-tag',
            label: 'Assign To',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No lead selected.'
          },
        ]
      },
      {
        category: 'Leads',
        tos: [
          {
            name: 'walkinlead',
            permissions: [],
            icon: 'fas fa-walking',
            label: 'Walk In',
            disabled: false
          },
          {
            name: 'requalifyQL',
            permissions: [],
            icon: 'fas fa-star',
            label: 'Requalify',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No lead selected.'
          },
          {
            name: 'disqualifyQL',
            permissions: [],
            icon: 'far fa-star',
            label: 'Disqualify',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No lead selected.'
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
            disabled: false
          },
        ]
      },
      {
        category: 'Drawing',
        tos: [
          {
            name: 'insertDrawingNumber',
            permissions: [],
            icon: 'fas fa-pencil-ruler',
            label: 'Insert Drawing Number',
            disabled: false,
          },
          {
            name: 'detailedQuotation',
            permissions: [],
            icon: 'fas fa-pencil-ruler',
            label: 'Detailed Quotation',
            disabled: (state) => state.app.tableSelection.length !== 1,
            disabledTooltipText: (state) => state.app.tableSelection.length < 1? 
              'No design selected' : 'Only one design is allowed at a time.',
          },
          {
            name: 'summaryQuotation',
            permissions: [],
            icon: 'fas fa-pencil-ruler',
            label: 'Summary Quotation',
            disabled: (state) => state.app.tableSelection.length < 1,
            disabledTooltipText: 'No design selected.'
          },
        ]
      }
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
]

const app = {
  state: {
    menus: MENU_CONFIG,
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
    async SetActiveMenu({ commit, dispatch, state }, activeMenu) {
      commit('SET_ACTIVE_MENU', activeMenu)
      commit('RESET_DATATABS')
      dispatch('GetData')

      // reset datatab index to 0 everytime change tab
      commit('SET_ACTIVE_DATATAB', 0)
    },
    async GetData({ state, dispatch }) {
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      if (menu[0].request.get) {
        await dispatch(menu[0].request.get, { name: menu[0].default_datatab_title })
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
		CloseDataTab({ commit }, index) {
      commit('CLOSE_TAB', index)
      commit('SET_ACTIVE_DATATAB', 0)
		},
		SetActiveDataTab({ commit }, index) {
      commit('SET_ACTIVE_DATATAB', index)
      commit('SELECT_TABLE_ITEM', [])
    },
    OnTableSelection({ commit }, selection) {
      commit('SELECT_TABLE_ITEM', selection)
    },
    InitializePage({ state, dispatch }) {
      if(state.menus.length > 0) {
        dispatch('SetActiveMenu', state.menus[0].name)
      }
    },
    async FilterTable({ commit, state, dispatch }, query) {
      
      // {
      //   "where": {
      //     "or": [{"branchId": "4db6f7e6-e38d-458a-acf0-735c677f39a3"}]
      //   },
      //   "include": [
      //     {
      //       "relation": "roles",
      //       "where": {
      //         "and": [{ "roleId": "3f81420b-4da5-4682-a558-db595a2a8f38"}]
      //       }
      //     }
      //   ]
      // }
      
      let model = null

      for (const entity of this.$database.entities) {
        if (entity.name === query.include) {
          model = entity.model
        }
      }

      if (!model) {
        throw new Error('No database exists. Please check your include to match models entity.')
      }

      model = model.query().withAll()

      for (const condition of query.where.or) {
        for (const key in condition) {
          model = model.where(key, condition[key])
        }
      }
      
      delete query.include
      
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      if (menu[0].request.get) {
        await dispatch(menu[0].request.get, {
          name: `Filter (${state.datatabs.length})`,
          filter: query,
          model: model
        })
      }
    },

    // Generate menu list based on user permissions and menu configuration
    async FilterMenus({ dispatch, rootState }) {
      // Safely deep clone the state without reference so we can modify it without mutating vuex data
      // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
      //const menuConfig = JSON.parse(JSON.stringify(MENU_CONFIG))
      const menuConfig = MENU_CONFIG
      const userPermissions = rootState.user.permissions

      if (typeof userPermissions === 'undefined') return // TODO: Temporary, each user should have permissions
      if (userPermissions.includes('SKAllPermissions')) {
        dispatch('SetMenu', menuConfig)
        return
      }

      const accessibleMenus = menuConfig.filter(menu => hasPermission(userPermissions, menu.permissions))

      /*
      // Filter buttons under module 
      // If button.tos.permissions = [], it needs no permission to access
      for (const menu of accessibleMenus) {
        for (const button of menu.buttons) {
          button.tos = button.tos.filter(to => hasPermission(userPermissions, to.permissions))
        }

        // If all button.tos are not accessible, filter the button out
        menu.buttons = menu.buttons.filter(button => button.tos.length)
      }
      */
      dispatch('SetMenu', accessibleMenus)
    }
  }
}

export default app

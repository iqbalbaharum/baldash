import Permissions from '../../types/permissions'
import { hasPermission } from '../../utils'

const MENU_CONFIG = [
  {
    name: 'usermanagement',
    permissions: [Permissions.MODULE_USER_MANAGEMENT],
    label: 'User Management',
    request: {
      get: 'GetAllUsers',
      delete: 'DeleteUser'
    },
    default_datatab_title: 'Users',
    config: {
      selectiontype: 'multiple'
    }
  },
  
  {
    name: 'entity',
    permissions: [Permissions.MODULE_ALL],
    label: 'Request',
    request: {
      get: 'GetAllEntities'
    },
    default_datatab_title: 'Requests',
    config: {
      selectiontype: 'single'
    },
    buttons: [
      {
        category: 'Status',
        tos: [
          {
            name: 'changeentitystatus',
            permissions: [],
            icon: 'fas fa-upload',
            label: 'Change Status',
            disabled: false,
          },
        ]
      },
    ]
  }
]

const app = {
  state: {
    menus: MENU_CONFIG,
    activeMenu: 'usermanagement',
    tableSelection: [],
    dialog: '',
    datatabs: [],
    tableSearch: '',
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
    SET_SEARCH: (state, search) => {
      state.tableSearch = search
    },
    SET_ACTIVE_DATATAB: (state, index) => {
			state.activeDataTab = index
    },
    RESET_DATATABS: (state) => {
      state.datatabs = []
    },
    RESET_SEARCH: (state) => {
      state.tableSearch = ''
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
    SetSearch({ commit }, search) {
      commit('SET_SEARCH', search)
    },
    async SetActiveMenu({ commit, dispatch, state }, activeMenu) {
      commit('SET_ACTIVE_MENU', activeMenu)
      commit('RESET_DATATABS')
      commit('RESET_SEARCH')
      dispatch('GetData')

      // reset datatab index to 0 everytime change tab
      commit('SET_ACTIVE_DATATAB', 0)
    },
    async GetData({ state, dispatch }) {
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      if (menu[0].request && menu[0].request.get) {
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
          if(condition[key])
          model = model.where(key, condition[key])
        }
      }
      
      delete query.include
      console.log(query)
      console.log('model', model)
      
      const menu = state.menus.filter(element => element.name === state.activeMenu)
      console.log(state.activeMenu)
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

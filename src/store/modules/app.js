
const app = {
  state: {
    menus: [],
    dialog: '',
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    TOGGLE_DIALOG: (state, name) => {
      state.dialog = name
    }
  },
  actions: {
    SetMenu({ commit }, menus) {
      commit('SET_MENUS', menus)
    },

    OpenDialog({ commit }, dialogName) {
      commit('TOGGLE_DIALOG', dialogName)
    }
  }
}

export default app

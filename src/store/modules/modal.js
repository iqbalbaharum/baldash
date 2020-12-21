const modal = {
	state: {
		open: [],
	},
	mutations: {
		OPEN: (state, name) => {
			state.open.unshift(name)
		},
		CLOSE: (state, name) => {
			state.open = state.open.filter((e) => e !== name)
		}
	},
	actions: {
		ModalOpen({ commit }, name) {
			commit('OPEN', name)
		},
		ModalClose({ commit }, name) {
			commit('CLOSE', name)
		}
	}
}

export default modal

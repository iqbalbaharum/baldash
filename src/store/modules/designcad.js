const designcad = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetSSOToken({ commit }, file) {
      return new Promise((resolve, reject) => {
        this.$services.kujiale.getSSOToken()
          .then(res => {
            debugger
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
  }
}

export default designcad

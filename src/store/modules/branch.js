import Branch from './../../models/Branch'

const branch = {
  state: {

  },

  mutations: {

},


  actions: {

    GetAllBranches({ dispatch }, tabName) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.listing()
          .then(res => {
            Branch.insert({ data: res.data })
            if(tabName) {
              dispatch('NewTab', {
                name: tabName,
                columns: Branch.columns,
                data: res.data
              })
            }
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    RegisterBranch({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.register(data)
          .then(res => {
            resolve(res.data)
            Branch.insert({ data: res.data })
            dispatch('GetAllBranches')
          })
          .catch(err => {
            reject(err)
          })
      })
    },


    DeleteBranch({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.delete(id)
          .then(res => {
            resolve(res)
            Branch.delete(id)
            dispatch('GetAllBranches')
          })
          .catch(err => {
            reject(err)
          })
      })
    },

  }
}

export default branch

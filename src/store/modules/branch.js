import Branch from './../../models/Branch'

const branch = {
  state: {

  },

  mutations: {

},


  actions: {

    GetAllBranches({ commit, dispatch }, tabName) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.listing()
          .then(res => {
            Branch.insert({ data: res.data })
            if(tabName) {
              dispatch('NewTab', {
                name: tabName,
                columns: Branch.columns,
                data: Branch.all(),
                remove_action: 'DeleteBranch'
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Branches',
                data: Branch.all()
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

    RegisterBranch({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.create(data)
          .then(res => {
            resolve(res.data)
            Branch.insert({ data: res.data }).then(
              dispatch('GetAllBranches')
            )
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    DeleteBranch({ commit, dispatch }, id) {
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

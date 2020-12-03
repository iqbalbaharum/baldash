import Branch from './../../models/Branch'

const branch = {
  state: {

  },

  mutations: {

},


  actions: {

    GetAllBranches({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let filter = data !== undefined ? data.filter : null
        this.$repository.branch.listing(filter)
          .then(res => {
            Branch.insert({ data: res.data })
            if(data) {
              if(data.name) {
                dispatch('NewTab', {
                  name: data.name,
                  columns: Branch.columns,
                  key: Branch.primaryKey,
                  data: data.model != null ? data.model.get() : Branch.query().withAll().get()
                })
              } else {
                dispatch('UpdateTab', {
                  name: 'Branches',
                  data: Branch.query().withAll().get()
                })
              }
            }
            
            resolve(Branch.all())
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

    UpdateBranch({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        Branch.update({ where: data.uuid, data: data })
        const branch = Branch.find(data.uuid)
        this.$repository.branch.updateById(branch.getId, branch.getBodyRequest)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
            dispatch('GetAllBranches')
          })
      })
    },

    async CheckBranchCodeExist({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.branch.checkBranchCodeExist(data)
          .then(res => {
            resolve(res.data.exist)
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

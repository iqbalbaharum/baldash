import QualifiedLeads from './../../models/QualifiedLeads'

const qualifiedleads = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllQualifiedLeads({ dispatch, rootState }, tabName) {
      return new Promise((resolve, reject) => {
        this.$repository.qualifiedleads.listing({
          where: {
            branchId: rootState.user.branchId
          }
        })
          .then(res => {
            QualifiedLeads.insert({ data: res.data })

            if(tabName) {
              dispatch('NewTab', {
                name: tabName,
                columns: QualifiedLeads.columns,
                data: QualifiedLeads.all()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Leads',
                data: QualifiedLeads.all()
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

    AddLead({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.qualifiedleads.create(data)
          .then(res => {
            QualifiedLeads.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    DeleteLead({ commit }, id) {
      return new Promise(async(resolve, reject) => {
        this.$repository.qualifiedleads.delete(id)
          .then(res => {
            QualifiedLeads.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default qualifiedleads


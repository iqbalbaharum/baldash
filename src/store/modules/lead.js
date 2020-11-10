import Lead from './../../models/Lead'

const lead = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllLeads({ dispatch }, tabName) {
      return new Promise((resolve, reject) => {
        this.$repository.lead.listing()
          .then(res => {
            Lead.insert({ data: res.data })

            if(tabName) {
              dispatch('NewTab', {
                name: tabName,
                columns: Lead.columns,
                data: Lead.all()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Leads',
                data: Lead.all()
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
        this.$repository.lead.create(data)
          .then(res => {
            Lead.insert({ data: res.data })
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
        this.$repository.lead.delete(id)
          .then(res => {
            Lead.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default lead


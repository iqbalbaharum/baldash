import Lead from './../../models/Lead'

const lead = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllLeads({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        let filter = data !== undefined ? data.filter : null
        this.$repository.lead.listing(filter)
          .then(res => {
            Lead.insert({ data: res.data })
            
            if(data) {
              if(data.name) {
                dispatch('NewTab', {
                  name: data.name,
                  columns: Lead.columns,
                  key: Lead.primaryKey,
                  data: data.model != null ? data.model.get() : Lead.query().withAll().get()
                })
              } else {
                dispatch('UpdateTab', {
                  name: 'Leads',
                  data: Lead.all()
                })
              }
            }

            resolve(Lead.query().get())
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async GetQualifiedLeads({ dispatch }, data) {
      await Lead.deleteAll()

      return new Promise((resolve, reject) => {
        let filter = data.filter !== undefined ? data.filter : {
          where: {
            state: 'QL',
            status: 'active'
          }
        }
        this.$repository.lead.listing(filter)
          .then(res => {
            Lead.insert({ data: res.data })

            if(data.name) {
              dispatch('NewTab', {
                name: data.name,
                columns: Lead.columns,
                key: Lead.primaryKey,
                data: data.model != null ? data.model.get() : Lead.query().withAll().get()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Qualified Leads',
                data: Lead.all()
              })
            }

            resolve(Lead.query().get())
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async GetOnlineLeads({ dispatch }, data) {
      await Lead.deleteAll()

      return new Promise((resolve, reject) => {
        let filter = data.filter !== undefined ? data.filter : {
          where: {
            state: 'OL',
            status: 'raw'
          }
        }
        
        // {
        //   "where": {
        //     "or": [{"state": "OL", "status":"raw"}]
        //   }
        // }
        
        this.$repository.lead.listing(filter)
          .then(res => {
            Lead.insert({ data: res.data })
            if(data.name) {
              dispatch('NewTab', {
                name: data.name,
                columns: Lead.columns,
                key: Lead.primaryKey,
                data: data.model != null ? data.model.get() : Lead.query().withAll().get()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Online Leads',
                data: Lead.all()
              })
            }

            resolve(Lead.query().get())
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async AssignLeadToBranch({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        let leadState = {
          state: 'QL',
          status: 'active'
        }
        Lead.update({ where: data.uuid, data: leadState })
        const lead = Lead.find(data.uuid)
        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest).then(async res => {
          dispatch('UpdateTab', {
            name: 'Online Leads',
            data: Lead.all()
          })

          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    async DisqualifiedOnlineLead({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        data.state = 'OL'
        data.status = 'disqualified'
        Lead.update({ where: data.uuid, data: data })
        const lead = Lead.find(data.uuid)
        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest).then(async res => {
          dispatch('UpdateTab', {
            name: 'Online Leads',
            data: Lead.all()
          })

          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    AddLead({ commit, rootState }, data) {
      data.branchId = rootState.user.branchId
      data.userId = rootState.user.userId
      data.state = 'QL'
      data.status = 'active'
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


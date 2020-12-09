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

    async getRecommendedBranch({ commit }, data ) {
      return new Promise((resolve, reject) => {
        this.$repository.lead.getRecommendedBranch()
          .then(res => {
            resolve(res.data)
          })
      })
      .catch(err => {
        reject(err)
      })
    },

    async GetQualifiedLeads({ dispatch, rootState }, data) {
      await Lead.deleteAll()

      return new Promise((resolve, reject) => {
        let filter = data.filter !== undefined ? data.filter : {
          where: {
            state: 'QL',
            status: 'active',
            branchId: rootState.user.branchId,
            userId: rootState.user.roles.includes('salesconsultant')? rootState.user.userId : undefined
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
                data: data.model != null ? data.model.get() : Lead.query().where('state', 'QL').where('status', 'active').where('branchId', rootState.user.branchId).withAll().get()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Qualified Leads',
                columns: Lead.columns,
                key: Lead.primaryKey,
                data: Lead.query().where('state', 'QL').where('status', 'active').where('branchId', rootState.user.branchId).withAll().get()
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
                data: data.model != null ? data.model.get() : Lead.query().where('state', 'OL').where('status', 'raw').withAll().get()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Online Leads',
                columns: Lead.columns,
                key: Lead.primaryKey,
                data: Lead.query().where('state', 'OL').where('status', 'raw').withAll().get()
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

    async AssignLeadToBranch({ dispatch, rootState }, data) {
      return new Promise((resolve, reject) => {
        let leadState = {
          state: 'QL',
          status: 'active',
          branchId: data.branchId,
          remark: data.remark
        }
        Lead.update({ where: data.uuid, data: leadState })
        const lead = Lead.find(data.uuid)
        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest).then(async res => {
          dispatch('UpdateTab', {
            name: 'Online Leads',
            columns: Lead.columns,
            key: Lead.primaryKey,
            data: Lead.query().where('state', 'OL').where('status', 'raw').withAll().get()
          })

          dispatch('UpdateTab', {
            name: 'Qualified Leads',
            columns: Lead.columns,
            key: Lead.primaryKey,
            data: Lead.query().where('state', 'QL').where('status', 'active').where('branchId', rootState.user.branchId).withAll().get()
          })

          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    
    async RequalifyQualifiedLead({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        data.state = 'QL'
        data.status = 'active'
        Lead.update({ where: data.uuid, data: data })
        const lead = Lead.find(data.uuid)
        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest).then(async res => {
          dispatch('UpdateTab', {
            name: 'Qualified Leads',
            columns: Lead.columns,
            key: Lead.primaryKey,
            data: Lead.query().where('state', 'QL').where('status', 'disqualified').withAll().get()
          })

          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    async DisqualifiedQualifiedLead({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        data.state = 'QL'
        data.status = 'disqualified'
        Lead.update({ where: data.uuid, data: data })
        const lead = Lead.find(data.uuid)
        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest).then(async res => {
          dispatch('UpdateTab', {
            name: 'Qualified Leads',
            columns: Lead.columns,
            key: Lead.primaryKey,
            data: Lead.query().where('state', 'QL').where('status', 'active').withAll().get()
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
            columns: Lead.columns,
            key: Lead.primaryKey,
            data: Lead.query().where('state', 'OL').where('status', 'raw').withAll().get()
          })

          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    AddQualifiedLead({ dispatch, rootState }, data) {
      data.branchId = rootState.user.branchId
      data.userId = rootState.user.userId
      data.state = 'QL'
      data.status = 'active'
      return new Promise((resolve, reject) => {
        this.$repository.lead.create(data)
          .then(res => {
            Lead.insert({ data: res.data })
            dispatch('UpdateTab', {
              name: 'Qualified Leads',
              columns: Lead.columns,
              key: Lead.primaryKey,
              data: Lead.query().withAll().get()
            })
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
            dispatch('UpdateTab', {
              name: 'Online Leads',
              columns: Lead.columns,
              key: Lead.primaryKey,
              data: Lead.query().withAll().get()
            })
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    UpdateLead({}, data) {
      return new Promise((resolve, reject) => {
        Lead.update({ where: data.uuid, data: data })
        const lead = Lead.find(data.uuid)

        this.$repository.lead.updateById(lead.getId, lead.getBodyRequest)
        .then(res => {
          resolve(res.data)
        })
        .catch( err => {
          reject(err)
        })
      })
    }
  }
}

export default lead


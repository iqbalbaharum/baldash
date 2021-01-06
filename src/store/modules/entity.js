import Entity from './../../models/Entity'

const entity = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllEntities({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.entity.listing()
          .then(res => {
            Entity.insert({ data: res.data })
            if(data.name) {
              dispatch('NewTab', {
                name: data.name,
                columns: Entity.columns,
                key: Entity.primaryKey,
                data: data.model != null ? data.model.get() : Entity.query().withAll().orderBy('createdAt', 'desc').get()
              })
            }
            resolve(Entity.query().get())
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    ChangeStatus({ dispatch }, data) {
      return new Promise((resolve, reject) => {

        Entity.update({ where: data.uuid, data: data })
        const entity = Entity.find(data.uuid)
        this.$repository.entity.updateById(entity.getId, entity.getBodyRequest)
          .then(res => {
            Entity.insert({ data: res.data })
            if(data.name) {
              dispatch('UpdateTab', {
                name: 'Requests',
                columns: Entity.columns,
                key: Entity.primaryKey,
                data: Entity.query().withAll().get()
              })
            }
            resolve(Entity.query().get())
          })
          .catch(err => {
            reject(err)
            dispatch('GetAllEntities')
          })
      })
    }
  }
}

export default entity

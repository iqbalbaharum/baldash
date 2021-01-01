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
                data: data.model != null ? data.model.get() : Entity.query().withAll().get()
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
  }
}

export default entity

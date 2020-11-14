import ItemList from './../../models/ItemList'

const itemlist = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetAllItems({ dispatch }, tabName) {
      return new Promise((resolve, reject) => {
        this.$repository.itemlist.listing()
          .then(res => {
            ItemList.insert({ data: res.data })

            if(tabName) {
              dispatch('NewTab', {
                name: tabName,
                columns: ItemList.columns,
                data: ItemList.all()
              })
            } else {
              dispatch('UpdateTab', {
                name: 'Items',
                data: ItemList.all()
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

    DeleteLead({ commit }, id) {
      return new Promise(async(resolve, reject) => {
        this.$repository.itemlist.delete(id)
          .then(res => {
            ItemList.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default itemlist


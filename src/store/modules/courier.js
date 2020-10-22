import Courier from '../../models/Courier'

const courier = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllCouriers() {
      return new Promise((resolve, reject) => {
        this.$repository.courier.listing()
          .then(res => {
            Courier.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddCourier({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.courier.create(data)
          .then(res => {
            Courier.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		}
	}
}

export default courier
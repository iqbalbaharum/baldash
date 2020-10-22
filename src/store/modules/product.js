import Product from '../../models/Product'

const product = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllProducts() {
      return new Promise((resolve, reject) => {
        this.$repository.product.listing()
          .then(res => {
            Product.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddProduct({ commit }, data) {
      // convert to int
      data.weight = parseInt(data.weight)
      data.price = parseInt(data.price)
      data.stock = parseInt(data.stock)
      
			return new Promise((resolve, reject) => {
        this.$repository.product.create(data)
          .then(res => {
            Product.insert({ data: res.data })
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

export default product
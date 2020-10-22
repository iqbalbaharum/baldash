import Category from '../../models/Category'

const category = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllCategories() {
      return new Promise((resolve, reject) => {
        this.$repository.category.listing()
          .then(res => {
            Category.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddCategory({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.category.create(data)
          .then(res => {
            Category.insert({ data: res.data })
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

export default category
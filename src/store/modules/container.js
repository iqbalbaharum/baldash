var FormData = require('form-data');

const container = {
  state: {

  },

  mutations: {

  },

  actions: {
    UploadFile({ commit }, file) {
      return new Promise((resolve, reject) => {
        let data = new FormData()
        data.append('file', file)
        this.$repository.container.upload(data)
          .then(res => {
            resolve(res.data.files.file[0].providerResponse)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    GetImage({ commit }, filename) {
      return new Promise((resolve, reject) => {
        this.$repository.container.download(filename)
          .then(res => {
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

export default container

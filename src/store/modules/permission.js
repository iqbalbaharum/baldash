import Permission from './../../models/Permission'

const permission = {
  state: {},
  mutations: {},

  actions: {
    GetAllPermissions() {
      return new Promise((resolve, reject) => {
        this.$repository.permission.listing()
          .then(res => {
            Permission.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    AssignPermissionToUser({}, data) {
      return new Promise((resolve, reject) => {
        this.$repository.permission.assignToUser(data.permissionUuid, data.userUuid)
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

export default permission



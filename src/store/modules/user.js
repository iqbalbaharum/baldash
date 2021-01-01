import { getToken, setToken, removeToken } from './../../datasources/localstorage.storage'
import User from './../../models/User'
import Profile from './../../models/Profile'
import UserRole from './../../models/UserRole'
import UserPermission from './../../models/UserPermission'

const user = {
  state: {
    token: getToken(process.env.MAIN_BE_TOKEN),
    roles: [],
    permissions: [],
    session: '',
    userId: '',
    branchId: '',
    email: '',
    mobile: '',
    name: ''
  },

  mutations: {
    LOGIN: (state, token) => {
      state.token = token
      setToken(process.env.MAIN_BE_TOKEN, token)
    },

    LOGOUT: (state) => {
      state.token = ''
      removeToken(process.env.MAIN_BE_TOKEN)
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },

    SET_SESSION: (state, session) => {
      state.session = session
    },
    
    SET_USER: (state, userId) => {
      state.userId = userId
    },

    SET_BRANCH: (state, branchId) => {
      state.branchId = branchId
    },

    SET_EMAIL: (state, data) => {
      state.email = data
    },

    SET_MOBILE: (state, data) => {
      state.mobile = data
    },

    SET_NAME: (state, data) => {
      state.name = data
    },
  },

  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this.$repository.user.login(userInfo.email, userInfo.password)
          .then(res => {
            const token = res.data.token
            commit('LOGIN', token)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    GetInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getInfo()
          .then(res => {
            const data = res.data
            commit('SET_ROLES', data.roles)
            commit('SET_PERMISSIONS', data.permissions)
            commit('SET_SESSION', data.session)
            commit('SET_USER', data.user)
            commit('SET_NAME', data.name)
            commit('SET_EMAIL', data.email)
            commit('SET_MOBILE', data.mobile)
            commit('SET_BRANCH', data.branch)

            dispatch('FilterMenus', null, {root:true})

            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    Logout({ commit }) {
      return new Promise((resolve) => {
        this.$repository.user.logout()
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_SESSION', '')
        commit('SET_USER', '')
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
        commit('SET_MOBILE', '')
        commit('LOGOUT')
        resolve()
      })
    },

    GetAllUsers({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        let filter = data !== undefined && data.filter ? data.filter : {
          include: [
            {
              relation: 'profile'
            }
          ]
        }

        this.$repository.user.listing(filter)
          .then(res => {
            if(data) {
              User.insert({ data: res.data })
              if(data.name) {
                dispatch('NewTab', {
                  name: data.name,
                  columns: User.columns,
                  key: User.primaryKey,
                  data: data.model != null ? data.model.get() : User.query().withAll().get()
                })
              }
            }
            
            resolve(User.query().get())
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    RegisterUser({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
            User.insert({ data: res.data }).then(
              dispatch('UpdateTab', {
                name: 'Users',
                columns: User.columns,
                key: User.primaryKey,
                data: User.query().withAll().get()
              })
            )
            dispatch('GetAllBranches')
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    async UpdateUser({ commit, dispatch }, data) {
      return new Promise(async (resolve, reject) => {
        const user = User.query().withAll().where('uuid', data.uuid).first()
        const updateData = {
          name: data.name,
          mobile: data.mobile,
          profile: {
            ...user.profile,
            sccode: data.sccode,
          }
        }
        const updateUser = {
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          branchId: data.branchId
        }
        // This returns the updated profile, but when we `User.query().withAll().get()`,
        // the profile is not updated.
        await User.update({ where: data.uuid, data: updateData  })

        this.$repository.user.updateById(user.getId, user.getBodyRequest)
          .then(res => {
            dispatch('UpdateTab', {
              name: 'Users',
              columns: User.columns,
              key: User.primaryKey,
              data: User.query().withAll().get()
            })

            dispatch('GetAllBranches')
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
            dispatch('GetAllUsers')
          })
        this.$repository.user.updateUserId(user.getId, updateUser) 
          .then(res => {
            dispatch('UpdateTab', {
              name: 'Users',
              columns: User.columns,
              key: User.primaryKey,
              data: User.query().withAll().get()
            })

            dispatch('GetAllBranches')
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
            dispatch('GetAllUsers')
          })
        if(data.sccode) {
          dispatch('UpdateUserProfile', data)
        }
      })
    },

    async CheckSCCodeExist({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.checkSCCodeExist(data)
          .then(res => {
            resolve(res.data.exist)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async CheckEmailExist({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.checkEmailExist(data)
          .then(res => {
            resolve(res.data.exist)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async CheckMobileExist({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.checkMobileExist(data)
          .then(res => {
            resolve(res.data.exist)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    RegisterIndividual({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    DeleteUser({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.delete(id)
          .then(res => {
            resolve(res)
            User.delete(id)
            dispatch('UpdateTab', {
              name: 'Users',
              columns: User.columns,
              key: User.primaryKey,
              data: User.query().withAll().get()
            })
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    async GetUserPermissions({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getUserPermissions(id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    async UpdateUserPermission({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.updateUserPermissions(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    async GetUserRoles({ commit }, id) {
      const res = await this.$repository.user.getUserRoles(id)
      const data = res.data
      for (const role of data) {
        await UserRole.create({
          data: {
            roleId: role.uuid,
            userId: id
          }
        })
      }

      return res.data
    },

    async UpdateUserProfile({ commit }, data) {
      const res = await this.$repository.user.updateUserProfile(data.uuid, {
        sccode: data.sccode
      })

      return res.data
    },

    async GetUserProfile({ commit }, id) {
      const res = await this.$repository.user.getUserProfile(id)
      Profile.insert({ data: res.data })
      return res.data
    },

    async AssignUserRole({ commit }, data) {
      const res = await this.$repository.user.assignUserRoles(data.userId, data.roleId)
      return res.data
    },

    async UnassignUserRole({ commit }, data) {
      const res = await this.$repository.user.unassignUserRoles(data.userId, data.roleId)
      return res.data
    }
  }
}

export default user

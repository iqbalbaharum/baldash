import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import User from './../models/User'
import qs from 'qs'

export default class UserRepository extends Repository {
  constructor() {
    super(User, datasource)
  }

  get() {
    // logic
  }

  list() {

  }

  async register(data) {
    const response = await datasource({
      method: 'post',
      url: `${User.entity}`,
      data: qs.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    return response
  }

  async login(email, password) {
    const response = await datasource({
      method: 'post',
      url: `${User.entity}/login`,
      data: qs.stringify({
        email: email,
        password: password
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    return response
  }

  async getInfo() {
    const response = await datasource({
      method: 'get',
      url: `me`,
    })

    return response
  }

  async logout() {
    await datasource({
      method: 'post',
      url: `${User.entity}/logout`,
    })
  }

  async getUserRoles(id) {
    return datasource({
      method: 'get',
      url: `users/${id}/roles`,
    })
  }

  async getUserPermissions(id) {
    return datasource({
      method: 'get',
      url: `users/${id}/permissions`,
    })
  }

  async updateUserPermissions(data) {
    const { permissionIds, rolesIds, userId } = data
    return datasource({
      method: 'post',
      url: `users/${userId}/roles/permission/reattach`,
      data: {
        permissionIds,
        rolesIds
      }
    })
  }

  async getUserProfile(id) {
    return datasource({
      method: 'get',
      url: `users/${id}/profile`,
    })
  }

  async updateUserId(id, data) {
    return datasource({
      method: 'patch',
      url: `user/${id}`,
      data
    })
  }

  async updateUserProfile(id, data) {
    return datasource({
      method: 'patch',
      url: `users/${id}/profile`,
      data
    })
  }

  async checkSCCodeExist(code) {
    return datasource({
      method: 'get',
      url: `users/sccode/${code}/exists`,
    })
  }

  async checkEmailExist(email) {
    return datasource({
      method: 'get',
      url: `users/email/${email}/exists`,
    })
  }

  async checkMobileExist(mobile) {
    return datasource({
      method: 'get',
      url: `users/mobile/${mobile}/exists`,
    })
  }

  async assignUserRoles(userId, rid) {
    return datasource({
      method: 'post',
      url: `users/${userId}/roles`,
      data: {
        roleId: rid
      }
    })
  }

  async unassignUserRoles(userId, rid) {
    return datasource({
      method: 'post',
      url: `users/${userId}/roles/unassign`,
      data: {
        roleId: rid
      }
    })
  }
}

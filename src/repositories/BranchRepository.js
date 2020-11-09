import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import Branch from './../models/Branch'
import qs from 'qs'

export default class BranchRepository extends Repository {
  constructor() {
    super(Branch, datasource)
  }

  get() {
    // logic
  }

  list() {

  }

  async register(data) {
    const response = await datasource({
      method: 'post',
      url: `${Branch.entity}`,
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
      url: `${Branch.entity}/login`,
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
      url: `${Branch.entity}/logout`,
    })
  }

  async getUserRoles(id) {
    return datasource({
      method: 'get',
      url: `users/${id}/roles`,
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

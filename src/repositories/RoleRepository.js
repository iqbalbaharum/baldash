import Repository from './Repository'
import Role from './../models/Role'
import datasource from '../datasources/baljs-rest-api'

export default class RoleRepository extends Repository {
  constructor() {
    super(Role, datasource)
  }

  // Get all users of role {id}
  async users(id, filter) {
    return await this.datasource.get(
      `roles/${id}/users`,
      {
        params: {
          filter: filter
        }
      }
    )
  }
}

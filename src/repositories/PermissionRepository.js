import Repository from './Repository'
import Permission from './../models/Permission'
import datasource from '../datasources/baljs-rest-api'

export default class PermissionRepository extends Repository {
  constructor() {
    super(Permission, datasource)
  }

  async assignToUser(permissionUuid, userUuid) {
    const response = await datasource({
      method: 'post',
      url: `permissions/${permissionUuid}/user/assign`,
      data: {
        userUuid
      },
    })

    return response
  }
}


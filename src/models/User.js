import { Model } from '@vuex-orm/core'
import Role from './Role'
import UserRole from './UserRole'

export default class User extends Model {
  static entity = 'user'

  static primaryKey = 'uuid'

  static fields() {
    return {
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
      uuid: this.attr('null'),
      username: this.attr(''),
      name: this.attr(''),
      SCCode: this.attr(''),
      mobile: this.attr(''),
      email: this.attr(''),
      status: this.attr(''),
      module_access: this.attr(''),
      designCAD_access: this.attr(''),
      branchId: this.attr(''),
      password: this.attr(''),

      roles: this.belongsToMany(Role, UserRole, 'userId', 'roleId')
    }
  }
}


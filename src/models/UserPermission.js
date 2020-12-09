import { Model } from '@vuex-orm/core'
import Permission from './Permission'
import User from './User'

export default class UserRole extends Model {
  static entity = 'userpermission'

  static primaryKey = ['userId', 'permissionId']

  static fields() {
    return {
      userId: this.attr(''),
      permissionId: this.attr(''),

      //
      user: this.belongsTo(User, 'userId'),
      permission: this.belongsTo(Permission, 'permissionId')
    }
  }
}

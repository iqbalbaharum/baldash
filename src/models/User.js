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
      name: this.attr(''),
      SCCode: this.attr(''),
      mobile: this.attr(''),
      email: this.attr(''),
      status: this.attr(''),
      branchId: this.attr(''),
      password: this.attr(''),

      roles: this.belongsToMany(Role, UserRole, 'userId', 'roleId')
    }
  }

  static columns = [
    { name: 'name', required: true, label: 'Customer Name', align: 'left', field: row => row.orderid, sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'contact', label: 'Mobile No.', align: 'left', field: 'mobile', sortable: true },
    { name: 'branch', label: 'Branch', align: 'left', field: 'branchId', sortable: true },
    { name: 'createdAt', label: 'Created At', align: 'left', field: 'createdAt', sortable: true },
    { name: 'updatedAt', label: 'Updated At', align: 'left', field: 'updatedAt', sortable: true },
  ]
}


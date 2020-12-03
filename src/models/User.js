import { Model } from '@vuex-orm/core'
import Role from './Role'
import Branch from './Branch'
import Profile from './Profile'
import UserRole from './UserRole'

export default class User extends Model {
  static entity = 'user'

  static primaryKey = 'uuid'

  static fields() {
    return {
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
      uuid: this.attr(null),
      name: this.attr(''),
      mobile: this.attr(''),
      email: this.attr(''),
      status: this.attr(''),
      branchId: this.attr(''),
      active: this.attr(true),

      roles: this.belongsToMany(Role, UserRole, 'userId', 'roleId'),
      branch: this.belongsTo(Branch, 'branchId'),
      profile: this.hasOne(Profile, 'userId'),
    }
  }

  get branch_name() {
    if (this.branch) { return this.branch.name }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      name: this.name,
      sccode: this.sccode,
      email: this.email,
      mobile: this.mobile,
      branchId: this.branchId,
    }
  }

  static columns = [
    { name: 'name', required: true, label: 'User Name', align: 'left', field: 'name', sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'contact', label: 'Mobile No.', align: 'left', field: 'mobile', sortable: true },
    { name: 'branch', label: 'Branch', align: 'left', field: (row) => { if (row.branch) { return row.branch.name } }, sortable: true },
    { name: 'createdAt', label: 'Created At', align: 'left', field: 'createdAt', sortable: true },
    { name: 'updatedAt', label: 'Updated At', align: 'left', field: 'updatedAt', sortable: true },
  ]
}


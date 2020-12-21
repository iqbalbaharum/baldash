import { Model } from '@vuex-orm/core'
import Role from './Role'
import Branch from './Branch'
import Profile from './Profile'
import UserRole from './UserRole'
import { formatPhoneNo } from '../utils'

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

  get displayTelNo() {
    if (!this.mobile) return ''
    return formatPhoneNo(this.mobile)
  }

  static columns = [
    { name: 'name', required: true, label: 'User Name', align: 'left', field: 'name', sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'contact', label: 'Telephone No', align: 'left', field: 'displayTelNo', sortable: true },
    { name: 'branch', label: 'Branch', align: 'left', field: (row) => { if (row.branch) { return row.branch.name } }, sortable: true },
    { name: 'roles', label: 'Roles', align: 'left', field: (row) => { if (row.roles.length) { return row.roles[0].displayName } }, sortable: true },
    { name: 'SCCode', label: 'SC Code', align: 'left', field: (row) => { if (row.profile) { return row.profile.sccode } }, sortable: true }
    // { name: 'createdAt', label: 'Created At', align: 'left', field: 'createdAt', sortable: true },
    // { name: 'updatedAt', label: 'Updated At', align: 'left', field: 'updatedAt', sortable: true },
  ]
}


import { Model } from '@vuex-orm/core'
import User from './User'

export default class Profile extends Model {
  static entity = 'profile'

  static primaryKey = 'uuid'

  static fields() {
    return {
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
      uuid: this.attr(null),
      sccode: this.attr(''),
      userId: this.attr(''),

      user: this.belongsTo(User, 'userId')
    }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      sccode: this.sccode ?? ''
    }
  }
}


import { Model } from '@vuex-orm/core'

export default class Category  extends Model {
  static entity = 'categories'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      createdAt: this.attr('')
    }

  }
}
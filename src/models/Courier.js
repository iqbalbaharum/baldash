import { Model } from '@vuex-orm/core'

export default class Courier  extends Model {
  static entity = 'couriers'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      createdAt: this.attr('')
    }

  }
}
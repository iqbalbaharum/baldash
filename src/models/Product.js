import { Model } from '@vuex-orm/core'

export default class Product  extends Model {
  static entity = 'products'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      description: this.attr(''),
      weight: this.attr(0),
      brand: this.attr(''),
      material: this.attr(''),
      price: this.attr(0),
      stock: this.attr(0),
      haveVariation: this.attr(false),
      createdAt: this.attr('')
    }

  }
}
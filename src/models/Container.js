import { Model } from '@vuex-orm/core'

export default class Container extends Model {
  static entity = 'containers'

  static fields() {
    return {
      id: this.uid(),
      string: this.attr('')
    }
  }
}

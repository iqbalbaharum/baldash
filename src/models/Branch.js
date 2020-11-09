import { Model } from '@vuex-orm/core'

export default class Branch extends Model {
  static entity = 'branches'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      code: this.attr(''),
      type: this.attr(''),
      telno: this.attr(''),
      faxno: this.attr(''),
      email: this.attr(''),
      address1: this.attr(''),
      address2: this.attr(''),
      state: this.attr(''),
      country: this.attr(''),
      SSMNo: this.attr(''),
      GSTNo: this.attr(''),
      logo: this.attr(''),
      branchId: this.attr(''),
    }
  }
}

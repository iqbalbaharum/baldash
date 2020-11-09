import { Model } from '@vuex-orm/core'

export default class Lead extends Model {
  static entity = 'customers'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      Timestamp: this.attr(''),
      email: this.attr(''),
      phone: this.attr(''),
      location: this.attr(''),
      property_type: this.attr(''),
      age: this.attr(''),
      property_value: this.attr(''),
      time_contact: this.attr(''),
      source_lead: this.attr(''),
      channel_contact: this.attr(''),
      campaign: this.attr(''),
      branchId: this.attr(''),
    }
  }
}

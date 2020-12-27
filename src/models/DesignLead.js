import { Model } from '@vuex-orm/core'

export default class DesignLead extends Model {
  static entity = 'leads'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      email: this.attr(''),
      status: this.attr(''),
      state: this.attr(''),
    }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      state: this.state,
      status: this.status,
    }
  }

  static columns = [
    { name: 'name', label: 'Lead Name', align: 'left', field: 'name', sortable: true, editable: true },
    { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
    { name: 'email', label: 'E-Mail', align: 'left', field: 'email', sortable: false },
  ]
}

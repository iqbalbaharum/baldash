import { Model } from '@vuex-orm/core'
import { date } from 'quasar'

export default class Entity extends Model {
  static entity = 'entity'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      state: this.attr(''),
      status: this.attr(''),
      metadata: this.attr(null),
      userId: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
    }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      state: this.state,
      status: this.status,
      metadata: this.metadata
    }
  }

  static columns = [
    { name: 'date', label: 'Date', align: 'left', field: (row) => date.formatDate(row.createdAt, 'ddd, DD/MM/YYYY HH:mm A'), sortable: true },
    { name: 'user', required: true, label: 'Requester', align: 'left', field: (row) => row.metadata.contactName, sortable: true },
    { name: 'contact', required: true, label: 'Contact Number', align: 'left', field: (row) => row.metadata.contactNumber, sortable: true },
    { name: 'type', label: 'Vehicle Type', align: 'left', field: (row) => row.metadata.type, sortable: true },
    { name: 'plate', label: 'Plate No', align: 'left', field: (row) => row.metadata.plateno, sortable: true },
    { name: 'transmission', label: 'Vehicle Transmission', align: 'left', field: (row) => row.metadata.transmission, sortable: true },
    { name: 'state', label: 'State', align: 'left', field: 'state', sortable: true },
    { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
  ]
}

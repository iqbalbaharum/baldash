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
      SSMNo: this.attr(0),
      GSTNo: this.attr(0),
      logo: this.attr(0),
      branchId: this.attr(''),
    }
  }

  static columns = [
    { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.orderid, sortable: true },
    { name: 'code', label: 'Code', align: 'left', field: 'code', sortable: true },
    { name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true },
    { name: 'telno', label: 'Branch', align: 'left', field: 'telno', sortable: true },
    { name: 'faxno', label: 'Created At', align: 'left', field: 'faxno', sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'address1', label: 'Address Line 1', align: 'left', field: 'address1', sortable: true },
    { name: 'address2', label: 'Address Line 2', align: 'left', field: 'address2', sortable: true },
    { name: 'state', label: 'State', align: 'left', field: 'state', sortable: true },
    { name: 'country', label: 'Country', align: 'left', field: 'country', sortable: true },
    { name: 'SSMNo', label: 'SSM', align: 'left', field: 'SSMNo', sortable: true },
    { name: 'GSTNo', label: 'GST', align: 'left', field: 'GSTNo', sortable: true },
    { name: 'logo', label: 'Logo', align: 'left', field: 'logo', sortable: true },
    { name: 'createdAt', label: 'Created At', align: 'left', field: 'createdAt', sortable: true },
    { name: 'updatedAt', label: 'Updated At', align: 'left', field: 'updatedAt', sortable: true },
  ]
}

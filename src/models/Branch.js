import { Model } from '@vuex-orm/core'
import Lead from './Lead'
import { formatPhoneNo } from '../utils'

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
      priority: this.attr(0),
      leadcapacity: this.attr(0),
      isInRR: this.attr(false),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),

      leads: this.hasMany(Lead, 'branchId')
    }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      name: this.name,
      code: this.code,
      type: this.type,
      telno: this.telno,
      faxno: this.faxno,
      email: this.email,
      address1: this.address1,
      address2: this.address2,
      state: this.state,
      country: this.country,
      SSMNo: this.SSMNo,
      GSTNo: this.GSTNo,
      logo: this.logo,
      branchId: this.branchId,
      priority: this.priority,
      leadcapacity: this.leadcapacity,
      isInRR: this.isInRR,
    }
  }

  get displayType() {
    const typeToDisplayType = {
      dealer: 'Dealer Branch',
      home: 'Home Branch',
    }
    return typeToDisplayType[this.type]
  }

  get displayTelNo() {
    if (!this.telno) return ''
    return formatPhoneNo(this.telno)
  }

  get displayFaxNo() {
    if (!this.faxno) return ''
    return formatPhoneNo(this.faxno)
  }

  static columns = [
    { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
    { name: 'code', label: 'Code', align: 'left', field: 'code', sortable: true },
    { name: 'type', label: 'Type', align: 'left', field: 'displayType', sortable: true },
    { name: 'telno', label: 'Telephone No', align: 'left', field: 'displayTelNo', sortable: true },
    { name: 'faxno', label: 'Fax No.', align: 'left', field: 'displayFaxNo', sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'address1', label: 'Address Line 1', align: 'left', field: 'address1', sortable: true },
    { name: 'address2', label: 'Address Line 2', align: 'left', field: 'address2', sortable: true },
    { name: 'state', label: 'State', align: 'left', field: 'state', sortable: true },
    { name: 'country', label: 'Country', align: 'left', field: 'country', sortable: true },
    { name: 'SSMNo', label: 'SSM', align: 'left', field: 'SSMNo', sortable: true },
    { name: 'GSTNo', label: 'GST', align: 'left', field: 'GSTNo', sortable: true },
  ]
}

import { Model } from '@vuex-orm/core'
import Branch from './Branch'
import User from './User'
import { formatPhoneNo } from '../utils'

export default class Lead extends Model {
  static entity = 'leads'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      timestamp: this.attr(''),
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
      state: this.attr(''),
      status: this.attr(''),
      branchId: this.attr(''),
      userId: this.attr(''),
      rejectReason: this.attr(''),
      noteToBranch: this.attr(''),

      branch: this.belongsTo(Branch, 'branchId'),
      salesConsultant: this.belongsTo(User, 'userId'),
    }
  }

  get getId() {
    return this.$id
  }

  get getBodyRequest() {
    return {
      state: this.state,
      status: this.status,
      branchId: this.branchId ?? '',
      userId: this.userId ?? '',
      rejectReason: this.rejectReason ?? '',
      noteToBranch: this.noteToBranch ?? '',
    }
  }

  get salesConsultantName() {
    if (!this.salesConsultant) return 'Unassigned'

    return this.salesConsultant.name
  }

  get getBranchName() {
    return this.branch.name
  }

  get displayTelNo() {
    if (!this.phone) return ''
    return formatPhoneNo(this.phone)
  }

  static columns = [
    { name: 'name', label: 'Lead Name', align: 'left', field: 'name', sortable: true, editable: true },
    { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
    { name: 'assigned_to', label: 'Assigned To', field: 'salesConsultantName', align: 'left', sortable: true },
    { name: 'email', label: 'E-Mail', align: 'left', field: 'email', sortable: false },
    { name: 'phone', label: 'Telephone No', field: 'displayTelNo', align: 'left', sortable: true, editable: true },
    { name: 'location', label: 'Property Location', field: 'location', align: 'left', sortable: true },
    { name: 'property_type', label: 'Property Type', field: 'property_type', align: 'left', sortable: true },
    { name: 'age', required: true, label: 'Age Group', align: 'left', field: 'age', sortable: true },
    { name: 'property_value', label: 'Property Value', field: 'property_value', align: 'left', sortable: true },
    { name: 'time_contact', label: 'Time To Contact', field: 'time_contact', align: 'left', sortable: true },
    { name: 'source_lead', label: 'Lead Source', field: 'source_lead', align: 'left', sortable: true },
    { name: 'channel_contact', label: 'Channel of Contact', field: 'channel_contact', align: 'left', sortable: true },
    { name: 'campaign', label: 'Campaign', align: 'left', field: 'campaign' },
  ]
}

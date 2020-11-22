import { Model } from '@vuex-orm/core'

export default class Lead extends Model {
  static entity = 'leads'

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

  static columns = [
    { name: 'uuid', required: true, label: 'Id', align: 'center', field: 'uuid', sortable: true },
    { name: 'age', required: true, label: 'Age', align: 'left', field: 'age', sortable: true },
    { name: 'name', label: 'Lead Name', align: 'left', field: 'name', sortable: true, editable: true },
    { name: 'email', label: 'E-Mail', align: 'left', field: 'email', sortable: false },
    { name: 'branchId', label: 'Branch Id', align: 'left', field: 'branchId', sortable: true },
    { name: 'campaign', label: 'Campaign', align: 'left', field: 'campaign' },
    { name: 'phone', label: 'Phone No', field: 'phone', align: 'left', sortable: true, editable: true },
    { name: 'source_lead', label: 'Source', field: 'source_lead', align: 'left', sortable: true },
    { name: 'location', label: 'Location', field: 'location', align: 'left', sortable: true },
    { name: 'time_contact', label: 'Contacted On', field: 'time_contact', align: 'left', sortable: true },
    { name: 'property_type', label: 'Property Type', field: 'property_type', align: 'left', sortable: true },
    { name: 'property_value', label: 'Property Value', field: 'property_value', align: 'left', sortable: true },
    { name: 'channel_contact', label: 'Contacted Through', field: 'channel_contact', align: 'left', sortable: true },

  ]
}

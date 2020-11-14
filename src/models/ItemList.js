import { Model } from '@vuex-orm/core'

export default class Item extends Model {
  static entity = 'itemlist'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      category: this.attr(''),
      subcategory: this.attr(''),
      name: this.attr(''),
      itemcode: this.attr(''),
      virture: this.attr(''),
      brand: this.attr(''),
      material: this.attr(''),
      colour: this.attr(''),
      profile: this.attr(''),
      puom: this.attr(''),
      suom: this.attr(''),
      fraction: this.attr(''),
      std_cost: this.attr(''),
      markuprate: this.attr(''),
      part: this.attr(''),
      nonstdrate: this.attr(''),
      installationcharges: this.attr(''),
      dealer_price: this.attr(''),
      active: this.attr(''),
      oversea: this.attr(''),
      oversea_dealer_price: this.attr(''),
    }
  }

  static columns = [
    { name: 'uuid', required: true, label: 'Id', align: 'center', field: 'uuid', sortable: true },
    { name: 'category', required: true, label: 'Category', align: 'left', field: 'category', sortable: true },
    { name: 'subcategory', label: 'Subcategory', align: 'left', field: 'subcategory', sortable: true, editable: true },
    { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: false },
    { name: 'itemcode', label: 'Item Code', align: 'left', field: 'itemcode', sortable: true },
    { name: 'virture', label: 'Virture', align: 'left', field: 'virture' },
    { name: 'brand', label: 'Brand', field: 'brand', align: 'left', sortable: true, editable: true },
    { name: 'material', label: 'Material', field: 'material', align: 'left', sortable: true },
    { name: 'colour', label: 'Colour', field: 'colour', align: 'left', sortable: true },
    { name: 'profile', label: 'Profile', field: 'profile', align: 'left', sortable: true },
    { name: 'puom', label: 'Puom', field: 'puom', align: 'left', sortable: true },
    { name: 'suom', label: 'Suom', field: 'suom', align: 'left', sortable: true },
    { name: 'fraction', label: 'Fraction', field: 'fraction', align: 'left', sortable: true },
    { name: 'std_cost', label: 'Std Cost', field: 'std_cost', align: 'left', sortable: true },
    { name: 'markuprate', label: 'Markup Rate', field: 'markuprate', align: 'left', sortable: true },
    { name: 'part', label: 'Part', field: 'part', align: 'left', sortable: true },
    { name: 'nonstdrate', label: 'Non Std-rate', field: 'nonstdrate', align: 'left', sortable: true },
    { name: 'installationcharges', label: 'Installation Charges', field: 'installationcharges', align: 'left', sortable: true },
    { name: 'dealer_price', label: 'Dealer Price', field: 'dealer_price', align: 'left', sortable: true },
    { name: 'active', label: 'Active', field: 'active', align: 'left', sortable: true },
    { name: 'oversea', label: 'Oversea', field: 'oversea', align: 'left', sortable: true },
    { name: 'oversea_dealer_price', label: 'Oversea Dealer Price', field: 'oversea_dealer_price', align: 'left', sortable: true },

  ]
}

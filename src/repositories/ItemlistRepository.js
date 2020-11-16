import Repository from './Repository'
import Itemlist from './../models/ItemList'
import datasource from '../datasources/baljs-rest-api'

export default class ItemlistRepository extends Repository {
  constructor() {
    super(Itemlist, datasource)
  }

  async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const ret = await this.datasource.post(`containers/uploads/item-lists`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return ret
  }
}

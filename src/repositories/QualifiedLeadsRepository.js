import Repository from './Repository'
import QualifiedLeads from './../models/QualifiedLeads'
import datasource from '../datasources/baljs-rest-api'

export default class QualifiedLeadsRepository extends Repository {
  constructor() {
    super(QualifiedLeads, datasource)
  }

  async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const ret = await this.datasource.post(`containers/upload/customer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return ret
  }
}

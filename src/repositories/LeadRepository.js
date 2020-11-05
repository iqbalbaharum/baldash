import Repository from './Repository'
import Lead from './../models/Lead'
import datasource from '../datasources/baljs-rest-api'

export default class LeadRepository extends Repository {
  constructor() {
    super(Lead, datasource)
  }

  async upload(file) {
    return await this.datasource.post(`containers/upload/customer`, file)
  }
}

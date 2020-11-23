import Repository from './Repository'
import Lead from './../models/Lead'
import datasource from '../datasources/baljs-rest-api'

export default class LeadRepository extends Repository {
  constructor() {
    super(Lead, datasource)
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

  async assignToBranch(lead, branchId) {
    lead.branchId = branchId
    lead.status = 'qualified'
    delete lead.$id
    delete lead.Timestamp
    return await this.datasource.patch(`${this.model.entity}/${lead.uuid}`, lead)
  }
}

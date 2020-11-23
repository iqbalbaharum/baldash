import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import Branch from './../models/Branch'

export default class BranchRepository extends Repository {
  constructor() {
    super(Branch, datasource)
  }

  async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const ret = await this.datasource.post(`/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return ret
  }
}

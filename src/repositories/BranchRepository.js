import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import Branch from './../models/Branch'

export default class BranchRepository extends Repository {
  constructor() {
    super(Branch, datasource)
  }
  async checkBranchCodeExist(branchcode) {
    return datasource({
      method: 'get',
      // url: `users/sccode/${code}/exists`,
      url: `branch/${branchcode}/exists`,
    })
  }
}

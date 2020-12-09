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

  async refreshBranchesLeadCapacity() {
    return datasource({
      method: 'get',
      url: `/branches/capacity/refresh`
    })
  }

  async updateInnerRotation(rotation) {
    return datasource({
      method: 'patch',
      url: 'branches/inner-rotation',
      data: {
        rotation
      }
    })
  }
}

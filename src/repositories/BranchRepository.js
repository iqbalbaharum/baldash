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
  async checkEmailBranchExist(email) {
    return datasource({
      method: 'get',
      url: `branch/email/${email}/exists`,
    })
  }
  async checkFaxExist(fax) {
    return datasource({
      method: 'get',
      // url: `users/sccode/${code}/exists`,
      url: `branch/fax/${fax}/exists`,
    })
  }

  async refreshBranchesLeadCapacity() {
    return datasource({
      method: 'get',
      url: `/branches/capacity/refresh`
    })
  }

  async checkMobileExist(mobile) {
    return datasource({
      method: 'get',
      url: `branch/telno/${mobile}/exists`,
    })
  }

  async updateInnerRotation(rotation) {
    return datasource({
      method: 'patch',
      url: 'branches/inner-rotation',
      data: rotation
    })
  }

  async innerRotationNumber() {
    return datasource({
      method: 'get',
      url: 'branch/inner-rotation/rotation'
    })
  }

  async inInnerRotation() {
    return datasource({
      method: 'get',
      url: 'branch/inner-rotation/branchces'
    })
  }
}

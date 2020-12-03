import { Model } from '@vuex-orm/core'

export default class Permission extends Model {
  static entity = 'permission'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      selected: this.attr(false),
    }
  }

  get nameDisplay() {
    // SKModuleDesignProposal -> Design Proposal
    return this.name
      .replace('SK', '')
      .replace('Module', '')
      .replace(/([A-Z])/g, ' $1')
      .trim()
  }

  get getBodyRequest() {
    return {
      uuid: this.uuid,
    }
  }
}


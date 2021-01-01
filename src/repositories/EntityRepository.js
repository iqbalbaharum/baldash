import Repository from './Repository'
import Entity from './../models/Entity'
import datasource from '../datasources/baljs-rest-api'

export default class EntityRepository extends Repository {
  constructor() {
    super(Entity, datasource)
  }
}

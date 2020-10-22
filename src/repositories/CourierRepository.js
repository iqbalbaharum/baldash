import Repository from './Repository'
import Courier from '../models/Courier'
import datasource from '../datasources/baljs-rest-api'

export default class CourierRepository extends Repository {
  constructor () {
    super(Courier, datasource)
  }
}

import Repository from './Repository'
import Category from '../models/Category'
import datasource from '../datasources/baljs-rest-api'

export default class CategoryRepository extends Repository {
  constructor () {
    super(Category, datasource)
  }
}

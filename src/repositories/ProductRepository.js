import Repository from './Repository'
import Product from '../models/Product'
import datasource from '../datasources/baljs-rest-api'

export default class ProductRepository extends Repository {
  constructor () {
    super(Product, datasource)
  }
}

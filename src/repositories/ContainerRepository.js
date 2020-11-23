import datasource from '../datasources/baljs-rest-api'
import Repository from './Repository'
import Container from './../models/Container'

export default class ContainerRepository extends Repository {
  constructor() {
    super(Container, datasource)
  }

  async upload(data) {
    return await datasource({
      method: 'post',
      url: `${Container.entity}/upload`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }

  async download(filename) {
    return await datasource({
      method: 'get',
      url: `${Container.entity}/download/${filename}`
    })
  }
}

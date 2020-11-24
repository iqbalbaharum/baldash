import datasource from './../datasources/baljs-rest-api'

export default class KujialeService {
  async getSSOToken() {
    return await datasource({
      method: 'get',
      url: `/kujiale/token`,
    })
  }
}

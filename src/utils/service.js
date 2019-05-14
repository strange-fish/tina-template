import http from './http.js'

export default class Service {
  getInfo () {
    return http.get('one')
  }
}

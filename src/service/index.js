import http from '../utils/http.js'

class Service {
  getInfo () {
    return http.get('one')
  }
}

const service = new Service()
export default service

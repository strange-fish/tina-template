import { Page, Component } from '@tinajs/tina'
import dayjs from 'dayjs'
import Bus from './utils/Bus'
import apis from './utils/wxApi'
import http from './utils/http'
import globalVariable from './utils/globalVariable'

function injectDep (deps) {
  [Page, Component].forEach((item) => {
    Object.defineProperties(item.prototype, deps)
  })
}

const eventBus = new Bus()

injectDep({
  $bus: {
    get () {
      return eventBus
    }
  },
  $day: {
    get () {
      return dayjs
    }
  },
  $global: {
    get () {
      return globalVariable
    }
  },
  $http: {
    get () {
      return http
    }
  },
  ...apis
})

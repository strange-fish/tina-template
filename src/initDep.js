import { Page, Component } from '@tinajs/tina'
import dayjs from 'dayjs'
import { wxp } from '@strange-fish/wxp'

import Bus from './utils/Bus'
import apis from './utils/wxApi'
import http from './utils/http'
import Service from './utils/service.js'
import env from './env.js'

global.wxp = wxp

function injectDep (deps) {
  ;[Page, Component].forEach(item => {
    Object.assign(item.prototype, deps)
  })
}

const service = new Service()
const eventBus = new Bus()

injectDep({
  $bus: eventBus,
  $day: dayjs,
  $http: http,
  $service: service,
  $env: env,
  $wxp: wxp,
  ...apis
})

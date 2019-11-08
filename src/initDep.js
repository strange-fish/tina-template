import { Page, Component } from '@tinajs/tina'
import dayjs from 'dayjs'

// ! 需要最先引入
import './global.js'

import Bus from './utils/Bus'
import apis from './utils/wxApi'
import http from './utils/http'
import service from './service'
import env from './env.js'

function injectDep (deps) {
  ;[Page, Component].forEach(item => {
    Object.assign(item.prototype, deps)
  })
}

injectDep({
  $bus: new Bus(),
  $day: dayjs,
  $http: http,
  $service: service,
  $env: env,
  ...apis
})

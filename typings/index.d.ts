
/// <reference path="./global.d.ts" />
import * as dayjs from 'dayjs'
import * as fly from 'flyio'
import { wxp as wxPromise } from '@strange-fish/wxp'
import 'miniprogram-api-typings'

import http from '../src/utils/http.js'
import Bus from '../src/utils/Bus.js'
import service from '../src/service'
import env from '../src/env.js'

interface WxRouteWrap {
  (path: string, params?: {[key: string]: string | number}): Promise<T>;
}

// declare const wxp: typeof wxPromise
declare module '@tinajs/tina' {
  interface BaseDefinitions {
        // own dep
        $day: typeof dayjs;
        /**
         * Bus
         */
        $bus: Bus;
        $http: fly.Fly;
        $wxp: typeof wxp;
        $navigateTo: WxRouteWrap;
        $redirectTo: WxRouteWrap;
        $reLaunch: WxRouteWrap;
        $service: typeof service;
        $env: typeof env;
  }
}

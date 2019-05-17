/// <reference path="./lib.wa.es6.d.ts" />
/// <reference path="./wx/index.d.ts" />
/// <reference path="./tina.d.ts" />

import dayjs from 'dayjs'
import * as fly from 'flyio'
import { wxp } from '@strange-fish/wxp'

import http from '../src/utils/http.js'
import Bus from '../src/utils/Bus.js'
import Service from '../src/utils/service.js'
import env from '../src/env.js'

interface WxRouteWrap {
  (path: string, params?: {[key: string]: string | number}): Promise<T>;
}


declare module '@tinajs/tina' {
  export interface BaseDefinitions {
        // own dep
        $day(config: dayjs.ConfigType): dayjs.Dayjs;
        /**
         * Bus
         */
        $bus: Bus;
        $http: fly.Fly;
        $wxp: wxp.WXP;
        $navigateTo: WxRouteWrap;
        $redirectTo: WxRouteWrap;
        $reLaunch: WxRouteWrap;
        $service: Service;
        $env: typeof env;
  }
}

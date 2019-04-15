/// <reference path="./lib.wa.es6.d.ts" />
/// <reference path="./wx/index.d.ts" />

import * as tina from '@tinajs/tina'
import dayjs from 'dayjs'
import * as fly from 'flyio'

import http from '../src/utils/http.js'
import Bus from '../src/utils/Bus.js'
import global from '../src/utils/globalVariable.js'
import value from '../src/utils/globalVariable.js';
import { toast, modal, loading } from '../src/utils/wxApi.js'
import Service from '../src/utils/service.js'
import env from '../src/env.js'

interface WxRouteWrap {
  (path: string, params?: {[key: string]: string | number}): Promise<T>;
}

declare module '@tinajs/tina' {
  export interface Component {
    /**
     * @param name 事件名称
     * @param detail 事件内容
     * @param options 事件选项
     */
    triggerEvent(name: string, detail?: object, options?: {
      bubbles: boolean,
      composed: boolean,
      capturePhase: boolean
    }): void;
    /**
     * 小程序页面的实例
     */
    $source: {
      [key: string]: any;
      /**
       * query的params
       */
      options: object;
    };

    // own dep
    $day(config: dayjs.ConfigType): dayjs.Dayjs;
    $bus: Bus;
    $global: typeof global;
    $http: fly.Fly;
    $navigateTo: WxRouteWrap;
    $redirectTo: WxRouteWrap;
    $reLaunch: WxRouteWrap;
    $toast: typeof toast,
    $modal: typeof modal,
    $loading: typeof loading,
    $service: Service,
    $env: typeof env
  }
}

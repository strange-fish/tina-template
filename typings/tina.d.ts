// Type definitions for @tinajs/tina 1.4
// Project: https://github.com/tinajs/tina, https://tina.js.org
// Definitions by: Jiayu Liu <https://github.com/Jimexist>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped/tinajs__tina
// TypeScript Version: 2.2

declare module '@tinajs/tina' {
  export function use(plugin: any): void

  export interface BaseDefinitions<T> {
    mixins: Array<Partial<T>>
    data: { [key: string]: any }
    compute: (data: { [key: string]: any }) => { [key: string]: any }
    methods: { [name: string]: (this: T, ...args: any[]) => any }
    setData(data: { [key: string]: any }): void
    /**
     * 小程序页面的实例
     */
    $source: {
      [key: string]: any
      /**
       * query params
       */
      option: object | void
    }
  }

  export interface ComponentHooks {
    created: () => void
    attached: () => void
    ready: () => void
    moved: () => void
    detached: () => void
  }

  export interface ComponentDefinitions
    extends ComponentHooks,
      BaseDefinitions<ComponentDefinitions> {
    properties: { [key: string]: any }
    observer: Record<string, (val: any) => {}>
    /**
     * @param name 事件名称
     * @param detail 事件内容
     * @param options 事件选项
     */
    triggerEvent(
      name: string,
      detail?: object,
      options?: {
      bubbles: boolean
      composed: boolean
      capturePhase: boolean
      }
    ): void
  }

  export class Component {
    static define(definitions: Partial<ComponentDefinitions>): void
    static mixin(definitions: Partial<ComponentDefinitions>): void
  }

  export interface PageHooks {
    beforeLoad: () => void
    onLoad: (options?: any) => void
    onReady: () => void
    onShow: () => void
    onHide: () => void
    onUnload: () => void
  }

  export interface PageEvents {
    onPullDownRefresh: () => void
    onReachBottom: () => void
    onShareAppMessage: (params: object) => void
    onPageScroll: ({ scrollTop: number }) => void
  }

  export interface PageDefinitions
    extends BaseDefinitions<PageDefinitions>,
      PageEvents,
      PageHooks {}

  export class Page {
    static define(definitions: Partial<PageDefinitions>): void
    static mixin(definitions: Partial<PageDefinitions>): void
  }
}

import { MyPage } from './MyPage'
import { MyComponent } from './MyComponent'

interface CallbackFunction<T = any> {
  (newVal?: T, oldVal?: T): void
}

export type WatchType<D = any> = {
  [P in keyof D]: CallbackFunction<D[P]>
}

function observe (obj: Record<string, any>, key: string, watchFun: CallbackFunction) {
  let val = obj[key]
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (newVal) {
      if (newVal === val) return
      watchFun(newVal, val)
      val = newVal
    },
    get: function () {
      return val
    }
  })
}

export function watch (ctx: MyPage | MyComponent, obj: WatchType) {
  Object.keys(obj).forEach(key => {
    observe(ctx.data, key, function (newVal: any, oldVal: any) {
      obj[key].call(ctx, newVal, oldVal)
    })
  })
}

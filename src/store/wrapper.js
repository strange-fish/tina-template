import { autorun } from 'mobx'
import { store } from './store'

function returnEmpty () {
  return {}
}
/**
 *
 * @param {(s: typeof store) => Record<string, any>} mapState
 * @param {(s: typeof store) => Record<string, Function>} mapMethod
 */
export const mixStore = (mapState = returnEmpty, mapMethod = returnEmpty) => {
  let dispose

  function install () {
    dispose = autorun(() => {
      if (typeof mapState === 'function') {
        console.log('run')
        this.setData(
          mapState(store)
        )
      }
    })
  }

  function uninstall () {
    if (dispose) {
      dispose()
      dispose = undefined
    }
  }

  return {
    onLoad: install,
    onUnload: uninstall,
    attached: install,
    detached: uninstall,
    methods: mapMethod(store)
  }
}

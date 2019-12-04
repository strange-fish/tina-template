import { autorun } from 'mobx'

function returnEmpty () {
  return {}
}
/**
 *
 * @param {() => Record<string, any>} mapState
 * @param {() => Record<string, Function>} mapMethod
 */
export const mixStore = (mapState = returnEmpty, mapMethod = returnEmpty) => {
  let dispose

  function install () {
    dispose = autorun(() => {
      if (typeof mapState === 'function') {
        this.setData(
          mapState()
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
    methods: mapMethod()
  }
}

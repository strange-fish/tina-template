export default class Bus {
  constructor () {
    this._eventMap = {}
  }
  /**
   * 绑定事件
   * @param {String} event
   * @param {Function} cb
   */
  on (event, cb) {
    if (typeof cb !== 'function') throw new Error('Not a function!')
    const cbList = this._eventMap[event] || []
    if (!cbList.includes(cb)) {
      cbList.push(cb)
      this._eventMap[event] = cbList
    }
  }
  /**
   *
   * @param {String} event
   * @param {Function} cb
   */
  off (event, cb) {
    const cbList = this._eventMap[event] || []
    this._eventMap[event] = cbList.filter(item => item !== cb)
  }
  /**
   *
   * @param {String} event
   * @param {Any} args
   */
  emit (event, args) {
    this._eventMap[event].forEach(cb => cb(args))
  }
}

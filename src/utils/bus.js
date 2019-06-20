
export default class Bus {
  constructor () {
    this._eventMap = {}
  }
  /**
   * 绑定事件
   * @param {String} event
   * @param {Function} cb
   * @returns {Bus}
   */
  on (event, cb) {
    if (typeof cb !== 'function') throw new Error('Not a function!')
    const cbList = this._eventMap[event] || []
    if (!cbList.includes(cb)) {
      cbList.push(cb)
      this._eventMap[event] = cbList
    }
    return this
  }
  /**
   * 解绑事件
   * @param {String} event
   * @param {Function} cb 如果cb为空，会清空所有
   * @returns {Bus}
   */
  off (event, cb) {
    const cbList = this._eventMap[event] || []
    if (cb !== undefined) {
      this._eventMap[event] = cbList.filter(item => item !== cb)
    } else {
      this._eventMap[event] = []
    }
    return this
  }
  /**
   *
   * @param {String} event
   * @param {Any} args
   * @returns {Bus}
   */
  emit (event, args) {
    this._eventMap[event].forEach(cb => cb(args))
    return this
  }
}

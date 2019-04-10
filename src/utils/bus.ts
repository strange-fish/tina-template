export default class Bus {
  _eventMap = {} as Record<string, Function[]>
  /**
   * 绑定事件
   * @param {String} event
   * @param {Function} cb
   */
  on(event: string, cb: Function) {
    if (typeof cb !== 'function') throw new Error('Not a function!')
    const cbList = this._eventMap[event] || []
    if (cbList.indexOf(cb) === -1) {
      cbList.push(cb)
      this._eventMap[event] = cbList
    }
  }
  /**
   *
   * @param {String} event
   * @param {Function} cb
   */
  off(event: string, cb: Function) {
    const cbList = this._eventMap[event] || []
    this._eventMap[event] = cbList.filter(item => item !== cb)
  }
  /**
   *
   * @param {String} event
   * @param {Any} args
   */
  emit(event: string, args: any) {
    this._eventMap[event].forEach(cb => cb(args))
  }
}

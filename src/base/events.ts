export interface WxBaseEvent {
  /**
   * 当前组件的一些属性值集合
   */
  currentTarget: {
    id: string,
    dataset: Record<string, string>,
    [k: string]: any
  },

  detail: any,

  /**
   * 触发事件的组件的一些属性值集合
   */
  target: {
    id: string,
    tagName: string,
    dataset: Record<string, string>
  },

  /**
   * 事件类型
   */
  type: string,

  /**
   * 事件生成时的时间戳
   */
  timeStamp: number,
}

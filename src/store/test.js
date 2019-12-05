import { observable } from 'mobx'

class Test {
  @observable
  num = 1
}

export const test = new Test()

import { observable } from 'mobx'

class Test {
  @observable
  num = 1

  @observable
  two = 2
}

export const test = new Test()

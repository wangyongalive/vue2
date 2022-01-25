import {
  initMixin
} from './init'

function Vue(option) {
  this._init(option)
}
initMixin(Vue) // 给Vue原型上添加_init()方法

export default Vue
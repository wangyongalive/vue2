import {
  initMixin
} from './init'
import {
  renderMixin
} from './render'
import {
  lifecycleMixin
} from './lifecycle'

function Vue(option) {
  this._init(option)
}
initMixin(Vue) // 给Vue原型上添加_init()方法
renderMixin(Vue)
lifecycleMixin(Vue)
export default Vue
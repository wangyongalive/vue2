import {
  initMixin
} from './init'
import {
  renderMixin
} from './render'
import {
  lifecycleMixin
} from './lifecycle'
import {
  initGlobalAPI
} from './initGlobalAPI/index'

function Vue(option) {
  this._init(option)
}
initMixin(Vue) // 给Vue原型上添加_init()方法
renderMixin(Vue)
lifecycleMixin(Vue)


// 初始化全局的api
initGlobalAPI(Vue)
export default Vue
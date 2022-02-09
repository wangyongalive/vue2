import {
    initState
} from './state'
import {
    compileToFunction
} from './compiler/index'
import {
    mountComponent,
    callHook
} from './lifecycle'

import {
    mergeOptions
} from './utils/index';
export function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
        //    数据劫持
        const vm = this

        // 将用户传递的 和 全局的进行一个合并 
        vm.$options = mergeOptions(vm.constructor.options, options);
        // vm.$options = options // Vue中使用this.$options指代用户传递的属性
        console.log('vm.$options', vm.$options)
        callHook(vm, 'beforeCreate')

        // 初始化状态
        initState(vm) // 代码分割

        callHook(vm, 'created')
        // 如果用户传入el属性,就需要实现挂载流程
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }

    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        // 默认先查找有没有render函数 没有render会先采用template 如果template也没有就使用el中的内容
        if (!options.render) { // 对模板进行编译
            let template = options.template // 取出模板
            if (!template && el) {
                // 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
                template = el.outerHTML
            }
            // console.log(template)
            const render = compileToFunction(template)
            options.render = render

            // 将template 转化成render方法  vue2.0 虚拟dom
            // console.log(render)
        }
        // console.log(options.render);
        // 渲染当前的组件  挂载这个组件 
        mountComponent(vm, el)
    }

}
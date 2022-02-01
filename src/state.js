import {
    observe
} from './observer/index'
import {
    proxy
} from './utils/index'
export function initState(vm) {
    const opts = vm.$options
    // 属性 方法 数据 计算属性 watch
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethod(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initProps(vm) {}

function initMethod(vm) {}

function initData(vm) {
    console.log('initData', vm);
    // 初始化数据
    let data = vm.$options.data // 用户传递的数据
    // 1.如果data是函数 直接执行 2.把data数据直接放到vm._data上  
    data = vm._data = typeof data === 'function' ? data.call(this) : data


    // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
    for (let key in data) {
        proxy(vm, `_data`, key);
    }
    // 对象劫持 数据改变==>页面发送改变
    // Object.defineProperty  给属性添加get和set方法
    observe(data) // 响应式原理
}

function initComputed(vm) {}

function initWatch(vm) {}
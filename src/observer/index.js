// 把data中的数据 都使用Object.defineProperty重新定义 es5
// Object.defineProperty 不能兼容ie8 及以下 vue2 无法兼容ie8版本
import {
    isObject,
    def
} from '../utils/index'
import {
    arrayMethods
} from './array'
import Dep from './dep.js';
class Observer { // 观测值
    constructor(value) {
        // 如果数据的层次过多,需要递归的去解析对象中的属性,依次增加set和get方法
        def(value, '__ob__', this) // 给每一个监控过的对象都增加一个__ob__属性
        if (Array.isArray(value)) {
            // 数组的话不会对索引进行观测,因为会导致性能问题 所以不会劫持数组的索引
            // 前端开发中一般很少去操作索引, 改变数据的方法 push shift unshift
            // 如果数组里放的是对象 再进行监控  不会监控索引
            value.__proto__ = arrayMethods // 重写数组原型方法
            this.observeArray(value)
        } else {
            this.walk(value) // 对对象进行观测
        }

    }
    observeArray(value) { // [{}]
        for (let i = 0; i < value.length; i++) {
            observe(value[i]) // 继续递归
        }
    }
    walk(data) {
        let keys = Object.keys(data) // 所有可枚举属性的字符串数组
        // 如果这个data 不可配置 直接reurn
        keys.forEach(key => {
            defineReactive(data, key, data[key]) // 定义响应式数据
        })
        // for (let i = 0; i < keys.length; i++) {
        //     let key = keys[i]
        //     let value = data[key]
        //     defineReactive(data, key, value)
        // }
    }
}

function defineReactive(data, key, value) {
    let dep = new Dep(); // 这个dep 是为了给对象使用的
    observe(value) // 递归实现深度检测
    // value生成了闭包
    Object.defineProperty(data, key, {
        get() { // 获取值的时候
            // 每个属性都对应着自己的watcher
            console.log('Dep.target', Dep.target)
            if (Dep.target) {
                dep.depend() // 意味着我要将watcher存起来
                console.log('dep.subs', dep.subs)
            }
            return value
        },
        set(newValue) {
            // 值没有发生变化
            if (newValue === value) return
            console.log('值发生变化了');
            observe(value) // 继续劫持用户设置的值,因为有可能用户设置的值是一个对象
            value = newValue

            dep.notify() // 通知依赖的watcher来进行一个更新操作
        }
    })
}
export function observe(data) {
    let isObj = isObject(data)
    if (!isObj) {
        return
    }
    new Observer(data) // 观测数据
}
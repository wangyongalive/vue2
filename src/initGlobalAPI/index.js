import {
    mergeOptions
} from '../utils/index'
export function initGlobalAPI(Vue) {
    // 整合了所有的全局相关的内容
    Vue.options = {}

    Vue.mixin = function (mixin) {
        // 如何实现两个对象合并
        this.options = mergeOptions(this.options, mixin)
    }

    // 生命周期的合并策略 [beforeCreate, beforeCreate]
    Vue.mixin({
        a: 1,
        beforeCreate() {
            console.log('minx1');
        }
    })

    Vue.mixin({
        b: 1,
        beforeCreate() {
            console.log('minx2');
        }
    })
    console.log('options', Vue.options)
}
import {
    pushTarget,
    popTarget
} from './dep.js'
let id = 0
class Watcher {
    constructor(vm, exprOrFn, callback, options) {
        this.vm = vm;
        this.callback = callback
        this.options = options
        this.id = id++
        this.getter = exprOrFn // 将用户传递过来的回调函数 放到getter属性上
        this.get() // 调用get方法 会让渲染watcher执行
    }
    get() {
        pushTarget(this) // 把watcher存起来 Dep.target = this
        this.getter() // 渲染watcher的执行  渲染后会取值 get
        popTarget() // 移除watcher
    }
    update() {
        this.get()
    }
}
export default Watcher
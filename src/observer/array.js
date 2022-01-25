// 重写数组的7个方法
// push pop unshift shift reverse sort splice 会导致数组发生改变

// slice()
let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods 原型链查找的问题,会向上查找,先查找重写的方法,重写的没有就继续向上查找
export const arrayMethods = Object.create(oldArrayMethods);
const methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        // AOP切片编程
        const result = oldArrayMethods[method].apply(this, args) // 调用原生的数组方法
        let inserted; // 当前用户插入的元素
        let ob = this.__ob__;

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // 3个  从第三个元素开始是新增的元素
                inserted = args.slice(3)
                break;
            default:
                break;
        }
        if (inserted) {
            ob.observeArray(inserted) // 将新增属性继续观测
        }

        return result
    }
})
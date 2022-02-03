export function isObject(data) {
    return typeof data === 'object' && data !== null
}
export function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value
    })
}


// 取值时实现代理效果
export function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue;
        }
    })
}

// 定义生命周期
const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
];

// 合并策略
let strats = {}

// 生命周期合并策略
function mergeHook(parentVal, childVal) {
    // 如果与儿子
    if (childVal) {
        if (parentVal) {
            // 合并成一个数组
            return parentVal.concat(childVal);
        } else {
            // 包装成一个数组
            return [childVal];
        }
    } else {
        return parentVal;
    }
}

// 为生命周期添加合并策略
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
})

// mixin 核心方法
export function mergeOptions(parent, child) {
    const options = {};
    // 遍历父亲
    for (let key in parent) {
        mergeField(key);
    }
    // 父亲没有 儿子有
    for (let key in child) { //  如果已经合并过了就不需要再次合并了
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }
    // 默认的合并策略 但是有些属性 需要有特殊的合并方式 生命周期的合并
    function mergeField(key) {
        if (strats[key]) {
            return options[key] = strats[key](parent[key], child[key])
        }
        if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        } else if (child[key] == null) {
            options[key] = parent[key];
        } else {
            options[key] = child[key];
        }
    }
    return options;
}
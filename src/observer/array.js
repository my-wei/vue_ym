let oldArrayprotoMethods = Array.prototype;//拿到Array原型链方法

export let arrayMethods = Object.create(oldArrayprotoMethods);//让arrayMethods的_prop_指向array原型链
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'

]
methods.forEach(method => {
    arrayMethods[method] = function () {
        console.log(this,'this')
        console.log(arguments,'arguments')
        //this是数组 arguments是针对数组增删改的数据
        const result = oldArrayprotoMethods[method].apply(this, arguments)
        return result;
    }
})
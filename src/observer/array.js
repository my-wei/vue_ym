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
    arrayMethods[method] = function (...args) {

        //this是数组 arguments是针对数组增删改的数据
        const result = oldArrayprotoMethods[method].apply(this, arguments);
        let inserted;
        let ob=this.__ob__;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break
            case 'splice':
                inserted=args.slice(2)//arr.splice(0,1,{a,1})截取参数下标后面的几个
            default:
                break
        }
        if(inserted)ob.observerArray(inserted);
        return result;
    }
})
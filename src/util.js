export function proxy(vm, data, key) {
    /*================================================================
    * functionName：proxy
    * parameter：vm=vm  data=vm里面的某一个属性 key=data里面的某一个属性
    * describe:数据代理
    * ..............
    * return：无
    * author：
    ================================================================*/
    // Object.defineProperty(vm,data,{ //这么写会堆栈内存报错
    //     get(){

    //         console.log(vm[data][key])
    //         debugger;
    //         return vm[data][key]
    //     },
    //     set(newVal){
    //        return vm[data][key]=newVal
    //     }
    // })
    var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: '',
        set: ''
    };
    // 源码中是这样调用的：proxy(vm, '_data', key)
    // vm是Vue的实例，key是data对象属性的名字
    function proxyc(target, sourceKey, key) {//这么写才好用，可能因为闭包的原因
        sharedPropertyDefinition.get = function proxyGetter() {
            return this[sourceKey][key]
        };
        sharedPropertyDefinition.set = function proxySetter(val) {
            this[sourceKey][key] = val;
        };
        Object.defineProperty(target, key, sharedPropertyDefinition);
    }
    proxyc(vm, data, key)
}
export function defineProperty(target, key, value) {
    /*================================================================
    * functionName：defineProperty
    * parameter：target=对象  key=某一个属性  value值
    * describe:让该属性不可被枚举与修改，同时指向vm
    * ..............
    * return：成功TRUE，失败FALSE
    * author：
    ================================================================*/
    Object.defineProperty(target, key, {
        enumerable: false,//不可枚举
        configurable: false,//不可修改
        value: value
    })
}
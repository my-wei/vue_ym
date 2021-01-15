export function proxy(vm,data,key){
    Object.defineProperty(vm,data,{
        get(){
            return vm[data][key]
        },
        set(newVal){
            vm[data][key]=newVal
        }
    })
}
export function defineProperty(target,key,value){
    Object.defineProperty(target,key,{
        enumerable:false,//不可枚举
        configurable:false,//不可修改
        value:value
    })
}
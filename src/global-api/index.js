import { mergeOptions } from "../util";

export function initGlobalApi(Vue){
    Vue.options={};
    Vue.mixin=function(mixin){
        //合并对象  先考虑生命周期 不考虑其他得合并
       this.options=mergeOptions(this.options,mixin)
    }
}
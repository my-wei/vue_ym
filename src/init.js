import { initState } from "./state";

export  function initMixin(Vue){
    Vue.prototype._init=function(options){
        const vm=this;
        vm.$options=options;
        initState(vm);
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount=function(el){
        //挂载操作
        const vm=this;
        el=document.querySelector(el);
        console.log(el)
    }
}
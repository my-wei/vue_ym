import Watchr from './observer/watcher';
import {patch} from './vdom/patch';

export function lifecycleMixin(Vue){
    Vue.prototype._update=function(vnode){
        console.log(vnode,"vnode");
        const vm=this;
        //用新创建的元素替换掉老的vm.$el
       vm.$el= patch(vm.$el,vnode);
    }   
}

export function mountComponent(vm,el){
    //调用render方法去渲染 el属性
    vm.$el = el;
    callHook(vm,"beforeMount");//挂载之前
    //先调用render方法创建虚拟节点,再将虚拟节点渲染到页面上
    vm._update(vm._render());
    let updateComponent=()=>{
        vm._update(vm._render())
    }
    new Watchr(vm,updateComponent,()=>{
        callHook(vm,"beforeUpdate")
    },true);
    callHook(vm,"mounted");//挂载之后
 
}

 
export function callHook(vm,hook){
    const handlers=vm.$options[hook];//vm.$options.created=[]

    if(handlers){
        for(let i=0;i<handlers.length;i++){
            handlers[i].call(vm);//更改生命周期中的this
        }
    }
}
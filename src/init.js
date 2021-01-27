import { initState } from "./state";
import { compileToFuncions } from './compiler/index';
import { callHook, mountComponent } from './lifecycle';
import { mergeOptions } from "./util";
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options =mergeOptions(vm.constructor.options,options) ;
        callHook(vm,"beforeCreate"); //初始化状态更新之前调用生命周期函数
        initState(vm);//初始化状态
        callHook(vm,"created");//初始化状态更新之后调用的生命周期函数
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        //挂载操作
        const vm = this;
        const options = this.$options;
        el = document.querySelector(el);
     
        if (!options.render) {
            let template = options.template;
            //没有render 将template转化成render方法
            if (!template && el) {
                template = el.outerHTML;//采用外部模板
            }
            const render = compileToFuncions(template)
            options.render = render;
        }
        mountComponent(vm, el)
    }
}
import { initState } from "./state";
import { compileToFuncions } from './compiler/index';
import { mountComponent } from './lifecycle';
import { mergeOptions } from "./util";
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options =mergeOptions(vm.constructor.options,options) ;
        initState(vm);
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        //挂载操作
        const vm = this;
        const options = this.$options;
        el = document.querySelector(el);
        vm.$el = el;
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
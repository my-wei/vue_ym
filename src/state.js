import { observer } from "./observer/index";

export function initState(vm) {
  
    const opts = vm.$options;
    if (opts.props) {
        initProps(vm);
    }
    if (opts.methods) {
        initMethods(vm);
    }
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }
}
function initProps(vm) {

}
function initMethods(vm) {

}
function initData(vm) {
    let data = vm.$options.data;
   
   vm._data= data = typeof data == 'function' ? data.call(vm) : data;
    observer(data);
}
function initComputed(vm) {

}
function initWatch(vm) {

}
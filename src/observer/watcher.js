import { popTarget, pushTarget } from "./dep";

let id =0;

class Watchr{
    constructor(vm,eprOrFn,cb,options){
        this.vm=vm;
        this.eprOrFn=eprOrFn;
        this.cb=cb;
        this.options=options;
        this.id=id++; 
        if(typeof eprOrFn=='function'){
            this.getter=eprOrFn;
        }
        this.get();
    }
    get(){
        //Dep.target= watcher
        debugger;
        pushTarget(this);
        this.getter();//调用exprOrFn  渲染页面 取值 (执行了get方法) render方法 with(vm){_v(msg)}
        popTarget();
    }
    updated() {
        this.get();
    }
}

export default Watchr;
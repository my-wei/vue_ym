class Dep{
    constructor(){
        this.subs=[];

    }
    depend(){
        this.subs.push(Dep.target)
        console.log(this.subs,"subs");
    }
    notify(){
        this.subs.forEach(watcher=>{watcher.update()})
    }
}
Dep.target=null;
export function pushTarget(watcher){
    debugger
    Dep.target=watcher;//保留watcher
}
export function popTarget(){
    Dep.target=null;//将变量删除掉
}

export default Dep
//多对多的关系  一个属性有一个dep是用来收集watcher得
//dep 可以存多个watcher
//一个watcher可以对应多个dep
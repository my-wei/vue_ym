import { arrayMethods } from './array';
import { defineProperty } from '../util';
import Dep from './dep';
class Observer {
    constructor(value) {
        //判断一个对象是否被观测过看他有没有__ob__这个属性

        defineProperty(value, "__ob__", this);
        //函数劫持或者叫切片编程 
        if (Array.isArray(value)) {
            value.__proto__ = arrayMethods;
            this.observerArray(value);
        } else {
            this.walk(value)
        }
    }
    observerArray(arr) {
        arr.forEach(item => {
            observer(item);
        })
    }
    walk(data) {
        let keys = Object.keys(data);
        keys.forEach(item => {
            defineReactive(data, item, data[item]);
        })
    }
}
function defineReactive(data, key, value) {

    observer(value);
    let dep=new Dep();//每个属性都有一个dep
    //当页面取值时 说明这个值用来渲染了，将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target){
                dep.depend();
            }
            
            return value;
        },
        set(newValue) {
            if (newValue == value) return
            observer(newValue);
            value = newValue;
        }
    })
    
}
export function observer(data) {
    if (typeof data !== "object" && data !== null) {
        return
    }
    if (data.__ob__) {//已经观测过了 直接返回，防止数据重复被观测
        return
    }
    return new Observer(data);
}
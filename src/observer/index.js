import { arrayMethods } from './array';
import { defineProperty } from '../util';
class Observer {
    constructor(value) {
        //判断一个对象是否被观测过看他有没有__ob__这个属性
        defineProperty(value, "__ob__", this);

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

    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            console.log("设置值")
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
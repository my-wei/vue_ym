import { arrayMethods } from "./array";

class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            value.__proto__ = arrayMethods;
            this.observerArray(value);
        } else {
            this.walk(value)
        }

    }
    observerArray(arr) {
        arr.forEach(item => {
            observer(item)
        })
    }

    walk(data) {
        const keys = Object.keys(data);
        keys.forEach(item => {
            defineReactive(data, item, data[item]);
        })
    }
}
function defineReactive(data, key, value) {
    observer(value);//如果对象里面有对象，继续监听
    Object.defineProperty(data, key, {
        get() {//get 取值触发
            console.log('取值',value)
            return value
        },
        set(newValue) {//set 改值触发
            //如果写成data[key]=value就会变成一直触发set死循环
            //因为这就是一个闭包
            if (newValue == value) return
            console.log('设置值')
            observer(value);//二次改写赋值如果是个对象继续监听
            value = newValue;
        }
    })
}
export function observer(data) {
    console.log(data)
    if (typeof data !== 'object' && data !== null) {
        return
    }
    return new Observer(data)
}
import {initMixin} from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom/index';
// 用Vue的构造函数 船舰组件
function Vue(options){
  this._init(options) //入口方法，做初始化操作
}
//写成一个个的插件进行对原型的扩展
initMixin(Vue);//初始化 init方法
lifecycleMixin(Vue);//混合生命周期 _update
renderMixin(Vue);//渲染的 _render
export default Vue;
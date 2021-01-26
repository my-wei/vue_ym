export function patch(oldVnode, vnode) {
    //将虚拟节点，转换成真实节点

    let el = createElm(vnode);
    let parentElm = oldVnode.parentNode;//获取老的app的父亲
    parentElm.insertBefore(el, oldVnode.nextSibling); //当前的真实元素插入到app的后面
    parentElm.removeChild(oldVnode) //删除老节点


}
function createElm(vnode) {
    let { tag, children, key, data, text } = vnode;
    if (typeof tag == "string") { //创建元素 放到vnode.el上
        vnode.el = document.createElement(tag);
        updadeProperList(vnode);
        children.forEach(child => { //边离儿子 将儿子渲染后的结果扔到父级中
            vnode.el.appendChild(createElm(child));
        })
    } else { //如果是文本的话 放到vnode.el上
        vnode.el = document.createTextNode(text);
    }
    return vnode.el; //最后返回
}

//vue的渲染流程 ==》先初始化数据==》将模板进行编辑==》render函数==》生成虚拟节点==》生成真实的dom ==》扔到页面上

function updadeProperList(vnode){
    let el =vnode.el;
    let newProps=vnode.data ||{};
    for(let key in newProps){
        if(key=='style'){
            for(let styleName in newProps.style){
                el.style[styleName]=newProps.style[styleName]
            }
        }else if(key=='class'){
            el.className=el.class;
        }else{
            el.setAttribute(key,newProps[key]);
        }
        
    }
}
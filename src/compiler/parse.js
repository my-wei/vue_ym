const ncname = `[a-zA-z_][\\-\\.0-9_a-zA-Z]*`;//匹配的标签名
const qnameCaptrue = `((?:${ncname}\\:)?${ncname})`; //my:xx   ?:匹配不捕获 
const startTagOpen = new RegExp(`^<${qnameCaptrue}`);//标签开头的正则，捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCaptrue}[^>]*>`);//匹配标签结尾的</div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;//匹配{{}}




export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,//标签名
            type: 1, //元素类型
            children: [], //孩子列表
            attrs, //属性集合
            parent: null //父元素
        }
    }
    let root;
    let currentParent;
    let stack=[]; 
    function start(tagName, attrs) { //开始标签
        let element = createASTElement(tagName, attrs);
        if(!root){
            root=element;
        }
        currentParent=element; //当前解析得标签 保存起来
        stack.push(element);//将生成得ast元素放到栈中
    }
    function end(tagName) {  //在结尾标签处 创建父子关系
        console.log(tagName, '-----end')
        let element=stack.pop();//去除栈中最后一个
        currentParent=stack[stack.length-1];
        if(currentParent){ //在闭合时可以知道这个标签得父亲是谁  双向记录
            element.parent=currentParent;
            currentParent.children.push(element);
        }
    }
    function chars(text) { //文本标签
        text=text.replace(/\s/g,"");
        if(text){
            currentParent.children.push({
                type:3,
                text
            })
        }
    }


    while (html) { //只要html不为空 字符串就一直解析
        let textEnd = html.indexOf('<');
        if (textEnd == 0) {
            const startTagMatch = parseStartTag();//开始标签匹配的结果
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            const endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }
        let text;
        if (textEnd >= 0) {//匹配文本内容
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length);
            chars(text);
        }
        // break
    }
    function advance(n) { //将字符串进行截取操作 在更新html内容
        html = html.substring(n)
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);
            //如果直接是闭合标签了  说明没有属性
            let end;
            let attr;
            //不是结尾标签  能匹配到属性
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {

                advance(attr[0].length);
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })

            }
            if (end) {  //>删除匹配到的结束标签
                advance(end[0].length);
                return match;
            }
        }
    }
    return  root;
}
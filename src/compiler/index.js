const ncname=`[a-zA-z_][\\-\\.0-9_a-zA-Z]*`;//匹配的标签名
const qnameCaptrue=`((?:${ncname})\\:)?${ncname}`; //my:xx 
const starTagOpen=new RegExp(`^<${qnameCaptrue}`);//标签开头的正则，捕获的内容是标签名
const endTag=new RegExp(`^<\\/${qnameCaptrue}[^>]*>`);//匹配标签结尾的</div>
const attribute=/^\s*([^\s"'<>\/=]+)(?:\s*(?:"([^"]*)"+|'([^\s"'=<>']+)))?/;//匹配属性的
const startTagClose=/^\s*(\/?)>/;//匹配标签结束的>
const defaultTagRE=/\{\{((?:.|\r?\n)+?)\}\}/g;//匹配{{}}

function start (tagName,attrs){

}
function end(tagName){

}
function chars(text){

}


function parseHTML (html){
    while (html){ //只要html不为空 字符串就一直解析
        let textEnd= html.indexOf('<');
        if(textEnd==0){
            parseStartTag();
            
            break
        }
    }
    function parseStartTag(){
        html.match()
    }
}

export function compileToFuncions(template){
    //html模板=> render函数  ast是用来描述代码的
    //1、需要将html代码转化成ast语法树  可以用ast树来描述语言本身
    //2、通过这棵树 重新生成代码
    let ast = parseHTML(template);

}
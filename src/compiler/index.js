import {parseHTML} from './parse';
import {generate} from './generate';
export function compileToFuncions(template) {
    //html模板=> render函数  ast是用来描述代码的
    //1、需要将html代码转化成ast语法树  先要掌握数据结构(树);
    let ast = parseHTML(template);
    //2、优化静态节点
    //3、通过这棵树 重新生成代码
   let code= generate(ast);
}
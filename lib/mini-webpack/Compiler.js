const fs = require('fs');
const path = require('path');
const { getAst, getDeps, getCode } = require('./parser');

class Compiler {
    constructor(options = {}) {
        this.options = options;
        this.modules = [];
    }
    run() {
        const entry = this.options.entry;
        this.modules = this.build(entry)
        // 形成模块与路径的映射
        /* 
        类似于 
        {
            './math.js':{
                code:"",
                deps:{

                }
            },
            './log.js':{
                code:"",
                deps:{
                    
                }
            }
        }
        */
        let graphDeps = this.modules.reduce((result, current) => {
            return {
                ...result,
                [current.entry]: {
                    code: current.code,
                    deps: current.deps
                }
            }
        }, {})
        // 生成bundle文件
        this.generate(graphDeps);
    }
    // build的作用是递归的将依赖收集 存放于this.modules数组中
    build(entry, relPath) {
        // 解析当前模块为AST
        let ast = getAst(entry);
        // 获取当前模块中的所有依赖
        let deps = getDeps(ast, entry);
        // 根据AST获取当前模块中的代码
        let code = getCode(ast);

        let fileInfo = [];
        if (relPath) {
            fileInfo.push({
                entry: relPath,
                code,
                deps
            })
        } else {
            fileInfo.push({
                entry,
                code,
                deps
            })
        }
        if (deps) {
            for (const key in deps) {
                if (Object.hasOwnProperty.call(deps, key)) {
                    const modulePath = deps[key];
                    fileInfo.push(...this.build(modulePath, key));
                }
            }
        }
        return fileInfo;
    }
    generate(graphDeps) {
        // 打包后的代码
        const bundle = `
        (function(graphDeps){
            // 执行入口文件文件
            function excute(module){
                // 模块代码中的require函数执行会调用对应模块中的代码
                function require(module){
                    // 执行对应模块
                    return excute(module)
                }
                // 定义暴露对象
                var exports={};

                (function(require,exports,code){
                    // 执行模块中代码
                    eval(code);
                })(require,exports,graphDeps[module].code)
                // 对外暴露 exports 对象
                return exports
            }
            excute('${this.options.entry}');
        })(${JSON.stringify(graphDeps)})
        `
        let outPath = path.resolve(this.options.output.path, this.options.output.filename)
        // 生成bundle文件
        fs.writeFileSync(outPath, bundle, 'utf8')
    }
}

module.exports = Compiler;
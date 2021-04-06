const path = require('path');
const { getAst, getDeps, getCode } = require('./parser');

class Compiler {
    constructor(options = {}) {
        this.options = options;
    }
    run() {
        const entry = path.resolve(this.options.entry);
        let ast = getAst(entry);
        debugger
        let deps = getDeps(ast, entry);
        let code = getCode(ast);
        console.log(ast);
        console.log(deps);
        console.log(code);
    }
}

module.exports = Compiler;
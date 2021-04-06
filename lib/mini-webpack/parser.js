const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = {
    getAst(entry) {
        let code = fs.readFileSync(entry, 'utf-8');
        let ast = babelParser.parse(code, {
            sourceType: "module"
        })
        return ast;
    },
    getDeps(ast, entry) {
        let deps = {};
        let dirname = path.dirname(entry);
        babelTraverse(ast, {
            ImportDeclaration({ node }) {
                let relativePath = node.source.value;
                let resolvePath = path.resolve(dirname, relativePath);
                deps[relativePath] = resolvePath;
            }
        })

        return deps;
    },
    getCode(ast) {
        let {code} = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        })

        return code;
    }
}
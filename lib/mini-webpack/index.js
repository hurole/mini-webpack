const Compiler = require('./Compiler');

function miniWebpack(config){
    return new Compiler(config)
}

module.exports = miniWebpack;
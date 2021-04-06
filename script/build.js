const config = require('../config/webpack.config');
const miniWebpack = require('../lib/mini-webpack');

let compiler = miniWebpack(config);

compiler.run();
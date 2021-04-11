
        (function(graphDeps){
            // 执行入口文件文件
            function excute(module){
                // 代码中的require函数执行会调用对应模块中的代码
                function require(module){
                    return excute(module)
                }

                var exports={};
                (function(require,exports,code){
                    eval(code);
                })(require,exports,graphDeps[module].code)
                return exports
            }
            excute('./src/index.js');
        })({"./src/index.js":{"code":"\"use strict\";\n\nvar _math = _interopRequireDefault(require(\"./math.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar result = _math[\"default\"].add(11, 22);\n\nconsole.log(result);","deps":{"./math.js":"D:\\Code\\mini-webpack\\src\\math.js"}},"./math.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _log = _interopRequireDefault(require(\"./log.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n(0, _log[\"default\"])(111111);\nvar _default = {\n  add: function add(x, y) {\n    return x + y;\n  },\n  decrease: function decrease(x, y) {\n    return x - y;\n  }\n};\nexports[\"default\"] = _default;","deps":{"./log.js":"D:\\Code\\mini-webpack\\src\\log.js"}},"./log.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = console.log;\nexports[\"default\"] = _default;","deps":{}}})
        
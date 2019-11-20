const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const parser = require('@babel/parser');

// 시스템 변수
let ID = 0;
let DEPTH = 0;

// 1. 자산(Asset)
function asset(filename) {
    var dependencies = [];
    var babel_code = { code : "" };
    var code;
    var id;

    // 확장자 검색시 .js 파일이 존재할 경우 확장자를 추가합니다.
    if(fs.existsSync(filename + ".js")) { 
        filename += ".js";
    }

    // 자바스크립트 파일 필터(조건)
    var ext = path.extname(filename||'').split('.');
    ext = ext[ext.length - 1];

    if(fs.existsSync(filename) && ext === "js") {
        try {
            const content = fs.readFileSync(filename, 'utf-8');

            // AST PARSER(플러그인 추가, 전체규칙) - AST 최적화
            // https://babeljs.io/docs/en/babel-parser#plugins
            const ast = parser.parse(content, {
                sourceType: "module",
                plugins: [
                    "flow",
                    "flowComments",
                    "jsx",
                    "asyncGenerators",
                    "bigInt",
                    "classProperties",
                    "classPrivateProperties",
                    "classPrivateMethods",
                    "doExpressions",
                    "dynamicImport",
                    "exportDefaultFrom",
                    "exportNamespaceFrom",
                    "functionBind",
                    "functionSent",
                    "importMeta",
                    "logicalAssignment",
                    "nullishCoalescingOperator",
                    "numericSeparator",
                    "objectRestSpread",
                    "optionalCatchBinding",
                    "optionalChaining",
                    "partialApplication",
                    "throwExpressions"
                ]
            });

            // 구조를 횡단하여 접근합니다.(JSON, Array), dependencies 추출
            traverse(ast, {
                ImportDeclaration: ({node}) => {
                    dependencies.push(node.source.value);
                },
            });

            // AST TRANSFORM(프리셋 추가) - 변환된 코드 추출
            // https://babeljs.io/docs/en/babel-core#transformfromast
            // https://babeljs.io/docs/en/options#presets
            // evn, react
            babel_code = babel.transformFromAst(ast, content, {
                "presets": ["@babel/preset-env", "@babel/preset-react"]
            });
            code = babel_code.code;
            
            id = ID++;
        } catch(error) {
            // ENV = development;
            console.log(error);
        }
    }

    return {
        id,
        filename,
        dependencies,
        code,
    }
}

// 2. 그래프(Graph)
function graph(entry) {
    const mainAsset = asset(entry);
    const queue = [mainAsset];

    for(const asset_temp of queue) {
        const dirname = path.dirname(asset_temp.filename);
        asset_temp.mapping = {};
        asset_temp.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = asset(absolutePath);
            // 키 : 상대경로, 값 : 자식 아이디
            asset_temp.mapping[relativePath] = child.id;
            queue.push(child);
        });
    }
    return queue;
}

// 3. 번들(Bundle)
function bundle(graph) {
    let modules = '';

    graph.forEach(mod => {
        modules += `${mod.id}: [
            function(require, module, exports) {
                ${mod.code}
            },
            ${JSON.stringify(mod.mapping)},
        ],`;
    });

    const result = `
        (function(modules) {
            function require(id) {
                const [fn, mapping] = modules[id];

                function localRequire(relativePath) {
                    return require(mapping[relativePath]);
                }

                const module = { exports: {} };
                fn(localRequire, module, module.exports);
                return module.exports;
            }

            require(0);
        })({${modules}})
    `;

    return result;
}

// 모듈
module.exports = {
    asset: asset,
    graph: graph,
    bundle: bundle
}
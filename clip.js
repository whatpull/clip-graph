const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const parser = require('@babel/parser');

let ID = 0;

// 1. 자산(Asset)
function asset(filename) {
    var dependencies = [];
    var code;
    var id;

    if(fs.existsSync(filename + ".js")) { // 확장자 검색시 존재할 경우 붙여줍니다.
        filename += ".js";
    }

    var ext = path.extname(filename||'').split('.');
    ext = ext[ext.length - 1];

    // 자바스크립트 파일만 획득
    if(fs.existsSync(filename) && ext === "js") {
        const content = fs.readFileSync(filename, 'utf-8');

        const ast = parser.parse(content, {
            sourceType: "module",
            plugins: [
                // enable jsx and flow syntax
                "flow",
                "flowComments",
                "jsx"
            ]
        });

        // 구조를 횡단하여 접근합니다.(JSON, Array), dependencies 추출
        traverse(ast, {
            ImportDeclaration: ({node}) => {
                dependencies.push(node.source.value);
            },
        });

        code = babel.transformFromAst(ast, content, {
            "presets": ["@babel/preset-env"]
        });
        
        id = ID++;
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
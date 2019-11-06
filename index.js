const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const clip = require('./clip.js');

// 초기화
const init = () => {
    // 피그렛 생성
    const title = chalk.blue(
        figlet.textSync('CLIP GRAPH', {
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    );
    console.log(title);
    console.log(chalk.white("Package graph manager. Copyright ⓒ 2019. CLIPBOUND All Rights Reserved."));
}

const asking = () => {
    // 질문 준비 및 셋업
    var quest = [
        {
            type: 'input',
            name: 'entry',
            message: '엔트리 파일 경로를 정확하게 입력해주세요.'
        }
    ];

    inquirer.prompt(quest).then(answers => {
        const entry = answers.entry;
        if(shelljs.test('-f', entry)) {
            if(shelljs.which('node')) {
                const node = clip.graph(entry);
                // TODO. 데이터 파싱 후 노드를 표현하는 그래픽 파일 생성
                console.log(node);
            } else {
                console.log("노드 명령어를 사용할 수 없습니다.");
            }
        } else {
            console.log("엔트리 파일이 존재하지 않습니다.");
        }
    });
}

// 실행
const run = async () => {
    // 초기화
    init();
    // 답변
    asking();
}

run();
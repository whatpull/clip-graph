const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const compiler = require('./compiler.js');

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
    // 질문 준비 및 셋업[실행 포트에 대한 질문]
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
                const node = compiler.graph(entry);
                // step1. 획득 데이터 정리
                // step2. 데이터 기반 graph 생성 미들웨어 개발(자바스크립트, 캔버스)
                // step3. 웹팩을 통한 index 설정
                // step4. 웹팩 빌드 명령어 수행
                // step5. 노드 서버 실행 명령어 수행
                // step6. 크로 브라우저 자동 오픈 수행

                // TODO. 데이터 디자인 수정 및 파일 생성
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
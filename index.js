const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const shelljs = require('shelljs');

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
    inquirer.prompt([

    ]).then(answers => {

    });
}

// run
const run = async () => {
    // 초기화 피그렛 생성
    init();
}

run();
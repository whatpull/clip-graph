const http = require("http");

// [기본] 서버 생성
const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('Hello node.js');
});

// [기본] 서버 리스너 등록
server.listen(8080, () => {
    console.log("start server 8080");
});

// 명령어를 통해 Node를 실행하는 셋팅을 진행합니다.
// 1. 그래프 테스트(GoJS)를 진행합니다.
// 2. 데이터 파싱(획득한 데이터를 파싱합니다.)
// 3. 그래프 정리 및 모양 확인
const http = require("http");
const fs = require("fs");

// [기본] 서버 생성
const server = http.createServer((request, response) => {
    const data = fs.readFileSync("./src/graph.html", "utf-8");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end(data);
});

// [기본] 서버 리스너 등록
server.listen(80, () => {
    console.log("start server 80");
});

// 라우터 작성 준비

// 명령어를 통해 Node를 실행하는 셋팅을 진행합니다.
// 1. 그래프 테스트(GoJS)를 진행합니다.
// 2. 데이터 파싱(획득한 데이터를 파싱합니다.)
// 3. 그래프 정리 및 모양 확인
// 모듈 파일을 읽기 위해서는 node_modules의 package.json의 main을 읽어 들여 최종 경로는 셋업합니다.
// 읽어드린 모듈 및 파일을 URL 접근 가능하도록 맵핑합니다.
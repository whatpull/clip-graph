const http = require("http");
const fs = require("fs");
const url = require("url");
const router = require("./router");

// [기본] 서버 생성
const server = http.createServer((request, response) => {
    // [라우터] 커스텀, TODO 정적파일에 대한 처리, 자동화 진행여부
    router(request, response, () => {
        
    }, () => {
        
    });
});

// [기본] 서버 리스너 등록
server.listen(80, () => {
    console.log("start server 80");
});

// 명령어를 통해 Node를 실행하는 셋팅을 진행합니다.
// 1. 그래프 테스트(GoJS)를 진행합니다.
// [무료버전이 아니기때문에, 직접 캔버스 제어 패키지 모듈 제작]
// 2. 데이터 파싱(획득한 데이터를 파싱합니다.)
// 3. 그래프 정리 및 모양 확인
// 모듈 파일을 읽기 위해서는 node_modules의 package.json의 main을 읽어 들여 최종 경로는 셋업합니다.
// 읽어드린 모듈 및 파일을 URL 접근 가능하도록 맵핑합니다.
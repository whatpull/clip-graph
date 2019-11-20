const http = require("http");
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
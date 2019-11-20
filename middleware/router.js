const url = require('url');
const fs = require('fs');

// [시스템 변수]
const DEFAULT_ROOT = "./pages";

/**
 * [라우터] 파일 바인딩
 * @param {*} req 요청
 * @param {*} res 응답
 * @param {*} success [콜백] 성공
 * @param {*} error [콜백] 에러
 */
const route = (req, res, success, error) => {
    try {
        // [URL] get url information
        const url_info = url.parse(req.url);
        const url_pathname = url_info.pathname;

        // [FS] get file information
        const fs_info = _get_extension(url_pathname);
        const fs_pahtname = DEFAULT_ROOT + fs_info.path + "/" + fs_info.filename + fs_info.extension;
        const read_file = _get_readfile(fs_pahtname);

        // [RES] set data parsing
        _set_response(res, read_file);

        if(typeof success === "function") {
            success();
        }
    } catch(e) {
        if(typeof error === "function") {
            error();
        }
    }
}

// [파일 경로 확인] 확인
const _confirm_path = (pathname) => {
    const real_path = pathname;
    return fs.existsSync(real_path);
}

// [파일 경로 정보] 조회 
const _get_extension = (pathname) => {
    // 기본 초기값
    let path = "";
    let filename = "index";
    let extension = ".html";

    const pathname_split = pathname.split("/");
    const file = pathname_split[pathname_split.length - 1];
    const extension_reg = new RegExp("\\.+");
    const find = extension_reg.exec(file);

    if(find == null) { // 확장자가 없는경우
        if(pathname_split[pathname_split.length - 1].length > 0) {
            path = pathname_split.splice(0, pathname_split.length - 1).join("/");
            filename = file;
        }
    } else { // 확장자가 있는경우
        const findindex = find['index'];
        // path 경로 설정 방법
        if(pathname_split.length > 2) {
            path = pathname_split.splice(0, pathname_split.length - 1).join("/");
        }
        filename = file.substring(0, findindex);
        extension = file.substring(findindex);
    }

    return {
        path: path,
        filename: filename,
        extension: extension
    }
}

// [파일 내용 획득] 조회
const _get_readfile = (pathname) => {
    if(_confirm_path(pathname)) {
        const data = fs.readFileSync(pathname, "utf-8");
        return data;
    } else {
        throw "No Routing";
    }
}

// [응답] 데이터 라이팅
const _set_response = (res, data) => {
    // TODO. 타입별 구분 필요(컨텐트 타입 : static 파일 등)
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
}

module.exports = route;
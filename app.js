const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// 정적 파일 제공을 위한 미들웨어 사용 등록
app.use('/static', express.static(path.join(__dirname, '/static')))

app.get('/',function (_req, res) {
    fs.readFile('./list.html', function(err, data){
        res.writeHead(200, {'Content-Type':'text/html'});

        if (err) {
            console.error(err);
            res.end(err);
        } else {
            res.end(data);
        }
    });
});


// 파일 다운로드
app.get('/download/:fileName', function (req, res) {
    const fileName = req.params.fileName;
    const fileDir = path.join(__dirname, '/download', fileName);
    res.download(fileDir);
});


// 파일 목록 제공
app.get('/getFileList', function (_req, res) {
    fs.readdir(path.join(__dirname, '/download'), function (err, filelist) {
        if (err) {
            console.log(err)
            res.json([])
        } else {
            res.json(filelist)
        }
    });
});

app.listen(9090, function () {
    console.log('Server started');
});

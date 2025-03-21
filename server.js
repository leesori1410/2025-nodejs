// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, Node.js!');
// });

// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

// http : 요청, 응답
// ip 주소 : 서버에 접근
// localhost -> ip 주소로 변환(DNS도메인 네임서비스)
// 콜백 함수 : 함수 안에 함수. 함수가 실행이 끝나고 호출되는 함수

// text/plain : text로만 구성 MIME

// 200번대 -> 상태코드(성공)
// 400번대 -> 클라이언트 오류
// 404 -> 잘못된 url 접근
// 500번대 -> 서버 오류

// Express 활용

const express = require('express');
const app = express();
const port = 2007;


app.use(express.json())

app.post('/swag', (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
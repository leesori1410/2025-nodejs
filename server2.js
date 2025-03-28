const express = require('express');
const path = require('path');

const app = express();
const port = 2007;
app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속해있는 디렉토리의 절대경로
// path.join : 운영체제에 맞추어 경로지정자(\, /)를 설정해준다
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '우리집', '도쿄'];
app.get('/travel', (req, res) => {
  res.render('travel', {travelList});
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
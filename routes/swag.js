const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 2007;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if(err) {
    console.error('MySQL 연결 실패: ', err);
    return;
  }
  console.log('MySQL 열결 성공');
})

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extends: true}));

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속해있는 디렉토리의 절대경로
// path.join : 운영체제에 맞추어 경로지정자(\, /)를 설정해준다
app.set('views', path.join(__dirname, 'views'));

const router = express.Router();

// 라우팅 / 메서드, 경로
router.get("/", (req, res) => {
  res.send("get swag");
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.post("/:person", (req, res) => {
  res.send(req.params.person);
});

// 라우터 수출
module.exports = router;
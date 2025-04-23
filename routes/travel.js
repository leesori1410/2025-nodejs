const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel');

// 전체 게시글 목록 보여주는 페이지
router.get('/', async (req, res) => {
  try {
    const travelList = await Travel.findAll();
    res.render('travel', {travelList});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/add', (req, res) => {
  res.render('addTravel')
});

// 여행지 추가
router.post('/', async (req, res) => {
  const {name} = req.body;
  try {
    await Travel.create({name});
    res.redirect('/travel');
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
})

// 게시글의 내용을 읽기
router.get('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const travel = await Travel.findByPk(travelId);
    if(!travel){
      res.status(404).send('게시글이 존재하지 않습니다.');
      return;
    }
    res.render('travelDetail', {travel});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 수정 페이지
router.get('/:id/edit', async (req, res) => {
  const travelId = req.params.id;
  try {
    const travel = await Travel.findByPk(travelId);
    if(!travel){
      res.status(404).send('게시글이 존재하지 않습니다.');
      return;
    }
    res.render('editTravel', {travel});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
  const travelId = req.params.id;
  const {name} = req.body;
  try {
    const travel = await Travel.findByPk(travelId);
    if(!travel){
      res.status(404).send('게시글이 존재하지 않습니다.');
      return;
    }
    await travel.update({name});
    res.render('updateSuccess');
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const travel = await Travel.findByPk(travelId);
    if(!travel){
      res.status(404).send('게시글이 존재하지 않습니다.');
      return;
    }
    await travel.destroy();
    res.render('deleteSuccess');
  } catch (err) {
    console.err('DB 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
const Travel = require('../models/Travel');

const travelController = {
  getTravelList: async (req, res) => {
    try {
      const travelList = await Travel.findAll();
      res.render('travel', {travelList});
    } catch (err) {
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },

  getAddTravelForm: (req, res) => {
    res.render('addTravel')
  },

  addTravel: async (req, res) => {
    const {name} = req.body;
    try {
      await Travel.create({name});
      res.redirect('/travel');
    } catch (err) {
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
  },

  getTravelDetail: async (req, res) => {
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
  },

  getEditTravelForm: async (req, res) => {
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
  },

  updateTravel: async (req, res) => {
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
  },

  deleteTravel: async (req, res) => {
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
  },
}
module.exports = travelController;
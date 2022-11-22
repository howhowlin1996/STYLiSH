var express = require('express');
const router = express.Router();
const dashBoard=require('../API/dashBoardAPI/getData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashBoard');
});
router.get('/getData', async function(req, res, next) {
    let data= await dashBoard.getData();
    //console.log(data,"route")
    res.status(200).send(data);

});

module.exports = router;
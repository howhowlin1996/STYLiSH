var express = require('express');
var router = express.Router();

/* GET /member/registration page. */
router.get('/', function(req, res, next) {
  res.render('regist');
});


module.exports = router;
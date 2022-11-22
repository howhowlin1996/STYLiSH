var express = require('express');
const router = express.Router();
const create = require('../API/createAPI/create.js');
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });


router.post('/',upload.any(),function (req, res) { 
    console.log("howhow");
    //console.log(req.files[0].filename,req.files[0]);
    try {
          create.renewSql(req.body,req.files[0].path,req.files[1].path,req.files[2].path);
    } catch (err) { 
      console.error(`Error while getting createAPI `, err.message);
      console.log(err);
      next(err);
    }

    res.redirect('/admin/product.html');
});
module.exports = router;
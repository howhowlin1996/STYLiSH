var express = require('express');
var router = express.Router();
const emailList = require('../API/memberRegistAPI/checkEmail');

/* check email address from db. */
router.post('/', async function(req, res, next) {
    //console.log(req.body);
    let exist=0;
    try{
       exist=await emailList.checkEmail(req.body.email);
    } catch (err) { 
        console.error(`Error while getting checkEmailAPI `, err.message);
        next(err);
    }
    //console.log(exist);
    if(exist>0) res.json({exist:"exist"});
    else res.json({exist:"notexist"});
   
    //res.statusMessage("great");
    
});


module.exports = router;
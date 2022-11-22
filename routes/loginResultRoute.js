var express = require('express');
var router = express.Router();
const login = require('../API/loginAPI/loginAPI');
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in HMAC
const jwt = require('jsonwebtoken'); // jwt module


/* check login result. */
router.post('/', async function(req, res, next) {
    console.log(req.body);
    try{
        let check=await login.logInCheck(req.body);
        
        if(check!=false){
            const token=generateAccessToken(check);
            res.cookie("howhow",token, { signed: true });
            console.log("success");
            res.redirect('/shopIndex');
        }
        else res.send('log in failed');

    }
    catch(err){
            console.log(err);
    }
    
    
});


function generateAccessToken(user_inform){
    return jwt.sign(user_inform, process.env.secret, {expiresIn: '1800s' });


}


module.exports = router;
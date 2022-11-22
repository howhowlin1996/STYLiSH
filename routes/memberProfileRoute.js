var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in verify

router.get('/', function(req, res, next) {
        //console.log(req.signedCookies["howhow"]);
       
        if(typeof req.signedCookies["howhow"]==='undefined'){
            //console.log('howhow');
            res.redirect('/login');
        }
        else{
            const token=req.signedCookies['howhow'];
            try{
                const decode=jwt.verify(token, process.env.secret);      //verify jwt
                const id =decode["user_inform"][0]["id"];
                const user_name=decode["user_inform"][0]["user_name"];
                const email=decode["user_inform"][0]["email"];
                const birthday=decode["user_inform"][0]["birthday"].slice(0,10);
                const gender=decode["user_inform"][0]["gender"];
                const country=decode["user_inform"][0]["country"];
                const city=decode["user_inform"][0]["city"];
                //console.log(decode["user_inform"]);
                //console.log(birthday.slice(0,10));
                res.render('profile',{id:id,user_name:user_name,email:email,birthday:birthday,gender:gender,country:country,city:city}); //reder profile.ejs
                //console.log("hahaha");
            }
            catch (err){                                                   //handle verify error usually token expired
                console.log("memberProfileRoute",err);
                res.redirect('/login');                                    // redirect to login page

            }
            
            //console.log(token);
            //console.log(decode["user_inform"][0]["id"]);
           

        }

        //res.send("goodmorning!!!!");
  });
  
  
  module.exports = router;
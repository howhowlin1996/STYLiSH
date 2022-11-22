const db = require('../../service/db.js'); //ask database connection from db.js
var SqlString = require('sqlstring');    // ask sqlstring module to preventfrom sql injection
const crypto=require('crypto');
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in HMAC

// create new member information into database 
async function createMember(data){
    var cryptPassword=hashPassword(data.password,data.email);// use encryption
    //get the detail information from post
    let user_name=data.user_name;
    let email=data.email;
    let birthday=data.birthday;
    let gender=data.gender;
    let country=data.country;
    let city=data.city;

    const checkEmail=await db.query("SELECT 1 FROM user_inform WHERE email = ?",[email]);//check if email is used
    if(checkEmail.length!=0) throw new Error("dupicate email "+email);
    
    const total_num= await db.query("SELECT id FROM user_inform ORDER BY id DESC LIMIT 1"); //check the last user id
    let id = 0;
    if(total_num.length!=0)id=parseInt(total_num[0]['id'], 10)+1; // make a new id
    
    let sql1='INSERT INTO user_inform values(?,?,?,?,?,?,?,?,now(),false);';
    await db.query(sql1,[id,user_name,email,cryptPassword,birthday,gender,country,city]);
}

function hashPassword(password,email) {  //use HMAC+SALT to do the encryption
    const secret=process.env.secret;     // to get the secret key for HMAC
    const hash = crypto.createHmac('sha256', secret).update(password+email).digest('hex');
    return hash; 
}

module.exports = {
    createMember
}
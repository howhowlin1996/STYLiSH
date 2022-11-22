const db = require('../../service/db.js'); //ask database connection from db.js
const crypto=require('crypto');
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in HMAC

async function logInCheck(data){
        let email=data.email;
        let password=hashPassword(data.password,email);
        let sql1='select * from user_inform where email = ?';
        const user_inform= await db.query(sql1,[email]);
        if(user_inform.length==0) return false;
        const correct_password=user_inform[0]["password"];
        delete user_inform[0].password;
        delete user_inform[0].create_date;
        delete user_inform[0].is_delete;
        //console.log(password,correct_password,user_inform[0]);

        if(password===correct_password) return {
           user_inform 
        };
        else return false;
       
        

}


function hashPassword(password,email) {  //use HMAC+SALT to do the encryption
    const secret=process.env.secret;     // to get the secret key for HMAC
    const hash = crypto.createHmac('sha256', secret).update(password+email).digest('hex');
    return hash; 
}



module.exports={
    logInCheck
}
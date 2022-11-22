const db = require('../../service/db.js');
async function checkEmail(email){
   //console.log(email);
   let sql1='select count(*) from user_inform where email = ?';
   let result=await db.query(sql1,[email]);
   if(result[0]['count(*)']) return true; 
   return false;

}

module.exports = {
  checkEmail
}
const db = require('../../service/db.js'); //ask database connection from db.js

async function getPayment(id){         //get payment list

        try{
            let getPaymentSql='SELECT * FROM payment where user_id =?'
            let getPaymentRec=db.query(getPaymentSql,[id]);
            return getPaymentRec;
           
        }
        catch(err){
                console.log("getPaymentRec",err);
        }




}




module.exports={
    getPayment
}
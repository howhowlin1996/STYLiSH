const db = require('../../service/db.js'); //ask database connection from db.js
async function sendRecord(order_id,id,amount,data){                                 //sendpaymentRec
    let paymentRecSql='INSERT INTO payment values(?,?,?,?,?,?,now(),?,0)';
    let updatePaymentSql='UPDATE orders set payment =true where order_id=?;'
    try{
          db.query(paymentRecSql,[order_id,id,amount,data['rec_trade_id'],data['bank_transaction_id'],data['acquirer'],data['status']]);
          db.query(updatePaymentSql,[order_id]);
    }
    catch(err){
      console.log("sendPaymentRec",err);
    }
    
    
    

  
}

module.exports = {
  sendRecord
}
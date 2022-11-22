const db = require('../../service/db.js'); //ask database connection from db.js

async function getUnpaid(id){         //get unpaid list

        try{
            let getUnpaidSql='SELECT detail.*  FROM orders_detail as detail,orders WHERE user_id=? && detail.order_id=orders.order_id  && orders.payment=0';
            let unpaidList =await db.query(getUnpaidSql,[id]);
            //console.log(typeof Object.values (unpaidList[0]['consume_detail']));
            return unpaidList;
        }
        catch(err){
                console.log("getUnpaidOrder",err);
        }




}




module.exports={
    getUnpaid
}
const db = require('../../service/db.js'); //ask database connection from db.js

//delete delivery inform

async function deliveryInform(data){
   const user_id=data.user_id ;
   const delivery_nation=data.delivery_nation ;
   const delivery_way=data.delivery_way ;
   const delivery_name=data.delivery_name;
   const phone=data.phone ;
   const address=data.address;
   const delivery_time=data.delivery_time ;
   const order_total_consume=data.order_total_consume;
   let order_id=0;
   let checkUnpaymentSql='SELECT order_id FROM orders WHERE user_id=? && payment =0;' //get order_id
   let insertDeliveryInform='insert into delivery values(?,?,?,?,?,?,?,?,now())';
   let deliveryAmount='SELECT 1 FROM delivery where order_id=? ';
   let updateDelivery='UPDATE delivery set delivery_nation=?,delivery_way=?,delivery_name=?,phone=?,address=?,delivery_time=?,order_total_consume=?,order_time=now() where order_id=?';
   const userOrderExist= await db.query(checkUnpaymentSql,[user_id]);                   
   if(userOrderExist.length!=0) order_id=userOrderExist[0]['order_id'];             //get order_id
   const deliverExist= await db.query(deliveryAmount,[order_id]);
   if(Object.keys(deliverExist).length!=0){
       try{
            await db.query(updateDelivery,[delivery_nation,delivery_way,delivery_name,phone,address,delivery_time,order_total_consume,order_id])
       }
       catch(err){
        console.log("deliveryInform",err);
       }

   }
   else{
        try{
            db.query(insertDeliveryInform,[order_id,delivery_nation,delivery_way,delivery_name,phone,address,delivery_time,order_total_consume]);
        }
        catch(err){
            console.log("deliveryInform",err);
        }
   }
   




}


module.exports={
    deliveryInform
}
const db = require('../../service/db.js'); //ask database connection from db.js
async function sendOrders(data){
    //console.log(data.user_id,data.product_id,data.color,data.size,data.amount,data.total_consume);
    const user_id=data.user_id;
    const consume_detail=data.consume_detail;
    const total_consume=data.total_consume;
    let order_id=1;

    let orderAmountSql ='SELECT 1 FROM orders ';     //check if orderList is empty
    const orderExist= await db.query(orderAmountSql);
    
    //console.log( data);
    if(Object.keys(orderExist).length!=0){          //if order list is not empty
        //console.log(orderExist);
        let checkUnpaymentSql='SELECT order_id FROM orders WHERE user_id=? && payment =0;' //check if there're any unpayment order for user
        const userOrderExist= await db.query(checkUnpaymentSql,[user_id]);
        //console.log(userOrderExist[0]['order_id']);
        if(userOrderExist.length!=0) {
            order_id=userOrderExist[0]['order_id'];              //if there're any, combining them.
            let updateOrder='update orders_detail set  consume_detail =?,total_consume=? where order_id=? ';
            try{
                    await db.query(updateOrder,[consume_detail,total_consume,order_id])
            }
            catch(err){
                    console.log("sendOrders.js",err);    
            }
            return;
        }
        else{
            
                let lastOrderId=await db.query("SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1");  //else find the newest order number
                order_id=lastOrderId[0]['order_id']+1;
                let addOrderSql='INSERT INTO orders VALUES(?,?,0,now())';
                await db.query(addOrderSql,[order_id,user_id]);
                
             
        }
       
  
    }
    else{
        let addOrderSql='INSERT INTO orders VALUES(?,?,0,now())';
        await db.query(addOrderSql,[order_id,user_id]);  
    }

    let addOrderDetailSql='INSERT INTO  orders_detail(order_id,consume_detail,total_consume) VALUES(?,?,?)';
    try{
        
        await db.query(addOrderDetailSql,[order_id,consume_detail,total_consume]);
    }
    catch(err){
        console.log("sendOrders.js",err);
    }
  
    
    
    
    

  
}

module.exports = {
  sendOrders
}
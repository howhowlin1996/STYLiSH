const db = require('../../service/db.js'); //ask database connection from db.js

//delete orders

async function renewOrder(data){
    const product_id=data.product_id;
    const color=data.color;
    const size=data.size;
    const order_id=data.order_id;
    const is_delete=data.is_delete;
    const amount=data.amount;
    const total_consume=data.total_consume;
    let deleteOrder="UPDATE orders_detail SET is_delete=?,amount=?,total_consume=? where order_id=? && product_id=? && color=? && size=?";
    try{
        db.query(deleteOrder,[is_delete,amount,total_consume,order_id,product_id,color,size]);
    }
    catch(err){
        console.log("renewOrders",err);
    }




}


module.exports={
    renewOrder
}
const express = require('express');
const router = express.Router();
const delivery=require('../API/ordersAPI/sendDeliveryInform')

router.post('/insert',async function(req,res,next){
    try{
        await delivery.deliveryInform(req.body);   //sent order product and user_id to database
        res.status(200).send('success');
    }
    catch(err){
        console.log("deliveryRoute",err);
        res.status(400).send(err);
    }
    

});

module.exports=router;
const express = require('express'); 
const router = express.Router(); 
const sendOrders= require('../API/ordersAPI/sendOrders');


router.post('/',async function(req,res,next){   
    try{
        await sendOrders.sendOrders(req.body);   //sent order product and user_id to database
        res.status(200).send('success');
    }
    catch(err){
        res.status(400).send(err);
    }
   
    
});

module.exports=router;
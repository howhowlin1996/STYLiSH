const express = require('express');
var router = express.Router();
const axios = require('axios');
const unpaidOrder=require('../API/ordersAPI/getUnpaidOrder');
const sendRecord=require('../API/ordersAPI/sendPaymentRec');
router.post('/pay-by-prime', async function(req, res, next) {

    const order_inform=await unpaidOrder.getUnpaid(req.query.id);
    if(typeof order_inform==undefined||order_inform.length==0) return res.json({}) //if user doesn't buy anything return error
    const phone=req.body.phone;
    const name=req.body.name;
    const email=req.body.email;
    let amount=0;
    let product_title='';
    let id=req.query.id;
    console.log("payment",order_inform);
    let order_id=order_inform[0]['order_id'];
    for(var i=0;i<order_inform.length;i++){
        amount+=order_inform[i]['total_consume'];
        product_title+=order_inform[i]['product_title']+';';
    }
    const post_data = {
        "prime": req.body.prime,
        "partner_key": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
        "merchant_id": "AppWorksSchool_CTBC",
        "amount": amount,
        "currency": "TWD",
        "details": product_title,
        "cardholder": {
            "phone_number": phone,
            "name": name,
            "email": email
        },
        "remember": false
    }
    //console.log(post_data);
    axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
        headers: {
            'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
        }
    }).then((response) => {
        sendRecord.sendRecord(order_id,id,amount,response.data);
        console.log("success");
        return res.json({
            result: response.data
        })

    })

    

})

module.exports = router;


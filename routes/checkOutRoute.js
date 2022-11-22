var express = require('express');
var router = express.Router();
const axios = require('axios');
const unpaidOrder=require('../API/ordersAPI/getUnpaidOrder');
const sendRecord=require('../API/ordersAPI/sendPaymentRec');
const jwt = require('jsonwebtoken');
var id=0;
var email;

/* TayPay Router /admin/checkout*/
router.get('/', function(req, res, next) {
    if(typeof req.signedCookies["howhow"]==='undefined'){
        //console.log('howhow');
        res.redirect('/login');
    }
    else{
        const token=req.signedCookies['howhow'];
        try{
            const decode=jwt.verify(token, process.env.secret);      //verify jwt
            id =decode["user_inform"][0]["id"];
            email=decode["user_inform"][0]["email"];
            console.log(id,email);
            
        }
        catch (err){                                                   //handle verify error usually token expired
            console.log("memberProfileRoute",err);
            res.redirect('/login');                                    // redirect to login page

        }
        
        //console.log(token);
        //console.log(decode["user_inform"][0]["id"]);
       

    }
    res.render('TayPay');
});

router.post('/pay-by-prime', async function(req, res, next) {
    const order_inform=await unpaidOrder.getUnpaid(id);

    if(order_inform.length==0) return res.json({}) //if user doesn't buy anything return error
    const phoneNumber=req.body.phoneNumber;
    const name=req.body.name;
    let amount=0;
    let product_title='';
    console.log(order_inform);
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
            "phone_number": phoneNumber,
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
        return res.json({
            result: response.data
        })

    })

})

module.exports = router;
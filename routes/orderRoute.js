const express = require('express');
const router = express.Router();
const unpaid = require('../API/ordersAPI/getUnpaidOrder');
const payment=require('../API/ordersAPI/getPaymentRec');
const deleteProduct=require('../API/ordersAPI/renewOrders');

   /* GET unpaid result. */
router.get('/unpaid', async function(req, res, next) {
        try {   

                res.json(await unpaid.getUnpaid(req.query.id));
        
        } catch (err) {
                console.error(`Error while getting orderAPI `, err.message);
                next(err);
        }

});

/*get payment record*/ 
router.get('/payment', async function(req, res, next) {
        try {   
                res.json(await payment.getPayment(req.query.id));
        
        } catch (err) {
                console.error(`Error while getting getPaymentrecAPI `, err.message);
                next(err);
        }

});

/*delete order record*/ 
router.post('/renew', async function(req, res, next) {
        try {   
                await deleteProduct.renewOrder(req.body);
        
        } catch (err) {
                console.error(`Error while getting gdeleteAPI `, err.message);
                next(err);
        }

});


  
module.exports = router;
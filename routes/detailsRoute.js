const express = require('express');
const router = express.Router();
const detail = require('../API/detailsAPI/details.js');
const size=require('../API/detailsAPI/getSize')

/* get size & amount when changing color*/
router.get('/getSize', async function(req, res, next) {

	try {
	   res.json(await size.getSize(req.query.id,req.query.color));
	   //console.log( typeof (type));
   } catch (err) { 
	   console.error(`Error while getting size `, err.message);
	   next(err);
   }

});
/* detail. */
router.get('/', async function(req, res, next) {

 	try {
		res.json(await detail.getDetails(req.query.id,req.query.color));
		//console.log( typeof (type));
	} catch (err) { 
		console.error(`Error while getting detailAPI `, err.message);
		next(err);
	}

});

module.exports = router;

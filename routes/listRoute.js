const express = require('express');
const router = express.Router();
const list = require('../API/listAPI/list.js');


/* GET product_basic inform. */
router.get('/:catergory', async function(req, res, next) {
  const type=req.params.catergory;
  if(type!="women"&&type!="men"&&type!="accessories")res.send("incorrect request(catergory needs to be women or men or accessories)");
  else{
  	try {
    		res.json(await list.getList(type,req.query.paging));
    		//console.log( typeof (type));
  	} catch (err) {
    		console.error(`Error while getting listAPI `, err.message);
    		next(err);
  	}
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const list = require('../API/searchAPI/search.js');

   /* GET search result. */
router.get('/', async function(req, res, next) {
        try {
                res.json(await list.getSearch(req.query.keyword,req.query.paging));
        
        } catch (err) {
                console.error(`Error while getting searchAPI `, err.message);
                next(err);
        }

});
  
module.exports = router;

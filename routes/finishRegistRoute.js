//ask for express module
const express = require('express'); 
const router = express.Router(); 
const create = require('../API/memberRegistAPI/memberRegist');
/* post information about members to memberRegistAPI */
 router.post('/', async function(req, res, next) {
    
  try {
        await create.createMember(req.body);
        res.redirect('/login');
  } catch (err) { 
        console.error(`Error while getting memberRegistAPI `, err.message);
        res.send(err.message);
      
  }

     

   });

  module.exports = router;
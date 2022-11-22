const db = require('../../service/db.js');
//const config = require('../../config.js');
const SqlString = require('sqlstring');
async function getSize(id,color){
  let id_int = parseInt(id, 10);
  let sql3=`select size, amount from product_inform where  product_id = ? && color = ?`;
  const product_detail = await db.query(sql3,[id_int,color]);
  //console.log(color);

  return {
    product_detail
  }
}

module.exports = {
  getSize
}
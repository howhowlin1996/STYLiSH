const db = require('../../service/db.js');
//const config = require('../../config.js');
const SqlString = require('sqlstring');
async function getDetails(id,color){
  let id_int = parseInt(id, 10);
  let sql1=`select a.product_title, a.product_id, DATE_FORMAT(a.created_day,\'%Y %M %d\') as create_day,a.image_addr,a.price,a.description,group_concat(distinct b.color) as color from product_basic as a, product_inform as b where a.product_id = ? && a.product_id=b.product_id group by a.product_id`;
  let sql2=`select description, image_addr from subtle_description where product_id = ? `;
  let sql3=`select size, amount from product_inform where  product_id = ? && color = ?`;
  const product_inform = await db.query(sql1,[id_int]);
  const product_subtle_description = await db.query(sql2,[id_int]);
  const product_detail = await db.query(sql3,[id_int,color]);
  //console.log(color);

  return {
    product_inform,product_detail,product_subtle_description
  }
}

module.exports = {
  getDetails
}

const db = require('../../service/db.js'); //ask database connection from db.js
var SqlString = require('sqlstring');
async function getSearch(keyword,page){
  if(typeof page=='undefined')page=0;
  let page_int = parseInt(page, 10);                   //change variable type from string to number
  let offset_num=page_int*6;                           // do the product id offset for page, one page for 6 items
  const total_num= await db.query("SELECT count(*) FROM product_basic where product_title like ?",['%'+keyword+'%']);
  let product_amount=parseInt(total_num[0]['count(*)'],10);
  let last_page=Math.floor(product_amount/6);
  let next_page=page_int+1;
  if(next_page*6>=product_amount)next_page=NaN;
  let sql =SqlString.format(`select a.product_title, a.product_id, DATE_FORMAT(a.created_day,'%Y %M %d') as create_day,a.image_addr,a.price,group_concat(distinct b.color) as color from product_basic as a, product_inform as b where a.product_title like ? && a.product_id=b.product_id group by a.product_id limit 6 offset ? `,['%'+keyword+'%',offset_num]);
  const product_inform = await db.query(sql); // processing db query

  return {
    product_inform,next_page,last_page       //return data to searchRoutes to return json file 
  }
}

module.exports = {
  getSearch
}

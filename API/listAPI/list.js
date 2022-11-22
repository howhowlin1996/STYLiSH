const db = require('../../service/db.js');
//const config = require('../../config.js');

async function getList(category,page){
  if(typeof page=='undefined')page=0;
  let page_int = parseInt(page, 10);
  let offset_num=page_int*6;
  //console.log(typeof catergory,typeof page_int)
  const total_num= await db.query("SELECT count(*) FROM product_basic where category = ?",[category]);
  //console.log(typeof total_num[0]['count(*)']);
  let product_amount=parseInt(total_num[0]['count(*)'],10);
  let last_page=Math.floor(product_amount/6);
  let next_page=page_int+1;
  if(next_page*6>=product_amount)next_page=NaN;
  //console.log(next_page*6,product_amount);
  let sql= "select a.product_title, a.product_id, DATE_FORMAT(a.created_day,\'%Y %M %d\') as create_day,a.image_addr,a.price,group_concat( distinct b.color) as color from product_basic as a, product_inform as b where a.category = ? && a.product_id=b.product_id group by a.product_id limit 6 offset ?";
  const product_inform = await db.query(sql,[category,offset_num.toString()]);
  

  return {
    product_inform,next_page,last_page
  }
}

module.exports = {
  getList
}

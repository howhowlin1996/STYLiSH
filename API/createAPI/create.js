const db = require('../../service/db.js');
const SqlString = require('sqlstring');

async function renewSql(data,file1_path,file2_path,file3_path){
  const product_id=data.product_id;
  const product_name=data.product_name;
  const price=data.price;
  const catergory=data.catergory;
  const material_origin=data.material_origin;
  const processing_origin=data.processing_origin;
  const material_description=data.material_description;
  const subtle_description1=data.subtle_description1;
  const subtle_description2= data.subtle_description2;
  let description="原料產地:"+material_origin+"/加工產地:"+processing_origin+"/產品描述:"+material_description;
  let catergory_eng; // to store english catergory

  if(catergory=="男裝")catergory_eng="men";           //change chinese catergory to english into database
  else if (catergory=="女裝")catergory_eng="women";
  else catergory_eng="accessories";


  let sql1=`insert into product_basic VALUES (?,?,now(),?,NULL,0,?,?,?)`;

  await db.query(sql1,[product_name,product_id,file1_path,price,description,catergory_eng]);
    for(var i=0;i<Object.keys(data.size).length;i++){
          let sql2=`Insert into product_inform VALUES (?,?,?,?)`;
          await db.query(sql2,[product_id,data.color[i],data.size[i],data.amounts[i]]);
          
    }
    
  let sql3=`Insert into subtle_description Values(?,?,?),(?,?,?)`;

  await db.query(sql3,[product_id,subtle_description1,file2_path,product_id,subtle_description2,file3_path]);


}
module.exports = {
    renewSql
}
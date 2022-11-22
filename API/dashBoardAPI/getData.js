const db = require('../../service/db.js');
//const config = require('../../config.js');

async function getRevenue(){
    let sql=` select sum(total) as total from dashBoard_total ;`
    const totalRevenue= await db.query(sql)

    return totalRevenue;
}


async function getDifferentColorSold(){
    let sql=` select color,sum(qty) as qty from dashBoard_detail group by color ;`
    const colorSold=await db.query(sql)
    let colorCode=[];
    let colorName=[];
    let qty=[];
    for(var i=0;i<Object.keys(colorSold).length;++i) {
        console.log(colorSold[i]["color"]["code"],colorSold[i]["qty"]);
        colorCode.push(colorSold[i]["color"]["code"]);
        colorName.push(colorSold[i]["color"]["name"]);
        qty.push(colorSold[i]["qty"])
    }
    return {colorCode,colorName,qty};

}

async function getPriceQuantity(){
    let sql=` select price from dashBoard_detail ;`
    const priceQuant=await db.query(sql);
    let price=[];
    for(var i=0;i<Object.keys(priceQuant).length;++i)price.push(priceQuant[i]["price"])
    return price;
}

async function getProductSoldRank(){
    let sql=`select id ,sum(qty) as total  from dashBoard_detail group by id order by total DESC  limit 5;`;
    const soldRank=await db.query(sql);
    let soldQty=[];
    let id=[];
    let sizeQty=[]
    for(var i=0;i<Object.keys(soldRank).length;++i){
        id.push(soldRank[i]['id']);
        soldQty.push(soldRank[i]["total"]);
    }
    for(var i=0;i<id.length;i++){
        sql=`select size,sum(qty) as total  from dashBoard_detail  where id=?  group by size;`
        const sizeQuantity=await db.query(sql,[id[i]]);
        let qty=[0,0,0];
        for(var j=0;j<Object.keys(sizeQuantity).length;++j){
            size=sizeQuantity[j]['size'];
            switch(size){
                case "S":
                    qty[0]=sizeQuantity[j]['total'];
                    break;
                case "M":
                    qty[1]=sizeQuantity[j]['total'];
                    break;
                case "L":
                    qty[2]=sizeQuantity[j]['total'];
                    break;
            }
        }
       
      
        sizeQty.push(qty)
    }
    //console.log(soldRank);
    //console.log(size);
    return{id,soldQty,sizeQty};
}



async function getData(){
  let revenue=await getRevenue();
  let colorAndQty= await getDifferentColorSold();
  let priceQuant=await getPriceQuantity();
  let soldRank= await getProductSoldRank();
  console.log(revenue,"here");
  return {
     revenue,colorAndQty,priceQuant,soldRank
  }
}

module.exports = {
  getData
}
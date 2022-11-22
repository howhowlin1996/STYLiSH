const db = require('../../service/db.js');
async function crawler( ){
    console.log("howhow")
    api_url="http://35.75.145.100:1234/api/1.0/order/data";
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const response = await fetch(api_url);
    const data = await response.json();
    
   
    for(var i=0;i<Object.keys(data).length;i++){
        
        let total=data[i]['total'];
        let list=data[i]['list'];
        /*console.log(data[i]['list'][0]['id']);
        console.log(data[i]['list'][0]['price']);
        console.log(data[i]['list'][0]['color']);
        console.log(data[i]['list'][0]['size']);
        console.log(data[i]['list'][0]['qty']);
        console.log(data[i]['total']);*/
        let insertDashBoardTotal=`INSERT INTO dashBoard_total values(?,?)`;
        await db.query(insertDashBoardTotal,[i,total]);
        //console.log(list);
        for(var j=0;j<Object.keys(list).length;j++){
            let id=list[j]['id'];
            let price=list[j]['price'];
            let color=list[j]['color'];
            let size=list[j]['size'];
            let qty=list[j]['qty'];
            let insertDashBoardDetail=`INSERT INTO  dashBoard_detail values(?,?,?,?,?,?)`;
            await db.query(insertDashBoardDetail,[id,price,color,size,qty,i]);
            //console.log(i,id,price,color,size,qty);
        }
       
    }
   
}








crawler();



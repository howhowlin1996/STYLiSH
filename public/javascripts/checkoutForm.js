var divDom=document.getElementById('form');
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id')
console.log(myParam);
showCart();
function showCart(){
    fetch("http://http://localhost:3000/api/v1/orders/unpaid?id="+myParam,{ //fetch data from getUnpaidOrder
    method:'get',
    headers:{
        'content-type': 'application/json',
      }
    })
    .then(res => res.text())
    .then(body => {

        let body_json;
        try {
            body_json= JSON.parse(body);
            //console.log(body_json.length);
            let expense=0;
            for(var i=0;i<body_json.length;i++){
                const product_title=body_json[i]['product_title'];
                const color=body_json[i]['color'];
                const size=body_json[i]['size'];
                const amount=body_json[i]['amount'];
                const total_consume=body_json[i]['total_consume'];
                const para=document.createElement("p");
                const node = document.createTextNode("商品: "+product_title+" 顏色:"+color+" 尺寸:"+size+" 數量:"+amount+" 金額:"+total_consume);
                para.appendChild(node);
                divDom.appendChild(para);
                //console.log(body_json[i]['color']);
                expense+=total_consume;
            }
            const para=document.createElement("p");
            const node = document.createTextNode("總消費: "+expense);
            para.appendChild(node);
            divDom.appendChild(para);
        } catch {
            throw Error(body);
        }
    })
}


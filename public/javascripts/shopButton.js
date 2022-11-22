var productDom=document.getElementById('product_name');               //get id from select input
var sizeDom=document.getElementById('size');                          
var colorDom=document.getElementById('color');                       
var sendButtonDom=document.getElementById('sendButton');               //get id from send button input
var priceDiv=document.getElementById('priceDiv');                       
var amountDom=document.getElementById('amounts');
var userInformDom=document.getElementById('userInformButton');
var shopCartDom=document.getElementById('shopCartButton');
productDom.addEventListener('change',productChange);                    // add change evente listner to product and color
sendButtonDom.addEventListener('click',sendClick);                      //add click event listner to sebd button
colorDom.addEventListener('change',colorChange);
userInformDom.addEventListener('click',userInformPage);
shopCartDom.addEventListener('click',shopCartChange);
let id,goodAmount=0,user_id;
//document.cookie = 'test1=Hello';
//console.log("cookie",document.cookie.includes("howhow"));
if(!document.cookie.includes("howhow")){
  
    window.onload = function() {
        location.href = "/login";
    }
}
else{
    try {
       
        let jwst=document.cookie.slice(7,-1);      //retrieve jwt 
        jwst=jwst.split('.')[1];                   // retrieve payload
        const pattern1=/-/g;
        const pattern2=/_/g;
        jwst=jwst.replace(pattern1, "+").replace(pattern2, "/"); //replace pattern to fit base64
        //console.log(jwst);
        const token=JSON.parse(atob(jwst));
       // todo:for the wrong token
       //console.log(token);
       user_id=token['user_inform'][0]['id'];
       //console.log("error",token['user_inform']);
     } catch (e) {
       console.log(e);
     }
}
getColor(productDom.value);


function getColor(product_name){                                            // renew color select and send id & color to getSize()
    if(colorDom.options.lengt!=0)colorDom.options.length=0;
    fetch("http://18.236.9.61/api/v1/products/search?keyword="+product_name,{ //fetch data from searchApi
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
            price=body_json['product_inform'][0]['price'];
            priceDiv.innerHTML="價格:"+price+"元/件";
            id=body_json['product_inform'][0]['product_id'];
            var colorArr=body_json['product_inform'][0]['color'].split(',');
            for(let i=0;i<colorArr.length;i++)colorDom.add(new Option(colorArr[i]));
            getSize(id,colorArr[0]);
        } catch {
            throw Error(body);
        }
    })
    
}
function getSize(id,color){                                                      //renew size select input, fetch data from detail api
    if(sizeDom.options.lengt!=0)sizeDom.options.length=0;                       //clear select option to insert new one
    fetch("http://18.236.9.61/api/v1/products/details?id="+id+"&&color="+color,{ 
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
            //console.log(body_json['product_detail'][0]['amount']);
            for(let i=0;i<body_json['product_detail'].length;i++) {
                const size=body_json['product_detail'][i]['size'];
                sizeDom.add(new Option(size));                              //change size select option
            }
           

        } catch {
            throw Error(body);
        }
    })

}


function productChange(e){               //if product change, renew color and size
    
    getColor(e.target.value);
    
}

function colorChange(e){                // if color change, renew size
   
    getSize(id,e.target.value);

}


function sendClick(e){
    let amountChoose=amountDom.value;
    let colorChoose=colorDom.value;
    let sizeChoose=sizeDom.value;
    //console.log(id,colorChoose, sizeChoose,amountChoose);
    goodAmount++;
   
    fetch("http://18.236.9.61/api/v1/sendOrders",{
        method:'post',
        headers:{
            'content-type': 'application/json',
          },
        body:  JSON.stringify({
            user_id:user_id,
            product_id:id,
            color:colorChoose,
            size:sizeChoose,
            amount:amountChoose,
            total_consume:price*amountChoose
        })
    })
    .catch(err=>{
        console.log(err);
    })
    priceDiv.innerHTML="商品:"+productDom.value+" "+amountChoose+"件<br>"+"共"+price*amountChoose+"元<br>"+"購買成功<br>請見購物車";
     //window.open("http://127.0.0.1:3000/api/v1/sendOrders");
    
}

function userInformPage(e){
    window.open("http://18.236.9.61/memberProfile")     //button for 會員資料

}

function shopCartChange(e){
    //console.log(user_id);
    window.open("http://18.236.9.61/admin/checkout.html?id="+user_id);  //button for shopcart
}
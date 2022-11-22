import React, { useState,useEffect,useCallback} from 'react';
import NavbarDiv from './titleBar';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,Table} from 'reactstrap';
import NavbarFooterDiv from './footer';
import {useNavigate} from "react-router-dom";


var user_id=2;
var deliveryInform={
    order_id :0,
    delivery_nation:"臺灣及離島",
    delivery_way:"宅配貨到付款",
    delivery_name:"",
    phone:"",
    address:"",
    delivery_time:"08:00-12:00",
    order_total_consume :0
}
const TitleSpan=styled.span`
    font-family: NotoSansCJKtc;
    margin-Bottom:2.1%;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;

`
const TableHead=styled.th`
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;

    

`

const DetailTitle=styled.span`
  
  font-family: NotoSansCJKtc;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: left;
  color: #3f3a3a;
`
const ProductSpan=styled.span`
    margin-bottom:10px;
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    text-align: left;
    color: #3f3a3a;
`
const IdSpan=styled.span`
    margin-bottom:10px;
    font-size: 16px;
    font-family: NotoSansCJKtc;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    text-align: left;
    color: #3f3a3a;
`
const AmountButtonDiv=styled.div`
    width:30%;
    height:100%;
    border: solid 1px #979797;
`
const SelectInput=styled.select`
    width:50%;
    hwight:50%;
    font-family:PingFangTC;
    font-size: 16px;
    margin:auto;

`
const SelectTitle=styled.span`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;
    margin-right:15px;

`

const UserInformSpan=styled.span`
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;
    margin-right:2.6%;

`

const UserInformInput=styled.input`
    width:50%;
    height:30px;
`

const CheckboxInput=styled.input`
    margin-left:10px;
    margin-right:10px;
    border-radius:50%;
`
const LabelSpan=styled.span`
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;

`
const Rectangle=styled.div`
    width:100%;
    height:1px;
    background-color: #3f3a3a;
    margin-bottom:10px;
`

const ConfirmSpan=styled.span`
    font-family: NotoSansCJKtc;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;

`


const ButtonSpan=styled.button`
      width: 100%;
      font-family: NotoSansCJKtc;
      font-size: 100%;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: 4px;
      text-align: center;
      color: #fff;
      background-color: black;
      margin-bottom:100px;
      
`


const ColorDiv=styled.div`height:60%;aspect-ratio:1;display:inline-block;margin-right:10px;padding-left:0px;`;
function checkInformFullfill(){
    console.log(deliveryInform);
    var shopCartList=localStorage.getItem('shopCart'+user_id);
    var unpaidList=JSON.parse(shopCartList);
    var itemnum=0;
    for(var i=0;i<Object.keys(unpaidList).length;++i){
        if(unpaidList[i]['delete']!=1){
            itemnum++;
        }
    }
    
    if(deliveryInform['delivery_name'].length==0||deliveryInform['address'].length==0||deliveryInform['phone'].length==0){
        alert("資料需填寫完整");
        return false;
    }
    if(shopCartList===null||itemnum===0) {
        alert("未購買商品")
        return false;
    }

    else return true;
}
async function SendOrders(totalUnpayment){
    var shopCartList=localStorage.getItem('shopCart'+user_id);
    var unpaidList=JSON.parse(shopCartList);
   console.log('sendorders',totalUnpayment);
    
    await fetch("https://18.236.9.61/api/v1/sendOrders",{
        method:'post',
        headers:{
            'content-type': 'application/json',
            },
        body:  JSON.stringify({
            user_id:user_id,
            consume_detail:unpaidList,
            total_consume:totalUnpayment,
           
        })

    })
    .then((result)=>{
        console.log(result);
       
        }
    )
    .catch(err=>{
        console.log(err);
    })
    
    
    
}
async function Delivery(totalUnpayment){
    deliveryInform['order_total_consume']=totalUnpayment;
   
    console.log('delivery',totalUnpayment);
    await fetch("https://18.236.9.61/api/v1/delivery/insert",{
                    method:'post',
                    headers:{
                        'content-type': 'application/json',
                        },
                    body:  JSON.stringify({
                        address: deliveryInform['address'],
                        delivery_name: deliveryInform['delivery_name'],
                        delivery_nation: deliveryInform['delivery_nation'],
                        delivery_time: deliveryInform['delivery_time'],
                        delivery_way: deliveryInform['delivery_way'],
                        user_id:user_id,
                        order_total_consume: deliveryInform['order_total_consume'],
                        phone: deliveryInform['phone']

                    })

                })
                .then((result)=>{
                console.log(result);
                console.log('hahahahaha');
                
                
                })
                .catch(err=>{
                console.log(err);
                })
   
}

function deleteItem(order,buttonNum,id){
    order[buttonNum]['delete']=1;
    console.log(order,buttonNum,id);
    var totalUnPaidConsume=0;
    for(var i=0;i<Object.keys(order).length;++i){
        if(order[i]['delete']!=1){
            var total_consume=order[i]['total_consume'];
            totalUnPaidConsume+=total_consume;
        }
    }
    localStorage.removeItem('shopCart'+user_id);
    localStorage.setItem('shopCart'+user_id,JSON.stringify(order))
    
    return totalUnPaidConsume;
}

function changeAmount(order,buttonNum,amount){
    
    if(amount<1)amount=1;
    
    if(amount>order[buttonNum]['maxAmount']){
        alert("超過上限"+order[buttonNum]['maxAmount']+"件");
        amount=order[buttonNum]['maxAmount'];
    }
    order[buttonNum]['amount']=amount;
    order[buttonNum]['total_consume']=order[buttonNum]['price']*order[buttonNum]['amount'];
    var totalUnPaidConsume=0;
    for(var i=0;i<Object.keys(order).length;++i){
        if(order[i]['delete']!=1){
            var total_consume=order[i]['total_consume'];
            totalUnPaidConsume+=total_consume;
        }
    }
    localStorage.removeItem('shopCart'+user_id);
    localStorage.setItem('shopCart'+user_id,JSON.stringify(order))
    
    return totalUnPaidConsume;



}


function AmountButton(props){
    var id=props.id;
    //console.log(id,"amount");
    var amountState=props.order[id]['amount'];
    
    return(
          <AmountButtonDiv>
              <button  type="button"style={{width:"25%",height:"100%",border:"0px"}} onClick={()=>{amountState--;props.unpaidFunction(changeAmount(props.order,id,amountState))}}>-</button>
              <input name="amountText" type="text" maxLength="2"style={{width:"50%",height:"100%",border:"0px",textAlign:"center"}}value={amountState} onInput={(e)=>{amountState=e.target.value;props.unpaidFunction(changeAmount(props.order,id,amountState))}}></input>
              <button  type="button"style={{width:"25%",height:"100%",border:"0px"}} onClick={()=>{amountState++;props.unpaidFunction(changeAmount(props.order,id,amountState))}}>+</button>
          </AmountButtonDiv>
          
    );
  
  
}



function ProductInform(props){
    console.log(props.data);
    
    const img_path='uploads/'+props.data['product_id']+'/'+props.data['image_addr'];
    console.log(img_path)
    return(
        
      <div>
        <Row   style={{marginBottom:"10px"}}> 
          <Col xs="12" md="7" lg="5" >
                <img  src={img_path} style={{width:"114px",height:"151px"}}></img>
          </Col>
  
          <Col xs="12" md="5" lg="7" >
            <Row>
                <ProductSpan>{props.data['product_title']}</ProductSpan>
            </Row>
            <Row>
                <IdSpan>{props.data['product_id']}</IdSpan>
            </Row>
            <Row style={{display:"flex"}}>
               <DetailTitle>顏色｜<ColorDiv style={{backgroundColor:'#'+props.data['color'],boxShadow:"2px 2px 5px #000"}} ></ColorDiv></DetailTitle>
            </Row>
            <Row>
                <DetailTitle>尺寸｜{props.data['size']}</DetailTitle>
            </Row>
            
          </Col>
        </Row>

    </div>
  
    );
  
  
}



function ShopCartTable(props){
        const [removeMove,removeMoveChange]=useState(0);

        const removeIcon=["cart-remove.png","cart-remove-hover.png"];
        var buttonNum=-1;
        //console.log(props.data);
        var shopCartList=props.data;
        var totalUnPaidConsume=0;
        var unpaidList=[];
        for(var i=0;i<Object.keys(shopCartList).length;++i){
            unpaidList.push(shopCartList[i]);
            if(shopCartList[i]['delete']!=1){
                var total_consume=shopCartList[i]['total_consume'];
                totalUnPaidConsume+=total_consume;
            }
        }
      
        //console.log(totalUnPaidConsume);
        return(
            <Table hover>
                <thead>
                    <tr>
                    <TableHead>
                        購物車
                    </TableHead>
                    <TableHead>
                        數量
                    </TableHead>
                    <TableHead>
                        單價
                    </TableHead>
                    <TableHead>
                        小計
                    </TableHead>
                    <TableHead>
                        
                    </TableHead>
                    </tr>
                </thead>
                {   unpaidList.map((order)=>{
                            buttonNum+=1;
                            if(order['delete']==1) return false;
                            return(
                                <tbody key={buttonNum}>
                                    <tr>
                                    <th scope="row">
                                        <ProductInform data={order}/>
                                    </th>
                                    <td >
                                         <AmountButton   id={buttonNum}  order={shopCartList} unpaidFunction={props.parentCallback}/>
                                    </td>
                                    <td>
                                        {order['price']}
                                    </td>
                                    <td>
                                        {order['amount']*order['price']}
                                    </td>
                                    <td>
                                        <img id={buttonNum} src={removeIcon[0]} style={{width:"35px",height:"35px"}} onClick={(e)=>{ props.parentCallback(deleteItem(shopCartList,e.target.id));}}></img>
                                        
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                );
                    })
                 

                }
                


            </Table> 
        );
        
}

function PaymentInform(){
    const [clickRadio,onClickChange]=useState(0);
    var clickChecked=["","",""];
    clickChecked[clickRadio]="checked";

    return(
        <Table hover borderless>
            <tbody>
                <tr>
                    <th scope="row">
                        <UserInformSpan>
                            收件人姓名
                        </UserInformSpan>
                        
                    </th>
                    <td>
                        <UserInformInput type={"text"} onBlur={(e)=>{deliveryInform['delivery_name']=e.target.value}}></UserInformInput>
                        
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        
                    </th>
                    <td style={{color:"#7F462C",textAlign:"right"}}>
                            務必填寫完整收件人姓名，避免包裹無法順利簽收
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <UserInformSpan>
                            手機
                        </UserInformSpan>
                        
                    </th>
                    <td>
                        <UserInformInput type={"text"} onBlur={(e)=>{deliveryInform['phone']=e.target.value}}></UserInformInput> 
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <UserInformSpan>
                            地址
                        </UserInformSpan>
                        
                    </th>
                    <td>
                        <UserInformInput type={"text"}onBlur={(e)=>{deliveryInform['address']=e.target.value}}></UserInformInput>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <UserInformSpan>
                            配送時間
                        </UserInformSpan>
                        
                    </th>
                    <td>
                       <CheckboxInput type={"radio"} name="first_time" checked={clickChecked[0]}  onClick={(e)=>{onClickChange(0);deliveryInform['delivery_time']=e.target.value;}} onChange={(e)=>{}}></CheckboxInput>
                       <label ><LabelSpan>08:00-12:00</LabelSpan></label>
                       <CheckboxInput type={"radio"} name="second_time" checked={clickChecked[1]}  onClick={(e)=>{onClickChange(1);deliveryInform['delivery_time']=e.target.value;}} onChange={()=>{}}></CheckboxInput>
                       <label ><LabelSpan>14:00-18:00</LabelSpan></label>
                       <CheckboxInput type={"radio"} name="unpointed" checked={clickChecked[2]}  onClick={(e)=>{onClickChange(2);deliveryInform['delivery_time']=e.target.value}} onChange={()=>{}}></CheckboxInput>
                       <label><LabelSpan>不指定</LabelSpan></label>
                    </td>
                </tr>
                
            </tbody>


        </Table> 
    );



}

function ConfirmTable(props){
        var fee;
       
        return(
            <Table  borderless>
            <tbody>
                <tr>
                    <th scope="row">
                        <ConfirmSpan>
                            總金額
                        </ConfirmSpan>
                        
                    </th>
                    <td style={{textAlign:"right"}}>
                       <ConfirmSpan>
                           NT.<span style={{fontSize:"19px"}}> {props.data}</span>
                       </ConfirmSpan>
                        
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <ConfirmSpan>
                            運費
                        </ConfirmSpan>
                        
                    </th>
                    <td style={{textAlign:"right"}}>
                       <ConfirmSpan>
                           NT.<span style={{fontSize:"19px"}}> {props.data>500?fee=0:fee=30}</span>
                       </ConfirmSpan>
                        
                    </td>
                </tr>
                <div style={{border:"solid black 1px", width:"250%",display:"inline-block"}}></div>
                <tr>
                    <th scope="row">
                        <ConfirmSpan>
                            應付金額 
                        </ConfirmSpan>
                        
                    </th>
                    <td style={{textAlign:"right"}}>
                       <ConfirmSpan>
                           NT.<span style={{fontSize:"19px"}}>{fee+props.data}</span>
                       </ConfirmSpan>
                        
                    </td>
                </tr>
                

               
               
                
            </tbody>


        </Table> 
        );

}












function ShopCart (){
    //GetUnpaidList();
    const navigate=useNavigate();
    var shopCartList=localStorage.getItem('shopCart'+user_id);
    var unpaidList=[];
    if(shopCartList!=null)unpaidList=JSON.parse(shopCartList);
    var totalUnPaidConsume=0;
    var productNum=0;
    for(var i=0;i<Object.keys(unpaidList).length;++i){
        if(unpaidList[i]['delete']!=1){
            totalUnPaidConsume+=unpaidList[i]['total_consume'];
            productNum++;
        }
    }
    const [totalConsumption,ConsumptionChange]=useState(totalUnPaidConsume);
    const parentConpsumption=useCallback((consumption)=>{ConsumptionChange(consumption);},[]);
    

    /*if(unpaidList.length==0||productNum==0){
        return(
            <div style={{textAlign:"center"}}>
                <h1>購物車是空的</h1>
            </div>
        );

    }
    else{*/
        
    return (
        
        <div>
            <Row>
                <NavbarDiv/>
            </Row>

            <Row>
                <div style={{height:"50px",width:"100%",backgroundColor:"black"}}></div>
            </Row>

            <Row  style={{marginRight:"20%",marginLeft:"20%",width:'60%',marginTop:'2%'}}   >
                <TitleSpan>
                    HOME {'>'} BAG
                </TitleSpan>
                <ShopCartTable parentCallback={parentConpsumption} data={unpaidList}/>
            </Row>
            <Row style={{marginRight:"20%",marginLeft:"20%",width:'60%',marginTop:'2%',marginBottom:'2%',height:'74px',backgroundColor:'#f3f3f3'}}>
                    <Col xs="12" md="5" lg="5" style={{marginTop:"auto",marginBottom:"auto"}}>
                        <SelectTitle>
                            配送國家
                        </SelectTitle>
                        <SelectInput onChange={(e)=>{deliveryInform['delivery_nation']=e.target.value}}>
                            <option>臺灣及離島</option>
                            <option>國外</option>
                        </SelectInput>
                        
                    
                    </Col>   
                    <Col xs="12" md="5" lg="5" style={{marginTop:"auto",marginBottom:"auto"}}>
                        <SelectTitle>
                            送貨方式
                        </SelectTitle>
                        <SelectInput onChange={(e)=>{deliveryInform['delivery_way']=e.target.value}}>
                            <option>宅配貨到付款</option>
                            <option>便利商店取件</option>
                        </SelectInput>
                    
                    </Col> 

            </Row>
            <Row  style={{marginRight:"20%",marginLeft:"20%",width:'60%',marginTop:'2%'}}>
                <TitleSpan>
                    訂購資料
                </TitleSpan>
                <Rectangle></Rectangle>
                <PaymentInform/>
                <Rectangle></Rectangle>
                <Row  style={{marginLeft:"70%",width:'30%',marginTop:'2%',marginBottom:'2%'}}>
                        <ConfirmTable data={totalConsumption}/>
                        <ButtonSpan onClick={()=>{
                            if(checkInformFullfill())
                            {   const sendInform =async()=>{
                                    await SendOrders(totalUnPaidConsume); 
                                    await Delivery(totalUnPaidConsume);
                                    navigate("/payMent",{ replace: true });
                                }

                                sendInform();
                                
                                
                                
                            }
                        }
                    }>確認付款</ButtonSpan>
                </Row>
                
            </Row>
            
        

            <NavbarFooterDiv/>
        </div>

    
    );
    //}

}

export default ShopCart;
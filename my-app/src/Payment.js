import React, { useState,useEffect} from 'react';
import NavbarDiv from './titleBar';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,Table} from 'reactstrap';
import NavbarFooterDiv from './footer';
var TPDirect;
var name,phone,email;
var userId=2;

const CardRow=styled.div`
    width:50%;
    font-family: NotoSansCJKtc;
    display:flex;
    margin-up:100px;
`
const Carditle=styled.div`
        width:100px;
        margin-bottom:10px;
`
const CardInput=styled.input`
        width:200px;
        height:30px;
        margin-bottom:10px;
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
const ButtonSpan=styled.input`
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

function TapPayScript(url){
        useEffect(()=>{
            let scriptCheck = document.querySelector(`script[src="${url}"]`);
            const script = document.createElement('script');
            if(!scriptCheck){

                script.src = url;
                script.async = true;
              
                document.body.appendChild(script);
                
               
                script.onload = () => {
                        var check=document.querySelector("card-field");
                        //console.log(check);
                        TPDirect=window.TPDirect;
                        if(typeof TPDirect!==undefined){
                            TPDirect.setupSDK(12348, "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF", "sandbox");
                            TPDirect.card.setup("#cardview-container");

                        } 
                }

            }
            return () => {
              document.body.removeChild(script);

            }
        },[])
        
}


function TapPay(){
    
    return(
        <Row style={{margin:"auto",width:"50%"}}>
            <div style={{marginLeft:"0px"}}>
            <Col xs="12" md="12" lg="12">
            <CardRow >
                <Carditle>持卡人姓名</Carditle>
                <CardInput  type="text" name="name" required="required"id="name" onBlur={(e)=>{name=e.target.value;}}/>
            </CardRow>
            </Col>
            <Col xs="12" md="12" lg="12">
            <CardRow>
                <Carditle>持卡人電話</Carditle>
                <CardInput type="tel" name="phoneNumber" required="required"id="phoneNumber"onBlur={(e)=>{phone=e.target.value;}}/>
            </CardRow>
            </Col>
            <Col xs="12" md="12" lg="12">
            <CardRow>
                <Carditle>email</Carditle>
                <CardInput  type='email' name="email" required="required"id="email"onBlur={(e)=>{email=e.target.value;}}/>
            </CardRow>
            </Col>
            </div>
            
            <div id="cardview-container"></div>
            <ButtonSpan type="submit" id="submit-button" style={{ fontFamily: "NotoSansCJKtc",width:"30%",margin:"auto",marginBottom:"100px"}} onClick={()=>{Pay()}} value="付款"/>
            <pre id="result1"></pre>
            <pre id="result2"></pre>
        </Row>

    );
}

function ProductInform(props){

    return(
        
      <div>
        <Row   style={{marginBottom:"10px"}}> 
        
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
    const unpaidList=props.data;
    if(unpaidList[0]===undefined)return;
    //console.log( typeof Object.values (unpaidList[0]['consume_detail']),'here');
   
    var buttonNum=-1;
    var totalUnpaid=0;
    return(
        <Table hover style={{marginLeft:"25%",marginRight:"25%",width:"50%"}}>
            <thead>
                <tr>
                <TableHead>
                    項目
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
             
                </tr>
            </thead>
            {   Object.values (unpaidList[0]['consume_detail']).map((order)=>{
                        //console.log(order);
                        buttonNum+=1;
                        
                        //console.log(order);
                        if(order['delete']==1) {
                            //console.log(order['product_title'])
                            return false;
                        }
                        totalUnpaid+=order['total_consume'];
                        return(
                            <tbody key={buttonNum}>
                                <tr>
                                <th scope="row">
                                    <ProductInform data={order}/>
                                </th>
                                <td >
                                    {order['amount']}
                                </td>
                                <td>
                                    {order['total_consume']/order['amount']}
                                </td>
                                <td>
                                    {order['total_consume']}
                                </td>
                                </tr>
                                
                            </tbody>
                            );
                })
             

            }
             
                <tr>
                <th scope="row">
                    {"總計"}
                </th>
                <td >
                    
                </td>
                <td>
                    
                </td>
                <td>
                    {totalUnpaid}
                </td>
                </tr>
                                
                           
            


        </Table> 
    );
    
}



function Pay(){
    console.log(name,phone,email);
    if(name===undefined||phone===undefined||email===undefined) alert("請完整填寫資料");
    TPDirect.card.getPrime(function (result) {
        if (result.status !== 0) {
            alert('卡號或驗證碼有誤')
            return
        }
        //alert('getPrime 成功')
        var prime = result.card.prime
    
        //console.log(prime,name,phone);
        fetch("http://localhost:3000/api/v1/payment/pay-by-prime?id="+userId,{
            method:'post',
            headers:{
                'content-type': 'application/json',
                },
            body:  JSON.stringify({
                prime: prime,
                name: name,
                phone:phone,
                email:email
            })

        })
        .then((response) => response.json())
        .then((data)=>{
            if(Object.keys(data).length==0) alert("未購買商品");
            else{
                let status=data["result"]['status']
                if(status==0){
                    alert('付款成功');
                    localStorage.removeItem('shopCart'+userId);
                    window.location.href = "http://localhost:3000";
                }
                else alert('付款失敗');
            }
        })
        .catch(err=>{
            console.log(err);
        })
      
    })
    




}







function Payment (){
    const [unpaidList,changeUnpaidList]=useState([]);
    TapPayScript("https://js.tappaysdk.com/tpdirect/v5.8.0");
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/orders/unpaid?id="+userId)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result,"hahaha");
              changeUnpaidList(result)
            },
            (error) => {
              console.log(error);
            }
          )
      }, []);
    
      console.log('here');
   
        
        return (
            <div>
                <Row>
                    <NavbarDiv data={"women"}/>
                </Row>

                <Row>
                    <div style={{height:"50px",width:"100%",backgroundColor:"black"}}></div>
                </Row>
                <ShopCartTable data={unpaidList}/>

                <TapPay/>
              

                <NavbarFooterDiv/>
            </div>

        
    );
   

}


export default Payment;
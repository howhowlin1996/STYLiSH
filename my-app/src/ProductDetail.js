import React, { useState , useEffect } from 'react';
import NavbarDiv from './titleBar';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col} from 'reactstrap';
import NavbarFooterDiv from './footer';
import {useLocation} from "react-router-dom";
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
var productData={
    user_id:2,
    product_id:0,
    color:'red',
    size:'X',
    price:0,
    amount:0,
    total_consume:0,
    maxAmount:0,
    product_title:"",
    delete:0,
    image_addr:""

}

//margin-top/margin-right/margin-bottom/margin-left/height*4/width*5/2796/1920
const ProductSpan=styled.span`
  height: 1.36%;
  margin: 0 23.20% 2.28% 10.9%;    
  font-family: NotoSansCJKtc;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.33vw;
  text-align: left;
  color: #3f3a3a;
`

const IdSpan=styled.span`
  height: 0.9%;
  margin: 2.28% 61.70% 5.72% 10.9%;
  font-family: NotoSansCJKtc;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.21vw;
  text-align: left;
  color: #bababa;
`
const Productimg=styled.img`
  width:100%;
  aspect-ratio:3/4;
`
const PriceSpan=styled.span`
  height: 1.29%;
  margin: 5.72% 61.45% 2.88% 10.4%;
  font-family: NotoSansCJKtc;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3f3a3a;
`

const RectangleDiv=styled.div`
  width:80%;
  height:1px;
  margin: 4.16% 0 6.24% 10.4%;
  display:inline-block;
  background-color:black;
`

const DetailTitle=styled.span`
  
  font-family: NotoSansCJKtc;
  font-size: 5%;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.21vw;
  text-align: left;
  color: #3f3a3a;
  margin-top:auto;
  margin-bottom:auto;
`
// color selection button
const ColorSelectRec=styled.div`
  width: 15px;
  height: 15px;
  background-color:black;
`
const ColorSelectConfirm=styled.div`
  width: 24px;
  height: 24px;
  margin: 0 5.21% 0 4%;
  display:flex;
  justify-content:center;
  padding-top:3.5px
`

const DetailSelectDiv=styled.div`
  display:flex;
  margin: 4.56% 5.47% 4.56% 10.4%;
  vertical-align:center;
`

const OvalButton=styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0 5.21% 0 4%;
  padding-top:3px;
  background-color: #ececec;
  color: #3f3a3a;
  display:flex;
  justify-content:center;
 
`


const SizeButton=styled.div`
    width: 12px;
    height: 12px;
    font-family: NotoSansCJKtc;
    font-size: 8px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
    
`
const AmountButtonDiv=styled.div`
    width:41.67%;
    height:100%;
    margin: 0 5.21% 0 4%;
    border: solid 1px #979797;

`

const DescriptionSpan=styled.span
`
    width: 55%;
    height: 40%;
    margin: 4.16% 0 6.24% 10.4%;
    font-family: NotoSansCJKtc;
    font-size: 5%;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #3f3a3a;

`

const BuyButtonButton=styled.button`
    width: 93.75%;
    height: 8.58%;
    margin: 4.15% 0 5.72% 10.42%;
    border: solid 1px #979797;
    background-color: black;
    color:white;
    text-align:center;
    font-size:16px;
`



const SubtlePictureDiv=styled.div`
      margin: 7.1% 52.1% 1 0;
`

const SubtleDescriptionTitle=styled.span`
        
      height: 4.29%;
      margin: 0 9.16% 0 0;
      font-family: NotoSansCJKtc;
      font-size: 5%;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: 4px;
      text-align: left;
      color: #7F462C;
`

const RectangleCopyDiv=styled.span`
      width:120%;
      height: 1px;
      margin: 0 8% 0 0;
      display:inline-block;
      background-color: #3f3a3a;

`

const SubtleDescriptionContent_1=styled.span`
        height: 5.4%;
        margin: 1.69% 0 1.69%;
        font-family: NotoSansCJKtc;
        font-size: 5%;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #3f3a3a;

`

function sendOrders(){
  //console.log(localStorage.getItem('shopCart'+productData['user_id']));
  var shopCart=localStorage.getItem('shopCart'+productData['user_id']);
  var productList={};
  productData['total_consume']=productData['price']*productData['amount'];
  if( shopCart==null) {
    productList[0]=productData;
    localStorage.setItem('shopCart'+productData['user_id'],JSON.stringify(productList));
    shopCart=localStorage.getItem('shopCart'+productData['user_id']);
    //console.log(typeof JSON.parse(shopCart),"null");
  }
  else{
    //console.log(typeof shopCart);
      shopCart=JSON.parse(shopCart);
      var num=Object.keys(shopCart).length;
      var colorThis=productData['color'];
      var productIdthis=productData['product_id'];
      var sizeThis=productData['size'];
      var existFlag=0;
      //console.log("here");
      for(var i=0;i<num;++i){
        if(shopCart[i]['delete']!=1&&productIdthis==shopCart[i]['product_id']&&colorThis==shopCart[i]['color']&&sizeThis==shopCart[i]['size']){
          shopCart[i]['amount']+=productData['amount'];
          shopCart[i]['total_consume']+=productData['total_consume'];
          //console.log("here",i);
          existFlag=1;
          break;
        }
      }
      if(existFlag==0) shopCart[num]=productData;
      localStorage.removeItem('shopCart'+productData['user_id']);
      localStorage.setItem('shopCart'+productData['user_id'],JSON.stringify(shopCart));
  }

  shopCart=localStorage.getItem('shopCart'+productData['user_id']);
  //console.log(shopCart);
  alert("購買成功");
  window.location.reload();

 
  
}

function ColorRow(props){                                          //color will include size & amount because it will change both
  var product_inform=props.data['product_inform'];
  const colors=product_inform[0]['color'].split(",");
  const [colorState,colorChoose]=useState(colors[0]);
  const [sizeList,setSize] = useState([]);
  useEffect(() => {
    fetch("https://18.236.9.61/api/v1/products/details?id="+props.idnow+"&&color="+colorState)
      .then(res => res.json())
      .then(
        (result) => {
          setSize(result['product_detail']);
          
         
        },
        (error) => {
          console.log(error);
        }
      )
  }, [colorState]);
  var colorSelect=[];
  for(var i=0;i<colors.length;i++){
      if(colors[i]===colorState){
          colorSelect.push("1px solid black");
      }
      else colorSelect.push("");
  }
  var mapItem=-1;
   productData['color']=colorState;
  return(
    <Row>
    <DetailSelectDiv>
      <DetailTitle>顏色｜</DetailTitle>
      {
        colors.map((color)=>{
          
          mapItem++;
          return(
            <ColorSelectConfirm key={product_inform['product_id']+color} style={{border:colorSelect[mapItem]}}><ColorSelectRec style={{backgroundColor:'#'+color,boxShadow:"2px 2px 5px #000"} } onClick={()=>colorChoose(color)}></ColorSelectRec></ColorSelectConfirm>
          );
         
        }

        )
      }
      
    </DetailSelectDiv>
    
    
    <SizeRow data={sizeList.length==0?props.data['product_detail']:sizeList}/>

  </Row>
  );
}

function SizeRow(props){                                           //size will include amount because it will influence it
  const product_detail=props.data;
  var sizeArray=[];
  var amountArray=[];
  for(var i=0;i<product_detail.length;++i){
    const amount=product_detail[i]['amount'];
    var size=product_detail[i]['size'];
    if(amount>0){
      sizeArray.push(size);
      amountArray.push(amount);
    }
  }
  //console.log(sizeArray,'sizeArray');
  const ChooseStyle = {
    color: "white",
    backgroundColor: "black"
  };
  const VanishButton={
    display:"none"
  }
  const sizeTable={
    'S':0,
    'M':1,
    'L':2,
    'XL':3
  }
  //console.log(sizeArray);
  var smallSize='XL';
  var sizeChoose=[VanishButton,VanishButton,VanishButton,VanishButton]; //default set all buttons are disappeared
  for(var i=0;i<sizeArray.length;i++){                                  //if size exist, let it show 
      const size=sizeArray[i];
     
      if(sizeTable[size]<sizeTable[smallSize])smallSize=size;           //find the smallest size in the product
      if(size==='S')sizeChoose[0]={};
      else if(size==='M')sizeChoose[1]={};
      else if(size==='L')sizeChoose[2]={};
      else if(size==='XL')sizeChoose[3]={};
  }
  
  const [click,sizeChange]=useState(smallSize);
  var sizeNow=smallSize;                                      //select button set default on smallest size
  if(sizeArray.includes(click))sizeNow=click;             // if click button exists, set it with choose style 
  sizeChoose[sizeTable[sizeNow]]=ChooseStyle;              //set select style
  productData['size']=sizeNow;
  
  var pos=0;
  for(var i=0;i<sizeArray.length;++i)if(sizeArray[i]==sizeNow)pos=i;
  return(
    <div>
      <Row >
        <DetailSelectDiv>
          <DetailTitle>尺寸｜</DetailTitle>
          <OvalButton style={sizeChoose[0]}onClick={()=>{sizeChange("S")}} ><SizeButton>S</SizeButton></OvalButton>
          <OvalButton style={sizeChoose[1]}onClick={()=>{sizeChange("M")}}><SizeButton>M</SizeButton></OvalButton>
          <OvalButton style={sizeChoose[2]}onClick={()=>{sizeChange("L")}}><SizeButton>L</SizeButton></OvalButton>
          <OvalButton style={sizeChoose[3]}onClick={()=>{sizeChange("XL")}}><SizeButton>XL</SizeButton></OvalButton>
        </DetailSelectDiv>
      </Row>
      <Row>
      <DetailSelectDiv>
        <DetailTitle>數量｜</DetailTitle>
        <AmountButton data={amountArray[pos]}/>
      </DetailSelectDiv>
      </Row>
    </div>
  );
}

function AmountButton(props){
  //console.log( props.data);
  var maxSize=props.data;
  const [amountState,changeText]=useState(1);
  //const [buttonState,clickButton]=useState(1);
  //console.log(amount);
  //console.log(props.id,amountArray[id],"here");
  if(amountState<1){
      changeText(1);
      
  }
  if(amountState>maxSize){
    changeText(maxSize); //restrain the maximum
    alert("超過上限"+maxSize+"件");
  }
  productData['amount']=amountState;
  productData['maxAmount']=maxSize;
 

  return(
        <AmountButtonDiv>
            <button  type="button"style={{width:"25%",height:"100%",border:"0px",backgroundColor:'white'}} onClick={()=>{changeText(amountState-1);}}>-</button>
            <input name="amountText" type="text" maxLength="2"style={{width:"50%",height:"100%",border:"0px",textAlign:"center",color:'#8b572a'}}value={amountState} onInput={(e)=>{changeText(Number(e.target.value));}}></input>
            <button  type="button"style={{width:"25%",height:"100%",border:"0px",backgroundColor:'white'}} onClick={()=>{changeText(amountState+1);}}>+</button>
        </AmountButtonDiv>
        
  );

}


function ProductInform(props){

  //console.log(props.idnow);
  var product_inform=props.data['product_inform'];
  var subtle_description=props.data['product_subtle_description'];
  const informObject=product_inform[0];
  const description=product_inform[0]['description'].split('/');

  const img_path='uploads/'+informObject['product_id']+'/'+informObject['image_addr'];
  const subtle1_img_path='uploads/'+informObject['product_id']+'/'+subtle_description[0]['image_addr'];
  const subtle2_img_path='uploads/'+informObject['product_id']+'/'+subtle_description[1]['image_addr'];
  return(
    <div>
        <Row   style={{marginTop:"2.32%", marginLeft:"25%",height:"26.7%",marginRight:"25%"}}> 
        <Col xs="12" md="7" lg="7" >
              <Productimg  src={img_path}></Productimg>
        </Col>

        <Col xs="12" md="5" lg="5" >
          <Row>
              <ProductSpan>{informObject['product_title']}</ProductSpan>
          </Row>
          <Row>
              <IdSpan>{informObject['product_id']}</IdSpan>
          </Row>
          <Row>
                <PriceSpan>NT.{informObject['price']}</PriceSpan>
          </Row>
          <Row>
                <RectangleDiv></RectangleDiv>
          </Row>
             
          <ColorRow data={props.data} idnow={props.idnow}/>
          <BuyButtonButton onClick={()=>{sendOrders()}}>
              加入購物車
          </BuyButtonButton>
          <Row>
              <DescriptionSpan>
                *實品顏色依單品照為主<br></br><br></br><br></br>
                {description[0]}<br></br>
                {description[1]}<br></br>
                {description[2]}
              
              </DescriptionSpan>
          </Row>
        </Col>
      </Row>

      <Row style={{marginTop:"2.32%", marginLeft:"25%",height:"59.4%",marginRight:"25%"}}>
          <Col   xs="3" md="3" lg="3">
              <SubtleDescriptionTitle>細部說明</SubtleDescriptionTitle>
          </Col> 

          <Col   xs="9" md="9" lg="9">
              <RectangleCopyDiv></RectangleCopyDiv>
          </Col> 
          
          <Col  xs="12" md="12" lg="12">
            <SubtleDescriptionContent_1>
                {subtle_description[0]['description']}
            </SubtleDescriptionContent_1>
          </Col>

          <Col xs="12" md="12" lg="12" style={{marginBottom:"10%"}}> 
            <SubtlePictureDiv >
              <img style={{width:"100%"}} src={subtle1_img_path} ></img>
            </SubtlePictureDiv>
          </Col>

          <Col  xs="12" md="12" lg="12">
            <SubtleDescriptionContent_1>
              {subtle_description[1]['description']}
            </SubtleDescriptionContent_1>
          </Col>

          <Col xs="12" md="12" lg="12"style={{marginBottom:"10%"}}>
            <SubtlePictureDiv >
              <img style={{width:"100%"}} src={subtle2_img_path} ></img>
            </SubtlePictureDiv>
          </Col>

          
            
        
      </Row>


  </div>

  );



}


function ProductDetail() {
  
  const search = useLocation().search;
  var id = new URLSearchParams(search).get('id');
  var color = new URLSearchParams(search).get('color');
  const [detailList,setDetail] = useState([]);
  //console.log(id,color);
  useEffect(() => {
      fetch("https://18.236.9.61/api/v1/products/details?id="+id+"&&color="+color)
        .then(res => res.json())
        .then(
          (result) => {
            setDetail(result);
          },
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
    }, []);
  if(detailList.length==0){
    return(
      <div style={{display:"flex",justifyContent:"center"}}>
          <img src="loading.gif" style={{width:"25%",height:"25%"}}></img>
      </div>
   );
  }
  else{
    var product_inform=detailList['product_inform'][0]; 
    productData["product_title"]=product_inform['product_title'];
    productData["product_id"]=product_inform['product_id'];
    productData["price"]=product_inform['price'];
    productData['image_addr']=product_inform['image_addr'];

    //console.log(productData);
    return (
      <div>
        <Row>
              <NavbarDiv/>
        </Row>

        <Row>
            <div style={{height:"50px",width:"100%",backgroundColor:"black"}}></div>
        </Row>
        <ProductInform data={detailList} idnow={id}/>

        <NavbarFooterDiv/>
      </div>
    );
    }
}

  export default ProductDetail;
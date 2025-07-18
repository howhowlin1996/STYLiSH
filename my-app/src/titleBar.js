import React, { useState } from 'react';
import {  TextField, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavItem,Nav,NavbarBrand, Collapse,NavbarToggler,Badge} from 'reactstrap';
var catergoryType;
var user_id=2;

//margin-top/margin-right/margin-bottom/margin-left/height*4/width*5/2796/1920

const CatergoryName=styled.button`
    background: none;
    border: none;
    padding: 0;  
    width: 100%;
    height: 100%;
    font-family: PingFangTC;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 20px;
    text-align: left;
`

const BarDiv=styled.div`
    width:100%;
    height:3.58%;
    padding: 0.93% 2.81% 0.93% 3.12%;
    background-color: #fff;

`

const LogoDiv=styled(NavbarBrand)`
    width: 15%;
    height: 1.65%;
    margin: 0 5% 0 0;
    padding: 0.18% 0.11% 0.18% 0.1%;
    object-fit: contain;

`
const CatergoryBar=styled(Nav)`
    width: 35%;
    height: 28%;
    margin-top:auto ;
    margin-Bottom:auto;
    margin-right:20%;
    margin-left:3.31% 
    display:flex;
    font-family: PingFangTC;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 20px;
    text-align: left;
    color: #3f3a3a;

`

const IconBar=styled(Nav)`
    width:50%;
    height:100%;
    margin-top:auto ;
    margin-Bottom:auto;


`
function IconDiv(props){
    const [cartMouseMove,cartMouseChange]=useState(0);
    const [memberMouseMove,memberMouseChange]=useState(0);
    //console.log(cartMouseMove);
    const cartIcon=["cart.png","cart-hover.png"];
    const memberIcon=["member.png","member-hover.png"];
    //console.log(props.shopCartNUM);
    return(
        <IconBar navbar>
            <NavItem style={{height:"44%"}}>
                <TextField
                    style={{width:"100%"}}
                    id="searchBox"
                    label="Search field" 
                    type="search" 
                    InputProps={{
                    endAdornment: (
                        <IconButton>
                        <SearchOutlined />
                        </IconButton>
                    ),
                    }}
                />
            </NavItem>
           
            <NavItem style={{marginLeft:"20%",marginTop:"auto",marginBottom:"auto"}} onMouseMove={()=>{cartMouseChange(1)}} onMouseOut={()=>{cartMouseChange(0)}}>
                <a href={"http://localhost:3000/shopCart"}>
                    < img src={cartIcon[cartMouseMove]} alt="shop cart button"   />
                </a>
            </NavItem>
            <NavItem style={{marginLeft:"0%"}}>
                <Badge >{props.shopCartNUM}</Badge>
            </NavItem>
            <NavItem style={{marginLeft:"10%",marginTop:"auto",marginBottom:"auto"}}  onMouseMove={()=>{memberMouseChange(1)}} onMouseOut={()=>{memberMouseChange(0)}}>
            <img src={memberIcon[memberMouseMove]} alt="member button"  />
            </NavItem>
        </IconBar>

    );





}



function NavbarDiv(props){
    const[click,noRefCheck]=useState(0);
    var type;
    if(!(props.data===undefined)){
        localStorage.removeItem('catergory');
        localStorage.setItem('catergory',props.data);
        type=props.data;
    }
    else{
        type=localStorage.getItem('catergory');
    }
    var shopCart=JSON.parse(localStorage.getItem('shopCart'+user_id));
    var itemNum=0;
    if(shopCart!=null){
        for(var i=0;i<Object.keys(shopCart).length;i++){
            if(shopCart[i]['delete']!=1)itemNum++;
        }
        
    }
    
    //console.log("number",itemNum);
    
    const [catergory,catergoryChange]=useState(type);
    var color=["black","black","black"];
    //console.log(catergory);
    if(catergory==='women') color=["#7F462C","black","black"];
    else if(catergory==='men') color=["black","#7F462C","black"];
    else  color=["black","black","#7F462C"];
    return(
            <BarDiv>
                <Navbar
                color="white"
                expand="md"
                light
                style={{height:"100px"}}
  
              >
                <LogoDiv href="/" >
                  <img src='logo.png' style={{width:"100%",height:"100%"}}></img>
                </LogoDiv>
                <NavbarToggler onClick={() => noRefCheck( click+1)} />
                <Collapse navbar >

                    <CatergoryBar navbar>
                        <NavItem >
                        <a href="http://localhost:3000/?catergory=women"><CatergoryName style={{color:color[0]}} onClick={(e)=>{catergoryChange('women')}} >
                                女裝<span style={{color:"black"}}>|</span>
                            </CatergoryName></a>
                            
                        </NavItem>
                        <NavItem >
                            <a href="http://localhost:3000/?catergory=men"><CatergoryName style={{color:color[1]}}onClick={(e)=>{catergoryChange('men')}} >
                                男裝<span style={{color:"black"}}>|</span>
                            </CatergoryName></a>
                        </NavItem>
                        <NavItem >
                        <a href="http://localhost:3000/?catergory=accessories"><CatergoryName style={{color:color[2]}}onClick={(e)=>{catergoryChange('accesories')}}>
                                配件
                            </CatergoryName></a>
                        </NavItem>
                    </CatergoryBar>
                    
                    <IconDiv shopCartNUM={itemNum}/>
                    
                </Collapse>
              </Navbar>
            </BarDiv>
    )
  
  
  }

  export default NavbarDiv;
import React, { useState,useEffect} from 'react';
import NavbarDiv from './titleBar';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,Carousel,CarouselItem,CarouselIndicators,CarouselControl} from 'reactstrap';
import NavbarFooterDiv from './footer';
import {useLocation} from "react-router-dom";

const ColorDiv=styled.div`width:20px;height:20px;display:inline-block;margin-right:10px;padding-left:0px;`;
const Productimg=styled.img`width:100%; margin-left:auto;margin-right:auto;aspect-ratio:3/4;`
const ProductName=styled.p`
  
  font-family: NotoSansCJKtc;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 4px;
  text-align: left;
  color: #3f3a3a;
  padding-left:0px;
`

const PricePara=styled.p`
 
  font-family: NotoSansCJKtc;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 4px;
  text-align: left;
  color: #3f3a3a;
  padding-left:0px;
`




function CarouselDiv() {   
     // State for Active index
     const [activeIndex, setActiveIndex] = React.useState(0);
  
     // State for Animation
     const [animating, setAnimating] = React.useState(false);
   
     // Sample items for Carousel
     const items = [
         {
             src: 
            'bar1.jpeg',
             altText: 'Slide One'
         },
         {
             src: 
              'bar2.jpeg',
             altText: 'Slide Two'
         }
         ,  
         {
          src: 
           'bar3.jpeg',
          altText: 'Slide Three'
        }
     ];
   
     // Items array length
     const itemLength = items.length - 1
   
     // Previous button for Carousel
     const previousButton = () => {
         if (animating) return;
         const nextIndex = activeIndex === 0 ?
             itemLength : activeIndex - 1;
         setActiveIndex(nextIndex);
     }
   
     // Next button for Carousel
     const nextButton = () => {
         if (animating) return;
         const nextIndex = activeIndex === itemLength ?0 : activeIndex + 1;
         setActiveIndex(nextIndex);
     }
   
     // Carousel Item Data
     const carouselItemData = items.map((item) => {
         return (
             <CarouselItem
                 key={item.src}
                 onExited={() => setAnimating(false)}
                 onExiting={() => setAnimating(true)}
                 fullWidth
                 className=" py-2"
             >
                 <img src={item.src} alt={item.altText} style={{width:"100%"}}  />
             </CarouselItem>
         );
     });
   
     return (
         <div style={{
             display: 'block'
         }}>
             <Carousel previous={previousButton} next={nextButton}
                 activeIndex={activeIndex}>
                 <CarouselIndicators items={items}
                     activeIndex={activeIndex}
                     onClickHandler={(newIndex) => {
                         if (animating) return;
                         setActiveIndex(newIndex);
                     }} />
                 {carouselItemData}
                 <CarouselControl directionText="Prev"
                     direction="prev" onClickHandler={previousButton} />
                 <CarouselControl directionText="Next"
                     direction="next" onClickHandler={nextButton} />
             </Carousel>
         </div >
     );
}



function ProductListFirst(props){
    
  var informs1=props.data;
   return(

    <Row className="py-2" style={{marginLeft:"20%",marginRight:"20%",marginBottom:"50px"}}>
        {informs1.map((item)=>{
            const colorList=item['color'].split(",");
            const img_path='uploads/'+item['product_id']+'/'+item['image_addr'];
            //console.log(colorList[0]);
            return(
            <Col xs="12" md="6" lg="4" className="bg-white  py-2 text-center" key={item['product_id']}>
                <a href={"http://localhost:3000/productDetail?id="+item['product_id']+"&&color="+colorList[0]}>
                <Productimg src={img_path}  ></Productimg>
                </a>
                <Row style={{marginTop:"20px",marginBottom:"20px",marginLeft:"auto"}}>
                    {       
                        colorList.map((color)=>{ return  <ColorDiv style={{backgroundColor:'#'+color,boxShadow:"2px 2px 5px #000"}} key={item['product_id']+color}></ColorDiv>})
                    }
                    
                   
                </Row>
                <Row style={{marginLeft:"auto"}}>
                        <ProductName>{item['product_title']}</ProductName>
                </Row>
                <Row style={{marginLeft:"auto"}}>
                        <PricePara>NT.{item['price']}</PricePara>
                </Row>
             </Col>);

        })}

    </Row>

   );
}

function ProductListSecond(props){

    var informs2=props.data;
    var count=0;
    return(

        <Row className="py-2" style={{marginLeft:"20%",marginRight:"20%",marginBottom:"50px"}}>
            {informs2.map((item)=>{
                const colorList=item['color'].split(",");
                const img_path=item['product_id']+'/'+item['image_addr'];
                console.log(img_path,'hahaha');

                //console.log(colorList[0]);
                count++;
                if(count>3){
                    return(
                    <Col xs="12" md="6" lg="4" className="bg-white  py-2 text-center"  key={item['product_id']+colorList[0]} >
                        <a href={"http://localhost:3000/productDetail?id="+item['product_id']+"&&color="+colorList[0]}>
                        <Productimg src={img_path} ></Productimg>
                        </a>
                        <Row style={{marginTop:"20px",marginBottom:"20px",marginLeft:"auto"}}>
                            {       
                                colorList.map((color)=>{return  <ColorDiv style={{backgroundColor:color}} key={item['product_id']+color}></ColorDiv>})
                            }
                            
                            
                        </Row>
                        <Row style={{marginLeft:"auto"}}>
                                <ProductName>{item['product_title']}</ProductName>
                        </Row>
                        <Row style={{marginLeft:"auto"}}>
                                <PricePara>NT.{item['price']}</PricePara>
                        </Row>
                    </Col>);
                }
    
            })}
    
        </Row>
    
    );

}



function Main (){
    const search = useLocation().search;
    var name = new URLSearchParams(search).get('catergory');
    const [list, setList] = useState([]);
    //console.log(name);
    var catergoryChoose;
    if(!name) name="women";
    catergoryChoose=name;
    //console.log(name);
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/products/"+name)
          .then(res => res.json())
          .then(
            (result) => {
              setList(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log(error);
            }
          )
    }, [catergoryChoose])
    console.log(list['product_inform']);
    if(list['product_inform']!=null&&list['product_inform'].length>0){
            return (
                <div>
                    <Row>
                        <NavbarDiv data={catergoryChoose}/>
                    </Row>

                    <Row>
                    <div style={{height:"50px",width:"100%",backgroundColor:"black"}}></div>
                    </Row>

                    <Row className="bg-white border py-2 text-center">
                        <CarouselDiv/>
                    </Row>

                    <ProductListFirst data={list['product_inform']}/>
                    {
                        //list.length>3&&<ProductListSecond data={list['product_inform']}/>   
                    }
                    <NavbarFooterDiv/>
                </div>

            
        );
    }
    else{
         return(
            <div style={{display:"flex",justifyContent:"center"}}>
                <img src="loading.gif" style={{width:"25%",height:"25%"}}></img>
            </div>
         );
    }
    
}






export default Main;

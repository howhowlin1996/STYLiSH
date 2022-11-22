/*TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );*/
let data;
//getData();
async function getData(){
    await fetch("http://18.236.9.61/api/v1/dashboard/getData",{ 
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
            data=body_json;
            console.log(data);
        } catch {
            throw Error(body);
        }
    })


}

async function render(){
    await getData();
    console.log(data,"here");
    let revenue=data["revenue"][0]["total"];
    let pricearray=data["priceQuant"];
    let colorName=data["colorAndQty"]["colorName"];
    let colorCode=data["colorAndQty"]["colorCode"];
    let colorqty=data["colorAndQty"]["qty"];
    let soldid=data["soldRank"]["id"];
    let soldQty=data["soldRank"]["soldQty"];
    let soldSize=data["soldRank"]["size"];
    let productSize=["S","M","L"];
    let sizeQty=data["soldRank"]["sizeQty"];
    //console.log(revenue,pricearray,colorName);
    console.log(soldSize);
    revenueText=document.getElementById('number');
    revenueText.innerText="Total Revenue: "+revenue;

    pie=document.getElementById('pie');
    var pieData = [{
        type: "pie",
        values: colorqty,
        labels: colorName,
        marker: {
            colors: colorCode
          },
        textinfo: "percent",
    
        insidetextorientation: "radial"
      }]
      var layout = {
        title: "Product sold percentage in different color"
    };
    Plotly.newPlot(pie,pieData,layout)

    histogram=document.getElementById('histogram');
    var trace = {
        x: pricearray,
        type: 'histogram',
      };
    var layout = {
        title: "Product sold quantity in different price range", 
        xaxis: {title: "Price Range"}, 
        yaxis: {title: "Quantity"}
    };
    var histogramdata=[trace]
    Plotly.newPlot(histogram,histogramdata,layout);

    bar=document.getElementById('bar');
    var barData=[];
    for(var i=0;i<3;++i){
        var trace = {
            x: [ "procudt "+soldid[0], "procudt "+soldid[1], "procudt "+soldid[2], "procudt "+soldid[3], "procudt "+soldid[4]],
            y: [sizeQty[0][i],sizeQty[1][i],sizeQty[2][i],sizeQty[3][i],sizeQty[4][i]],
            name: productSize[i],
            type: 'bar'
          };
        barData.push(trace);  
    }
    var layout = {title:'Quantity of top 5 sold products in different sizes',yaxis: {title: "Quantity"},barmode: 'stack'};
    console.log(barData)
    Plotly.newPlot(bar,barData,layout);

}

render();
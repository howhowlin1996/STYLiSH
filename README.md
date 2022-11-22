first push
ip address:http://18.236.9.61/

#API

## listAPI

method:http://18.236.9.61/api/v1/products/:catergory?paging=x

e.g. http://18.236.9.61/api/v1/products/women?paging=1

parameters: catergory & page number

Catergory needs to be women, men or accessories. If you enter wrong parameters, you'll get response message.  


data_structuer  


    {  

        "product_inform": [  

        {  

            "product_title": "product1",  

            "product_id": 1001,  

            "create_day": "2021 April 14",  

            "image_addr": "/image/first",  

            "price": 100,  

            "color": "orange,red,blue"    

        },
        {  

            product2,same structure as product1  

        },  

        {  

            product3,same structure as product1  

        },  

        {  

            product4,same structure as product1  

        },  

        {  

            product5,same structure as product1  

        },  

        {  

            product6,same structure as product1  
              
        }  

        ],   

        "next_page": 1, -> Tell developers about next page number. If next page doesn't exist, it will return NULL.  

        "last_page": 1  -> Tell developers about which page is the last page. It starts from 0.  

    }  




## searchAPI

method: http://18.236.9.61/api/v1/products/products/search?keyword=x&&paging=x

e.g. http://18.236.9.61/api/v1/products/search?keyword=洋裝&&paging=1

parameters: keyword,paging

  
all title in db now{  

    '鬆厚T-shirt'  

    '輕鬆牛仔褲'  

    '羽絨外套'  

    '緊身牛仔褲'  

    '緊身上衣'  

    '維尼熊上衣'  

    '素色輕薄洋裝'  

    '精美耳環'  

    '碎花洋裝'  

    '格紋襯衫'  

    '格紋外套'  

    '少女髮飾'  

    '少女頭飾'  

    '少女手飾'  

    '好漂漂洋裝'    


}  



data_structure: same as listAPI

## details API

method: http://18.236.9.61/api/v1/products/details?id=x&&color=x

e.g. http://18.236.9.61/api/v1/products/details?id=1001&&color=blue

parameters: id && color
  

all product_id && color in db{  

    '1001', 'orange,blue,red'  

    '2001', 'orange,red,blue'  

    '3001', 'red,blue,orange,red'  

    '4001', 'red,orange,blue,red'  

    '5001', 'red,blue,orange,red'  

    '6001', 'red,blue,orange,red'  

    '7001', 'red,orange,red,blue'  

    '8001', 'red,blue,orange,red'  

    '9001', 'red,blue,orange,red'  

    '10001', 'red'  

    '11001', 'orange,red,blue'  

    '11111', 'red,green,brown,purple'  

    '12001', 'red'  

    '13001', 'blue,orange,red'  

    '123456', 'red,blue,greem'  


}  


data_structure:  -> 我會將listAPI中取得的第一個顏色作為預設，這樣進入產品頁面時，就會以id及顏色當參數．  
希望不要讓json檔過於雜亂，因為一個顏色可以對應多個尺寸，若只吃id，顏色及尺寸資料會有多種組合．  
當使用者要換顏色時，可再次call API．  


"product_inform": -> all basic information about 緊身牛仔褲  

    [  

        {  

        "product_title": "緊身牛仔褲",  

        "product_id": 1001,  

        "create_day": "2021 April 14",  

        "image_addr": "/image/first",  

        "price": 100,  

        "description": "就是褲子",  

        "color": "blue,orange,red"  

        }  

    ],  
   

    "product_detail":  

    [  

        {  

            "size": "s",  

            "amount": 12  

        }  

    ],  

    "product_subtle_description": [  

        {  

            "description": "細部說明aaa",  

            "image_addr": "圖片位址aaa"  

        },  

        {  

            "description": "細部說明bbb",  

            "image_addr": "圖片位址bbb"  

        }  

    ]  

}  


## createAPI
method :  http://18.236.9.61/admin/product.html






`


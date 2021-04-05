const INITIAL_STATE = {
    sections: [

        {
            title: "AIR JORDAN",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/018/947/061/original/H018_MNJDSP_712_883084.png.png",
            size: "large",
            id: 1,
            linkUrl: "shop/air-jordan"
        },
        {
            title: "ADIDAS",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/042/346/322/original/FV3872.png.png",
            size: "large",
            id: 2,
            linkUrl: "shop/adidas"
        },
        
        {
            title: "JORDAN",
            imageUrl: "https://stockx.imgix.net/Air-Jordan-Lunar-Grind-Gatorade-Like-Mike-1.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1565200692",
            size: "large",
            id: 3,
            linkUrl: "shop/jordan"
            
        },
        {
            title: "CONVERSE",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/012/511/798/original/161252C.png.png",
            size: "large",
            id: 4,
            linkUrl: "shop/converse"
        },
        {
            title: "NEW BALANCE",
            imageUrl: "https://stockx.imgix.net/New-Balance-1500pt9-Summer-Nine.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985",
            size: "large",
            id: 5,
            linkUrl: "shop/new-balance"
        },
        {
            title: "NIKE",
            imageUrl: "https://images.stockx.com/Nike-KD-III-Mike-Miller.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985",
            size: "large",
            id: 6,
            linkUrl: "shop/nike"
        },
        {
            title: "REEBOK",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/013/841/696/original/AR2820.png.png",
            size: "large",
            id: 7,
            linkUrl: "shop/reebok"
        },
        {
            title: "UNDER ARMOUR",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/020/449/969/original/1257447_001.png.png",
            size: "large",
            id: 8,
            linkUrl: "shop/under-armour"
        },
        {
            title: "VANS",
            imageUrl: "https://image.goat.com/attachments/product_template_pictures/images/031/219/532/original/VN0N4V61S.png.png",
            size: "large",
            id: 9,
            linkUrl: "shop/vans"
        },
        {
            title: "ASICS",
            imageUrl: "https://images.stockx.com/images/Asics-Gel-Lyte-III-Ronnie-Fieg-Nice-Kicks-2.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1613152173",
            id: 10,
            size: "large",
            linkUrl: "shop/asics"
        }
    ]
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default directoryReducer
import {shallow, render, mount} from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import CollectionItem from '../../components/collection-item/collection-item.component'
import CollectionPreview from '../../components/preview-collection/collection-preview.component'
import { store } from '../../redux/store'




describe('Collection Preview component: recommendation', ()=>{
    it('checks that the component has displays the exact number of sent items in a list', ()=>{
        const list =[
            {
                "_id": "a2b2a0f8-8101-41bc-b3a8-7d382294a51d",
                "sku": "H018-MNJDSP-712-883084",
                "brand": "Air Jordan",
                "name": "Air Jordan 33 'Mike Conley' PE",
                "colorway": "White/Metallic Gold-Black-Light Blue",
                "gender": "men",
                "silhouette": "Air Jordan 33",
                "releaseYear": 0,
                "releaseDate": "",
                "retailPrice": 0,
                "estimatedMarketValue": 0,
                "story": "",
                "image": {
                    "original": "https://image.goat.com/attachments/product_template_pictures/images/018/947/061/original/H018_MNJDSP_712_883084.png.png",
                    "small": "https://image.goat.com/750/attachments/product_template_pictures/images/018/947/061/original/H018_MNJDSP_712_883084.png.png",
                    "thumbnail": "https://image.goat.com/375/attachments/product_template_pictures/images/018/947/061/original/H018_MNJDSP_712_883084.png.png"
                },
                "links": {
                    "stockX": "",
                    "goat": "https://goat.com/sneakers/air-jordan-33-mike-conley-pe-h018-mnjdsp-712-883084",
                    "flightClub": " https://flightclub.com/air-jordan-33-mike-conley-pe-h018-mnjdsp-712-883084"
                }
            },
            {
                "_id": "009ec5a0-c450-4709-a3ec-2234859df379",
                "sku": "JBM119",
                "brand": "Air Jordan",
                "name": "Air Jordan 17 Low 'Mike Bibby' PE",
                "colorway": "",
                "gender": "men",
                "silhouette": "Air Jordan 17",
                "releaseYear": 0,
                "releaseDate": "",
                "retailPrice": 0,
                "estimatedMarketValue": 1500,
                "story": "",
                "image": {
                    "original": "",
                    "small": "",
                    "thumbnail": ""
                },
                "links": {
                    "stockX": "",
                    "goat": "https://goat.com/sneakers/air-jordan-17-low-mike-bibby-pe-jbm119",
                    "flightClub": " https://flightclub.com/air-jordan-17-low-mike-bibby-pe-jbm119"
                }
            }
        ]

        const wrapper= shallow(
            <CollectionPreview list={list} title={'Air Jordan'}/>
        )
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.collection-item')).toHaveLength(2)
        
    })
})
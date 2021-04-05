import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Wrapper } from './product.style'
import { addItem }from '../../redux/cart/cart.actions.js';


const Product = ({addItem, history}) =>{
    const item = localStorage.getItem('product')
    let product = item ? JSON.parse(item) : null
    console.log(item)

    const onBuy = p=>{
        addItem(p)
        history.push('/checkout')

    }

    return (
        <Wrapper>
            <div className="product-container">
                <div className="photo-preview">
                    <h2>{product.name}</h2>
                    <img src={product.image.original} alt={product.name}/>
                    
                </div>
                <div className="product-details">
                    <h2>{product.colorway}</h2>
                    <p>{product.story}</p>
                    
                    <div className="btn-control">
                        <button className="btn-admin btn-default" onClick={ ev => { addItem(product)}}>Add to cart</button>
                        <button className="btn-admin btn-secondary btn-submit" onClick={ ev => { onBuy(product)}}>Buy Now</button>
                    </div>
                </div>
            </div>
                    
        </Wrapper>
    )
}


const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps) (withRouter(Product));
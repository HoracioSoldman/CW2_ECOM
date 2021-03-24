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
                    <img src={product.imageUrl} alt={product.name}/>
                    
                </div>
                <div className="product-details">
                    <h2>More details about the product</h2>
                    <p>Ipsum cupidatat laborum ut mollit ullamco excepteur in magna incididunt minim ullamco commodo est.</p>
                    <p>Elit sunt anim aliqua do incididunt adipisicing et eiusmod eu ex.</p>
                    <p>Consectetur non et amet quis nisi cupidatat qui. Quis officia deserunt velit ad et duis mollit anim in anim commodo duis. Enim pariatur in consectetur ad voluptate cupidatat incididunt ex occaecat et elit ullamco est. Sint amet excepteur aliquip commodo tempor. Dolor irure aliqua sunt eiusmod consectetur irure cillum esse nulla culpa voluptate eu.</p>
                    
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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { clearItemFromCart } from '../../redux/cart/cart.actions.js'

import './checkout.styles.scss';
import { Link } from 'react-router-dom';
import Loading from '../../components/extras/Loading';

const CheckoutPage = ({cartItems, clearItem, total}) => {
  const [info, setInfo] = useState('Your cart is empty!')
  const [loading, setLoading] = useState(false)

  const onPay = ()=>{
    setLoading(true)
    setTimeout(() => {
      const items = [...cartItems]
      console.log(items)
      items.forEach(item=>{
        try{
          clearItem(item)
        }catch(err){
          console.log(err)
        }
      })
      setInfo('Purchase complete!')
      setLoading(false)
    }, 3000);
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>

        <div className="header-block">
          <span>Description</span>
        </div>

        <div className="header-block">
          <span>Quantity</span>
        </div>

        <div className="header-block">
          <span>Price</span>
        </div>

        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {
        cartItems.length === 0 ?  <><p className="info">{info}</p> <p><Link to="/shop">Go back to Shop</Link></p> </>:
        cartItems.map(cartItem =>
          (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
          )
      }
      <div className='total'>
          <span>TOTAL: £{total}</span>
          {
            total > 0 && 
              <button className="btn-admin btn-secondary btn-submit" disabled={loading} onClick={ ev => { onPay()}}>{loading ? <Loading text={'Processing...'}/> : 'Pay Now'}</button>
          }
          
      </div>
    </div>
  )
      }

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
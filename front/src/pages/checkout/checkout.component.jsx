import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { clearItemFromCart } from '../../redux/cart/cart.actions.js'
import { selectCurrentUser } from '../../redux/user/user.selector';

import './checkout.styles.scss';
import { Link } from 'react-router-dom';
import Loading from '../../components/extras/Loading';
import axios from 'axios';
import { setCurrentUser } from '../../redux/user/user.actions';
import { SERVER_URL } from '../../constant';

const CheckoutPage = ({cartItems, clearItem, total, currentUser, setCurrentUser}) => {
  const [info, setInfo] = useState('Your cart is empty!')
  const [loading, setLoading] = useState(false)

  const onPay = ()=>{
    setLoading(true)
    if(currentUser){
      const categories_names = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR', 'VANS', 'ADIDAS']
      let shoesGot = currentUser.whatAlreadyHas
      console.log('Previous whatAlreadyHas: ', shoesGot)
      //for each purchased item, we add its brand into the whatAlreadyHas array
      cartItems.forEach(item=>{
        let b = item.brand.toUpperCase()
        console.log('Checking: ', b)
        let index = categories_names.indexOf(b)
        if(index > -1){
          shoesGot[index] = 1
        }
      })

      console.log('New whatAlreadyHas: ', shoesGot)
      //we update the user with the new value of whatAlreadyHas

      axios.post(`${SERVER_URL}/users/purchased`, {email: currentUser.email, whatAlreadyHas: shoesGot})
      .then(response =>{
        console.log(response.data)
        const {message, status, data} = response.data
        
        if(status && status === 'success' && data ){

          //save the user into redux
          setCurrentUser({...data})

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
          }, 2000);
           
        }else if (status && status === 'failure'){
          setInfo('Sorry, there was an error!')
          setLoading(false)
        }
        
      })
    }


  
  }

  const redirection = ev=> {
    localStorage.setItem('redirection', '/checkout')
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
        cartItems.length === 0 ?  <><p className="info">{info}</p> <p><Link to="/">Go back to Shop</Link></p> </>:
        cartItems.map(cartItem =>
          (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
          )
      }
      <div className='total'>
          <span>TOTAL: £{total}</span>
          {
            total > 0 && ( currentUser ?
              <button className="btn-admin btn-secondary btn-submit" disabled={loading} onClick={ ev => { onPay()}}>{loading ? <span>Processing...</span> : 'Pay Now'}</button>
              : <p onClick={redirection}>Please <Link to={'/signin'}>SIGN IN</Link> before making a payment.</p>)
          }
          
      </div>
    </div>
  )
      }

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
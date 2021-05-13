import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js'

import './checkout-item.styles.scss';
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, image, retailPrice, quantity, _id } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={image.small} alt="item" />
      </div>
      <span className="name" onClick={ev=>{localStorage.setItem('product', JSON.stringify(cartItem))}}><Link to={`/product/${_id}`}>{name}</Link></span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)} >&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
      </span>
      <span className="price">{retailPrice}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem:  item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
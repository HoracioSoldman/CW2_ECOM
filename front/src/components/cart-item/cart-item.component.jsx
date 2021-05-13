import React from 'react';

import './cart-item.styles.scss'

const CartItem = ({ item: { image, retailPrice, name, quantity } }) => (
  <div className="cart-item">
    <img src={image.small} alt="cart item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x £{retailPrice}
    </span>
    </div>
  </div>
);

export default CartItem
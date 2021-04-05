import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { addItem }from '../../redux/cart/cart.actions.js';

import './collection-item.styles.scss';


const CollectionItem = ({item, addItem, history}) => {
    const {name, retailPrice, image} = item;
    const p = JSON.stringify(item)
    
    return (
      <div className="collection-item" onClick={ev=> { localStorage.setItem('product', p); history.push(`/product/${item._id}`)}}>
        <div
          className="image"
          style={{
            backgroundImage: `url(${image.original})`
          }}
        />
        <div className="collection-footer">
          <span className="name"> {name} </span>
          <span className="price fw-500"> £{retailPrice ? retailPrice : 0} </span>
        </div>

        <CustomButton onClick={ ev => { ev.stopPropagation(); addItem(item)}} inverted>Add to cart</CustomButton>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps) (withRouter(CollectionItem));
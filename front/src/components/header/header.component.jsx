import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SERVER_URL } from '../../constant.js';
import axios from 'axios';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { setCurrentUser } from '../../redux/user/user.actions';

import './header.styles.scss';


export const Header = ({ currentUser, setCurrentUser, hidden }) => {

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token && !currentUser){
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        axios.get(`${SERVER_URL}/users/check`)
          .then(response =>{
            
            console.log(response.data)
            const {message, status, data} = response.data
            
            if(status && status === 'success' && data && data.token){
                //Login successful
                
                //save the user into redux
                setCurrentUser({...data})

                console.log('Logged in.')
               
            }else if (status && status === 'failure'){
              console.log('Error checking the token');

            }
            
          })
          .catch(err=>{
            console.log(err)
          })
       
      }
    }, [])

    const signOut = ()=> {
      if(window.confirm('Signout Now ?')){
        setCurrentUser(null)
        localStorage.removeItem('token')
      }
    }
    return <div className="header">
      <Link className="logo-container" to="/">
        <img src="logo.jpeg" alt="Sneakerbeast"/>
      </Link>

      <div className="options">
        <Link className="option" to="/">
          SHOP
        </Link>

        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={ ev=>{signOut()}}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {
          hidden ? null:
          <CartDropdown />
      }
    </div>
  }

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)


import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import ProductPage from './pages/product/product.component'

import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import "./App.css";
import ContactPage from './pages/contact/contact.component'

class App extends React.Component{
  

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop/:brand" component={ShopPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
          exact
          path="/signin" 
          render={() => 
            this.props.currentUser ? (

              <Redirect to='/' />
              ) : (
                <SignInAndSignUp/>
                )
              } 
            />
        </Switch>
      </div>
    )
  }  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import './sign-up.styles.scss';
import axios from 'axios'

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { SERVER_URL } from '../../constant';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            phone: '',
            confirmPassword: '',
            info: {type: '', msg: ''},
            loading: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, phone, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Passwords don't match")
            return;
        }

        try{
          this.setState({...this.state, loading: true})
            const newUser = {
              name: displayName,
              email, phone, password
            }
            axios.post(`${SERVER_URL}/users`, newUser)
            .then(response =>{
              console.log(response.data)
              const {message, status, data} = response.data
              
              if(status && status === 'success' && data && data.token){
                  //registration successful
                   //save the token
                localStorage.setItem('token', data.token)

                //save the user into redux
                this.props.setCurrentUser({...data})

                  console.log('Signed Up & Logged in.')
                  this.setState({
                    displayName: "",
                    email: "",
                    password: "",
                    phone: '',
                    confirmPassword: "",
                    info: {type: 'success', msg: message},
                    loading: false
                  });

                  //redirection
              }else if (status && status === 'failure'){
                this.setState({
                  ...this.state,
                  info: {type: 'failure', msg: message},
                  loading: false
                });

              }
              
  
            })
            

        }catch(error){
            console.error(error);
            this.setState({
              ...this.state,
              info: {type: 'failure', msg: 'An error has occured'},
              loading: false
            });
        }
    }

    handleChange = event => {

        const {name, value} = event.target
        this.setState({[name]: value, info: {type: '', msg: ''}});
    }


    render(){
        const {displayName, email, phone, password, confirmPassword, info, loading } = this.state
        return (
          <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                onChange={this.handleChange}
                label="Display Name"
                required
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                label="Email"
                required
              />


              <FormInput
                type="tel"
                name="phone"
                value={phone}
                onChange={this.handleChange}
                label="Phone"
                required
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                label="Password"
                required
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                label="Confirm Password"
                required
              />
              <div >
                <p className={info.type ? info.type === 'success' ? 'success' : 'danger' : '' }> {info.msg} </p>
              </div>
              <CustomButton type='submit' disabled={loading}>SIGN UP</CustomButton>
              <div >
                <p className="">Or do you already have an account on Sneakerbeast? <a href="#" onClick={ev=>{this.props.update('in')}}>Sign In</a> </p>
              </div>
            </form>
          </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

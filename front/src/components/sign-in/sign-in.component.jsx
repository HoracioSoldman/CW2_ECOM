import React from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './sign-in.styles.scss';
import { withRouter } from 'react-router';
import { SERVER_URL } from '../../constant';


class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            email: '',
            password: '',
            info: {type: '', msg: ''},
            loading: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
          this.setState({...this.state, loading: true})
          const user = {
            email, password
          }
          axios.post(`${SERVER_URL}/users/login`, user)
          .then(response =>{
            this.setState({...this.state, loading: false})
            console.log(response.data)
            const {message, status, data} = response.data
            
            if(status && status === 'success' && data && data.token){
                //Login successful
                //save the token
                localStorage.setItem('token', data.token)

                //save the user into redux
                this.props.setCurrentUser({...data})


                console.log('Logged in.')
                this.setState({
                  email: "",
                  password: "",
                  info: {type: 'success', msg: message}
                });
                const redirection = localStorage.getItem('redirection')
                this.props.history.push(redirection)
                //redirection
            }else if (status && status === 'failure'){
              this.setState({
                ...this.state,
                info: {type: 'failure', msg: message}
              });

            }
            

          })
          
         
        }catch(error){
          console.log(error)
          this.setState({
            ...this.state,
            info: {type: 'failure', msg: 'An error has occured'},
            loading: false
          });
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render(){
      const {email, password, info, loading} = this.state
        return (
          <div className="sign-in">
            <h2>Sign In</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                name="email"
                type="email"
                handleChange={this.handleChange}
                value={email}
                label="Email"
                required
                id="email-input"
              />

              <FormInput
                name="password"
                type="password"
                value={password}
                handleChange={this.handleChange}
                label="Password"
                required
                id="pwd-input"
              />
              <div >
                <p className={info.type ? info.type === 'success' ? 'success' : 'danger' : '' }> {info.msg} </p>
              </div>
              <div className='buttons' >
                <CustomButton type="submit" disabled={loading} id="submit-button"> Sign In </CustomButton>
                {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign in with Google </CustomButton> */}
              </div>
              <div >
                <p className="">Or are you new to Sneakerbeast? <a href="#" onClick={ev=> {this.props.update('up')}}>Sign Up</a> </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));

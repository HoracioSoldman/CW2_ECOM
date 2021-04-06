import React from 'react';
import './sign-up.styles.scss';
import axios from 'axios'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { SERVER_URL } from '../../constant';
import BasicSignup from './basic/basic.component';
import Preference from './preference/preference.component';
import { withRouter } from 'react-router';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            basic: {}, prefs: {},
            step: 0, loading: false,
            info: {type: '', msg: ''}
        }
    }

    submitUser = async (newUsr) => {

        if(!newUsr) return
        
        console.log('Sending...', newUsr)
        
        try{
          this.setState({...this.state, loading: true})
            
            axios.post(`${SERVER_URL}/users`, newUsr)
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
                 
                  //redirection
                  const redirection = localStorage.getItem('redirection')
                  this.props.history.push(redirection)
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

    updateBasicInfo = usr=> {
      
      this.setState({basic: {...usr}, step: 1}, ()=>console.log(this.state.basic))
      
    }

    updatePreferences = prf=> {
      const user = {...this.state.basic, ...prf}
      
      this.submitUser(user)
      //After setting the 
    }

    updateStep = s=> {
      this.setState({...this.state, step: s})
    }



    render(){
        
        return (
          <div className="sign-up">
            <h2 className="title">Create a new account</h2>
            {
              this.state.step ? 
              <Preference  setuser={this.updatePreferences} prevStep={ev=>{this.updateStep(0)}} nextStep={ev=>{this.submitUser()}}/> :
              <BasicSignup setuser={this.updateBasicInfo} nextStep={ev=>{this.updateStep(1)}}/>
            }
            <div >
                <p className={this.state.info.type ? this.state.info.type === 'success' ? 'success' : 'danger' : '' }> {this.state.info.msg} </p>
            </div>
            <div >
              <p className="">Or do you already have an account on Sneakerbeast? <a href="#" onClick={ev=>{this.props.update('in')}}>Sign In</a> </p>
            </div>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

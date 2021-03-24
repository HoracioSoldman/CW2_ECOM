import React from 'react';
import './contact.styles.scss';
import axios from 'axios'

import FormInput, {FormTextarea} from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { SERVER_URL } from '../../constant';

class Contactpg extends React.Component{
    constructor(){
        super();

        this.state = {
            name: '',
            contact: '',
            subject: '',
            message: '',
            info: {type: '', msg: ''},
            loading: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { name, contact, subject, message } = this.state;
      
        try{
            this.setState({...this.state, loading: true})
            const msg = {
              name, contact, subject, message
            }
            axios.post(`${SERVER_URL}/contact`, msg)
            .then(response =>{
              console.log(response.data)
              const {message, status, data} = response.data
              
              if(status && status === 'success'){
                  // successful
                
                  console.log('Message sent.')
                  this.setState({
                    name: "",
                    contact: "",
                    subject: "",
                    message: '',
                    info: {type: 'success', msg: message},
                    loading: false
                  });

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
              info: {type: 'failure', msg: 'An error has occured.'},
              loading: false
            });
        }
    }

    handleChange = event => {

        const {name, value} = event.target
        this.setState({[name]: value, info: {type: '', msg: ''}});
    }


    render(){
      const { name, contact, subject, message, info, loading } = this.state;
        return (
          <div className="sign-up">
            <h2 className="title">Get in touch</h2>
            <span>Please fill up the form below</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              <FormInput
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                label="Your name"
                required
              />

              <FormInput
                type="text"
                name="contact"
                value={contact}
                onChange={this.handleChange}
                label="Your phone/email"
                required
              />


              <FormInput
                type="text"
                name="subject"
                value={subject}
                onChange={this.handleChange}
                label="Subject"
                required
              />

              <FormTextarea
                name="message"
                value={message}
                onChange={this.handleChange}
                label="Your message"
                required
              />
              <div >
                <p className={info.type ? info.type === 'success' ? 'success' : 'danger' : '' }> {info.msg} </p>
              </div>
              <CustomButton type='submit' disabled={loading}>Send Message</CustomButton>
              
            </form>
          </div>
        );
    }
}



export default Contactpg;

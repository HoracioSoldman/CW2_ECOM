import React, {useState, useEffect} from 'react'
import FormInput from '../../form-input/form-input.component.jsx';
import CustomButton from '../../custom-button/custom-button.component.jsx';


function BasicSignup({setuser}) {
    const defaultState = { 
         displayName: '', email: '', password: '', size: '', confirmPassword: '', 
         info: {type: '', msg: ''}
     }

    const [input, setinput] = useState({...defaultState})

    const handleChange = event => {
        const {name, value} = event.target
        setinput({...input, [name]: value, info: {type: '', msg: ''}});
    }

    const handleSubmit = event => {
        event.preventDefault();

        const { displayName, email, size, password, confirmPassword } = input

        if(!displayName || !email || !size || !password){
            alert('All fields are required')
            return
        }

        if(password !== confirmPassword){
            alert("Passwords don't match")
            return;
        }

        const newUser = {
            name: displayName,
            email, size, password
        }
        setuser(newUser)
    }

    // useEffect(() => {
    //     if(!feedback) return

    //     const {status, message, loading} = feedback
    //     if(status && status === 'failure' && message){
    //         setinput({...input, info: {type: status, msg: message}})
    //     }
    // }, [feedback])

    return (
        <div className="sign-up">
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
            <FormInput
                type="text"
                name="displayName"
                value={input.displayName}
                onChange={handleChange}
                label="Display Name"
                required
            />

            <FormInput
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                label="Email"
                required
            />


            <FormInput
                type="number"
                name="size"
                value={input.size}
                onChange={handleChange}
                label="Shoes UK Size"
                required
            />

            <FormInput
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                label="Password"
                required
            />

            <FormInput
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                required
            />
            <div >
                <p className={input.info.type ? input.info.type === 'success' ? 'success' : 'danger' : '' }> {input.info.msg} </p>
            </div>
            <CustomButton type='submit' disabled={input.loading}>Next Step</CustomButton>
            
            </form>
        </div>
    );
}

export default BasicSignup

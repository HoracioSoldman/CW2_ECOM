import React, { useState } from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-sign-up.styles.scss';

const SignInAndSignUp = (props) => {
    const[state, updateState] = useState('in')

return <div className='sign-in-and-sign-up'>
        {
            state === 'in' ? <SignIn update={updateState}/> : <SignUp  update={updateState}/>
        }
        
    </div>

}


export default SignInAndSignUp;

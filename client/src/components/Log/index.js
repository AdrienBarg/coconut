import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = ( props ) => {

    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
            console.log('regi');
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
            console.log('log');
        }
    } 


    return (
        <>
            <div className="log-buttons">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li>
                </ul>
            </div>
            <div className="form-container">
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </>
    );
};

export default Log;
import React from 'react';
import useForm from '../../hooks/useForm';
import Error from './Error';

const SignUpForm = () => {

    const { values, handleChange, handleSubmit, handleOnBlur, error } = useForm({
        initialValues: {
            email: '',
            pseudo: '',
            password: '',
            passwordConfirm: ''
        }
    });


    return (
        <form action="" onSubmit={handleSubmit} id="sign-up-form">
        <div>
            {error && <Error error={error.messages}/> }
        </div>
        
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input required type="text" name="pseudo" id="pseudo" onChange={handleChange} onBlur={handleOnBlur} value={values.pseudo} />
            <div className="pseudo error"></div>
        
        
            <label htmlFor="email">Email</label>
            <br />
            <input required type="text" name="email" id="email" onChange={handleChange} onBlur={handleOnBlur} value={values.email} />
            <div className="email error"></div>
        
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input required type="password" name="password" id="password" onChange={handleChange} onBlur={handleOnBlur} value={values.password} />
            <div className="password error"></div>
        
            <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
            <br />
            <input required type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange} onBlur={handleOnBlur} value={values.passwordConfirm} />
            <div className="passwordConfirm error"></div>
        
        
        <input className="submit-btn" type="submit" value="S'inscrire" />
        
        </form>
    );
};

export default SignUpForm;
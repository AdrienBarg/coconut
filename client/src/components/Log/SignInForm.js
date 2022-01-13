import React from 'react';
import useForm from '../../hooks/useForm';
import Error from './Error';


const SignInForm = () => {

    const { values, handleChange,handleSubmit, error } = useForm({
        initialValues: {
            email: '',
            //username: '',
            password: '',
            //passwordConfirm: ''
        }
    });

    //console.log(error.messages);

    /*const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        try {

            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/login`,
                withCredentials: true,
                data: {
                    email, //email: email
                    password
                }
            })
            .then( (res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
        }
        catch(err) {
            setError(err.response.data);
            console.log(error);
        }
    };*/


    return (
        <form action="" onSubmit={handleSubmit} id="sign-in-form">
        <div>
            {error && <Error error={error.messages}/> }
        </div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={handleChange} value={values.email} />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" onChange={handleChange} value={values.password} />
            <div className="password error"></div>
            <br />
            <input className="submit-btn" type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;
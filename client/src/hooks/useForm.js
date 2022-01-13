import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

const useForm = ({ initialValues }) => {
    
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector('.passwordConfirm.error');
    
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        setValues({
            ...values,
            [name]: value
        });

        if (name === 'passwordConfirm') {
            if (e.target.value !== values.password) {
                passwordConfirmError.innerHTML = 'Les mots de passe ne correspondent pas.';
            } else {
                passwordConfirmError.innerHTML = '';
            }
        } else if (name === 'password') {
            if (e.target.value.length >= 6) {
                passwordError.innerHTML = '';
            }
        }
        
    };

    const handleOnBlur = (e) => {
        const name = e.target.name;

        if(name === 'password') {
            // password length < 6
            if (e.target.value.length < 6 ) {
                passwordError.innerHTML = 'Le mot de passe doit comporter au minimum 6 caractères.';
            } else {
                passwordError.innerHTML = '';
            };
        };
        // not an email
        if (name === 'email') {
            if (validator.isEmail(values.email)) {
                emailError.innerHTML = '';
            } else {
                emailError.innerHTML = 'Veuillez saisir une adresse email correcte.';
            };
        };
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit btn clicked');
        if (e.target.id === 'sign-in-form') {
            handleLogin({ values });
        }
        else if (e.target.id === 'sign-up-form') {
            handleRegister({ values })
        }
    };

    // Login
    const handleLogin = async (values) => {
        
        const formValues = values.values;

        try {

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/login`,
                withCredentials: true,
                data: {
                    email: formValues.email, //email: email
                    password: formValues.password
                }
            })
            .then( (res) => {
                if (res.data.errors) {
                    //emailError.innerHTML = res.data.errors.email;
                    //passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/profil"; // REDIRECT HOME ???
                }
            })
        }
        catch(err) {
            setError(err.response.data);
            
        }
    };

    // Register
    const handleRegister = async (values) => {
        const formValues = values.values;
        const { pseudo, email, password, passwordConfirm } = formValues;
        
        if (password === passwordConfirm) {
            try {
                await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_URL}api/user/register`,
                    withCredentials: true,
                    data: {
                        pseudo,
                        email,
                        password
                    }
                })
                .then((res) => {
                    if (res.data.errors) { console.log(res.data)}
                    else { console.log('no res')}
                })
            } catch(err) {
                //hanlde register fail
                //console.log(err)
            }
        } else {
            //handle password mismatched
            console.log('mismatch')
        }
    }

    return {
        handleChange,
        handleSubmit,
        handleOnBlur,
        values,
        error
    }
};

export default useForm;
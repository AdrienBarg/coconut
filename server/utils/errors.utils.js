module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email: '', password: ''};

    if (err.message.includes('pseudo'))
        { errors.pseudo = 'Pseudo non conforme'}
    if (err.message.includes('pseudo') && (err.code === 11000))
        { errors.pseudo = 'Ce pseudo est déjà utilisé' }
    if (err.message.includes('email'))
        { errors.email = 'Email non conforme'}
    if (err.message.includes('email') && (err.code === 11000))
        { errors.email = 'Cet email est déjà enregistré' }
    if (err.message.includes('password'))
        { errors.password = 'Mot de passe non conforme'}

    return errors
};

module.exports.signInErrors = (err) => {
    let errors = {email: '', password: ''};

    if (err.message.includes('email') || err.message.includes('password'))
        { errors.email = 'Email ou mot de passe incorrect'}
    /*if (err.message.includes('password'))
        { errors.password = 'Mot de passe incorrect' }*/

    return errors
};
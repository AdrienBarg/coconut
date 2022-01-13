// handle duplicate
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;

    res.status(code).send(`${field} est déjà utilisé.`);
}

// handle field formating, empty fields, mismatch password
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(e => e.message);
    let fields = Object.values(err.errors).map(e => e.path);
    let code = 400;

    if (error.lenght > 1) {
        const formattedErrors = errors.join('')
        res.status(code)
            .send({ messages: formattedErrors, fields: fields});
    } else {
        res.status(code)
            .send({ messages: errors, fields: fields});
    }
}

const handleTooManyRepos = (err, res) => {
    let code = 405;
    //console.log(err);
    res.status(code).send('Vous ne pouvez pas créer plus de 50 livres.')
}

const handleUnknownEmailError = (err, res) => {
    let code = 400;
    res.status(code).send({messages: 'Email 404'});
}


module.exports = (err, req, res, next) => {

    try {

        console.log('Error controller');
        console.log(err);

        if (err.name === 'ValidationError') return err = handleValidationError(err, res);

        if (err.name === 'tooManyReposError') return err = handleTooManyRepos(err, res);

        if (err.name === 'unknownEmailError') return err = handleUnknownEmailError(err, res);

        if (err.code && error.code === 11000) return err = handleDuplicateKeyError(err, res);





    }
    catch (err) {
        res.status(500).send('Une erreur inconnue est survenue.');
    }

};
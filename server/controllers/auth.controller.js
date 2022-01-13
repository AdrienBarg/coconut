const ReposModel = require('../models/repos.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const UserModel = require('../models/user.model');
const error = require('./errorController');


const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};


module.exports.signUp = async(req, res, next) => {
    
    const {pseudo, email, password, passwordConfirm} = req.body; // destructuration de pseudo = req.body.pseudo ...

    try {
        const user = await UserModel.create({pseudo, email, password, /*passwordConfirm*/});
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        //const errors = signUpErrors(err);
        //res.status(200).send({ err });
        next(err);
    }
};

module.exports.signIn = async (req, res, next) => {

    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        //nom du cookie, variable du token, caracteristique de la mise en place pour sécurité (consultable uniquement sur le serveur grâce à httpOnly)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        //const errors = signInErrors(err);
        //res.status(200).json({ errors }); // Provisoire ?
        next(err);
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/'); // needed for postman, otherwsie request doesn't work
};
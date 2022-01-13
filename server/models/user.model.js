const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const { default: isAlphanumeric } = require('validator/lib/isAlphanumeric');
const { unknownEmailError, wrongPasswordError } = require('../middlewares/error.middleware');

const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: [true, 'Veuillez saisir un pseudo.'],
            minLength: [3, 'Le pseudo doit faire au minimum 3 caractères.'],
            maxLength: [55, 'Le pseudo que vous avez choisi est trop long.'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isAlphanumeric, 'Le pseudo ne peut contenir que des lettres ou des chiffres']
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail, 'Veuillez saisir une adresse email correct.'],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minLength: [6, 'Le mot de passe saisi est trop court. 6 caractères minimum.'],
            maxLength: [1024, 'Le mot de passe saisi est trop long.'],
        },
        /*passwordConfirm: {
            type: String,
            validate: {
                validator: function (e) { return e === this.password; },
                message: 'Les mots de passe ne correspondent pas.'
            },
            required: [true, 'Veuillez confirmer votre mot de passe.']
        },*/
        reposCount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// crypting before sending
UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = null;
    next();
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            console.log('Welcome ' + user.pseudo)
            return user;
        }
        throw new wrongPasswordError();
    }
    throw new unknownEmailError();
    /*logi: try {
        const user = await this.findOne({ email });
        try {
            const auth = await bcrypt.compare(password, user.password);
            console.log('Welcome ' + user.pseudo)
            return user;  
        } catch(err) {
            break logi;
        }                      
    } catch(err) {

    }*/
};


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
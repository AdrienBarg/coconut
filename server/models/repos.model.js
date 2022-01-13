const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('./user.model');

const ReposSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 55,
            lowercase: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
        },
        recipes: {
            type: [String]
        },
        followers: {
            type: [
                {
                    followersId: String,
                    followersRank: String
                }
            ]
            //required: true
        },
        private: {
            type: Boolean,
            required: true,
            default: false
        },
        password: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

// crypting before sending
ReposSchema.pre("save", async function(next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const ReposModel = mongoose.model('repos', ReposSchema);

module.exports = ReposModel;
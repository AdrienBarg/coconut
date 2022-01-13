const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.userInfo = (req, res) => {
    //req.body = info dans input && req.params = info dans url
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    };

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
};
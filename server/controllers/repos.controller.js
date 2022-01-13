const ReposModel = require('../models/repos.model');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const tooManyReposError  = require('../middlewares/error.middleware');

module.exports.reposInfo = (req, res) => {
    //req.body = info dans input && req.params = info dans url
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    };

    ReposModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
};

module.exports.getAllRepos = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    };

    ReposModel.find({ author: req.body._id }, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1}); // order most recent to oldest
};

module.exports.createRepos = async (req, res) => {
    const newRepos = new ReposModel({
        name: req.body.name,
        author: req.body.author,
        recipe: [],
        follower: [],
        private: req.body.private,
        password: req.body.password
    });
    console.log(req.body);

    try {
        const count = await ReposModel.count({ author: req.body.author });
        // alternative: const count = await posts.count({userId, _id: {$gte: startofDayConvertedToMongoId});
        if (count > 5) { 
            console.log('fuck');
            throw new tooManyReposError('Vous ne pouvez pas créer plus de 5 livres', 42); 
        }
        const post = await newRepos.save();
        console.log('success');
        return res.status(201).json(post);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send(err);
    }

    /*const count = await UserModel.findById(req.body.author).select('reposCount');
    //console.log('count');
    if (count.reposCount >= 5) {
        
        return console.log('can not create more than 5 repos');
    }
    else {
        console.log(count.reposCount);
        newCount = count.reposCount + 1;
        //console.log(count.reposCount);
        const update = await UserModel.findByIdAndUpdate(
            this.author, 
            { $set: newCount}, 
            {new: false},
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Update error : ' + err)
            });
        const update = await count.updateOne({ $set: {reposCount: newCount}});
        try {
            const post = await newRepos.save();
            console.log('success');
            return res.status(201).json(post);
        } catch (err) {
            console.log('fail');
            return res.status(400).send(err);
        }
    }*/

};

module.exports.updateRepos = (req, res) => {

};

module.exports.deleteRepos = (req, res) => {

};

module.exports.followRepos = (req, res) => {

};

module.exports.unfollowRepos = (req, res) => {

};
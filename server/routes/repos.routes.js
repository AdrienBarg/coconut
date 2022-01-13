const router =  require('express').Router();
const authController = require('../controllers/auth.controller');
const reposController = require('../controllers/repos.controller');

// repos DB

router.get('/:reposId', reposController.reposInfo); // id or not id //
router.get('/:userId', reposController.getAllRepos); // id or not id //
router.post('/', reposController.createRepos);
router.put('/', reposController.updateRepos);
router.delete('/', reposController.deleteRepos);
router.patch('/follow-repos/:id', reposController.followRepos);
router.patch('/unfollow-repos/:id', reposController.unfollowRepos);

// repos DB
//router.get('/:id', reposController.reposInfo);



module.exports = router;


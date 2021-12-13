const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/user-signup', usersController.signUp);
router.get('/user-signin', usersController.signIn);


router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);  

router.get('/sign-out', usersController.signOut);



module.exports = router;
const express = require('express');

const router = express.Router();

const signinController = require('../controllers/signin_controller');

router.get('/user-signin', signinController.user_signin);
    
module.exports = router;
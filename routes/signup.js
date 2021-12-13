const express = require('express');

const router = express.Router();

const signupController = require('../controllers/signup_controller');

router.get('/user-signup', signupController.user);

module.exports = router;
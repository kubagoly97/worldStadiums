const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegisterPage)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.loginPage)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.getLogin);

router.get('/logout', users.getLogout);

module.exports = router;
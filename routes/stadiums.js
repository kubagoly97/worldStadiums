const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const stadiums = require('../controllers/stadiums');
const ExpressError = require('../utils/ExpressError');
const Stadium = require('../models/stadium');
const stadiumSchema = require('../schemas');
const { messages } = require('../schemas');
const { authenticate } = require('passport');
const { isLoggedIn, validateStadium, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(stadiums.index))
    .post(isLoggedIn, upload.array('image'), validateStadium, catchAsync(stadiums.createStadium))

router.get('/new', isLoggedIn, stadiums.renderNewForm);

router.route('/:id')
    .get(catchAsync(stadiums.showStadium))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateStadium, catchAsync(stadiums.updateStadium))
    .delete(isLoggedIn, isAuthor, catchAsync(stadiums.deleteStadium))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(stadiums.editStadiumPage))

module.exports = router;

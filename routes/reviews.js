const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const campgroundSchema = require('../schemas');
const reviewSchema = require('../reviewSchema');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
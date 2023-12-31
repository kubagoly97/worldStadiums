const Stadium = require('../models/stadium');
const Review = require('../models/review');

module.exports.addReview = async (req, res) => {
    const stadium = await Stadium.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    stadium.reviews.push(review);
    await review.save();
    await stadium.save();
    req.flash('success', 'Made a new review!')
    res.redirect(`/stadiums/${stadium._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Stadium.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/stadiums/${id}`)
};


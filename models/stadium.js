const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

// https://res.cloudinary.com/dctw1fiot/image/upload/w_300/v1688476978/WorldStadiums/yflzamiz2vds4hymngni.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300')
});

const opts = { toJSON: { virtuals: true } };

const StadiumSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

StadiumSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href='/stadiums/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(0, 30)}...`
});

StadiumSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})

const Stadium = mongoose.model('Stadium', StadiumSchema);

module.exports = Stadium;
const BaseJoi = require('joi');
const { number } = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // images: Joi.string().required(),
        description: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

// campgroundSchema.post('findOneAndDelete', async function (campground) {
//     if (campground.reviews.length) {
//         const res = await Review.deleteMany({ _id: { $in: campground.reviews } });
//         console.log(res);
//     }
// })

module.exports = campgroundSchema;


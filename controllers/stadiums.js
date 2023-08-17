const Stadium = require('../models/stadium');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');


module.exports.index = async (req, res) => {
    const stadiums = await Stadium.find({});
    res.render('stadiums/index', { stadiums })
};

module.exports.renderNewForm = (req, res) => {
    res.render('stadiums/new')
};

module.exports.createStadium = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.stadium.location,
        limit: 1
    }).send();
    const stadium = new Stadium(req.body.stadium);
    stadium.geometry = geoData.body.features[0].geometry;
    stadium.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    stadium.author = req.user._id;
    await stadium.save();
    req.flash('success', 'Successfully made a new stadium!');
    res.redirect(`/stadiums/${stadium._id}`)
};

module.exports.showStadium = async (req, res) => {
    const { id } = req.params;
    const stadium = await Stadium.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!stadium) {
        req.flash('error', 'Cannot find that stadium!');
        return res.redirect('/stadiums');
    }
    res.render('stadiums/show', { id, stadium })
}

module.exports.editStadiumPage = async (req, res) => {
    const { id } = req.params;
    const stadium = await Stadium.findById(id);
    if (!stadium) {
        req.flash('error', 'Cannot find that stadium!');
        return res.redirect('/stadiums');
    }
    res.render('stadiums/edit', { id, stadium })
}

module.exports.updateStadium = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const stadium = await Stadium.findByIdAndUpdate(id, { ...req.body.stadium });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    stadium.images.push(...imgs);
    await stadium.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await stadium.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated Stadium!')
    res.redirect(`/stadiums/${id}`)
}

module.exports.deleteStadium = async (req, res) => {
    const { id } = req.params;
    await Stadium.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Stadium!')
    res.redirect('/stadiums')
}
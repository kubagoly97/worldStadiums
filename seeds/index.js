const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '649aeb0967c3cea654179c6e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dctw1fiot/image/upload/v1688476978/YelpCamp/yflzamiz2vds4hymngni.jpg',
                    filename: 'YelpCamp/yflzamiz2vds4hymngni',
                },
                {
                    url: 'https://res.cloudinary.com/dctw1fiot/image/upload/v1688981544/YelpCamp/ee65dbbryrjcbrzke7fy.jpg',
                    filename: 'YelpCamp/ee65dbbryrjcbrzke7fy'
                }

            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem repellendus unde vitae nostrum, magnam error nemo, obcaecati assumenda sequi numquam minus maxime totam architecto, consequatur amet libero eum iusto consectetur?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
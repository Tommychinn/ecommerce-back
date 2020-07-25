const mongoose = require("mongoose");

const { Schema } = mongoose;

const carouselSchema = new Schema({
    name: String,
    image1: String,
    image2: String,
    image3: String,
});

module.exports = mongoose.model("Carousel", carouselSchema);

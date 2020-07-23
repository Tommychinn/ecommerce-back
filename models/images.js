const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
    image: String,
    productId: String,
});

module.exports = mongoose.model("Image", imageSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const sizeSchema = new Schema({
    size: String,
    category: String,
});

module.exports = mongoose.model("Size", sizeSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    discountPrice: Number,
    discountPercentage: Number,
    brand: String,
    shippingTime: Number,
    availableInGeo: Boolean,
    noStock: Number,
    category: String,
});

module.exports = mongoose.model("Product", productSchema);

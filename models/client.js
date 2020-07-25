const mongoose = require("mongoose");

const { Schema } = mongoose;

const clientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
});

module.exports = mongoose.model("Client", clientSchema);

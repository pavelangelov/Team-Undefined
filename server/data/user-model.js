"use strict";

const mongoose = require("mongoose");
let requiredValidationMessage = "{PATH} is required";

let userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    image: { type: String },
    friends: [],
    messages: []
});

module.exports = mongoose.model("User", userSchema);
"use strict";

const mongoose = require("mongoose");

let requiredValidationMessage = "{PATH} is required";

let userSchema = mongoose.Schema({
    firstName: { type: String, required: requiredValidationMessage },
    lastName: { type: String, required: requiredValidationMessage },
    email: { type: String, required: requiredValidationMessage },
    hashedPass: String
});

module.exports = mongoose.model("User", userSchema);
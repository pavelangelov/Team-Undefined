"use strict";

let requiredValidationMessage = "{PATH} is required";
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: { type: String },
    telerikAccount: { type: String },
    githubAccount: { type: String },
    isTeamMember: { type: Boolean },
    requests: [
        {
            requestUser: {
                type: String,
                required: true
            },
            requestUserFullname: {
                type: String,
                required: true
            },
            requestUserImage: {
                type: String,
                required: true
            }
        }
    ],
    friends: [
        {
            username: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ]
});

mongoose.model("User", userSchema);
let User = mongoose.model("User");
module.exports = User;
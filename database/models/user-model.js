"use strict";

let requiredValidationMessage = "{PATH} is required";
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let User;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate:
        {
            validator: (value, cb) => {
                User.find({ name: value }, (err, docs) => {
                    cb(docs.length === 0);
                });
            },
            message: "User already exists!"
        }
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
    fullname: { type: String },
    image: { type: String },
    telerikAccount: { type: String },
    githubAccount: { type: String },
    requests: [
        {
            _id: {
                type: String,
                required: true
            },
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
User = mongoose.model("User");
module.exports = User;
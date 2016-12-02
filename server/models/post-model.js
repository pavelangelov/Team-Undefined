"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let postSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    targetUserId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    postDate: { type: Date },
    likes: { type: Number },
    content: {
        type: String,
        required: true
    }
});

mongoose.model("Post", postSchema);
let Post = mongoose.model("Post");
module.exports = Post;
"use strict";

const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    author: { type: String },
    authorId: { type: String },
    targetUserId: { type: String },
    image: { type: String },
    postDate: { type: Date },
    likes: { type: int },
    content: { type: String }
});

module.exports = mongoose.model("Post", postSchema);
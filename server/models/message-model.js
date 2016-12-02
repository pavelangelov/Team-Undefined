"use strict";

const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
    author: { type: String },
    authorId: { type: String },
    targetUserId: { type: String },
    image: { type: String },
    postDate: { type: Date },
    content: { type: String }
});

module.exports = mongoose.model("Message", messageSchema);
"use strict";

const users = require("./user-controller"),
    messages = require("./message-controller"),
    posts = require("./post-controller");

module.exports = {
    users,
    messages,
    posts
};
"use strict";

const users = require("./users-db-controller"),
    messages = require("./messages-db-controller"),
    posts = require("./posts-db-controller");

module.exports = {
    users,
    messages,
    posts
};
"use strict";

module.exports = (data) => {
    const users = require("./users-controller")(data),
        messages = require("./messages-controller")(data),
        posts = require("./posts-controller")(data),
        auth = require("./auth-controller")(data);

    return {
        auth,
        messages,
        posts,
        users
    };
};
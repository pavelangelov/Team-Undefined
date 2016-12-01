"use strict";

const passport = require("passport"),
    dataController = require("../database/");

module.exports = {
    userProfile(req, res, next) {
        if (!req.isAuthenticated()) {
            dataController.users.getAnonymousUser()
                .then(user => {
                    res.render("users/user-profile", { user });
                });
        } else {
            let user = req.user;
            res.render("users/user-profile", { user });
        }
    }
};
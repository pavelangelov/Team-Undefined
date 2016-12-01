"use strict";

const passport = require("passport"),
    dataController = require("../database/");

module.exports = {
    userProfile(req, res, next) {
        let otherUsername = req.params.username;

        if (!req.isAuthenticated()) {
            Promise.all([dataController.users.getAnonymousUser(), dataController.users.getUserByUsername(otherUsername)])
            .then(([user, pageOwner]) => {
                res.render("users/users-profile", { user, pageOwner });
            })
            .catch(err => console.log(err));
        } else {
            let user = req.user;
            dataController.users.getUserByUsername(otherUsername)
                .then(otherUser => {
                    if (user.friends.some(x => x._id === otherUser._id)) {
                        otherUser.isFriend = true;
                    }

                    res.render("users/users-profile", { user, pageOwner: otherUser });
                });
        }
    }
};
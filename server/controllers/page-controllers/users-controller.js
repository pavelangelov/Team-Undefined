"use strict";

const data = require("../../../database/controllers");

module.exports = {
    userProfile(req, res, next) {
        let otherUsername = req.params.username;

        if (!req.isAuthenticated()) {
            Promise.all([data.userController.getAnonymousUser(), data.userController.getUserByUsername(otherUsername)])
                .then(([user, pageOwner]) => {
                    res.render("users/users-profile", { user, pageOwner });
                })
                .catch(err => res.json(err));
        } else {
            let user = req.user;
            data.userController.getUserByUsername(otherUsername)
                .then(otherUser => {
                    if (user.friends.some(x => x._id === otherUser._id)) {
                        otherUser.isFriend = true;
                    }

                    res.render("users/users-profile", { user, pageOwner: otherUser });
                })
                .catch(err => res.json(err));
        }
    },
    sendUserRequest(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let request = {
                _id: `${req.user.username};${req.user.firstname};${req.user.lastname}`,
                requestUser: req.user.username,
                requestUserFullname: `${req.user.firstname} ${req.user.lastname}`,
                requestUserImage: req.user.image
            };
            data.userController.sendRequest(req.params.username, request)
                .then(res.redirect("/home"))
                .catch(err => res.json(err));
        }
    },
    confirmFriendshipRequest(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let requestId = req.params.requestId,
                otherUser = requestId.split(";")[0];

            let self = {
                username: req.user.username,
                _id: req.user._id,
                image: req.user.image
            };
            data.userController.addFriend(otherUser, self)
                .then(user => {
                    let friend = {
                        username: user.username,
                        _id: user._id,
                        image: user.image
                    };

                    Promise.all([data.userController.addFriend(req.user.username, friend), data.userController.removeRequest(req.user.username, requestId)])
                        .then(res.redirect("/profile"));
                })
                .catch(err => res.json(err));
        }
    },
    removeUserFromFriends(req, res, next) {

    }
};
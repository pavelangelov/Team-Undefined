"use strict";

const data = require("../../../database/controllers");

module.exports = {
    profile(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let user = req.user;
            res.render("user-profile", { user });
        }
    },
    userProfile(req, res) {
        let otherUsername = req.params.username;

        if (!req.isAuthenticated()) {
            Promise.all([data.users.getAnonymousUser(), data.users.getUserByUsername(otherUsername)])
                .then(([user, pageOwner]) => {
                    res.render("users/users-profile", { user, pageOwner });
                })
                .catch(err => res.json(err));
        } else {
            let user = req.user;
            data.users.getUserByUsername(otherUsername)
                .then(otherUser => {
                    if (user.friends.some(x => x._id.toString() === otherUser._id.toString())) {
                        otherUser.isFriend = true;
                    }

                    res.render("users/users-profile", { user, pageOwner: otherUser });
                })
                .catch(err => res.json(err));
        }
    },
    getUpdateUser(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        res.render("update-details", { user });
    },
    sendUserRequest(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let request = {
                _id: `${req.user.username};${req.user.firstname};${req.user.lastname}`,
                requestUser: req.user.username,
                requestUserFullname: `${req.user.firstname} ${req.user.lastname}`,
                requestUserImage: req.user.image
            };
            data.users.sendRequest(req.params.username, request)
                .then(res.redirect("/home"))
                .catch(err => res.json(err));
        }
    },
    confirmFriendshipRequest(req, res) {
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
            data.users.addFriend(otherUser, self)
                .then(user => {
                    let friend = {
                        username: user.username,
                        _id: user._id,
                        image: user.image
                    };

                    Promise.all([data.users.addFriend(req.user.username, friend), data.userController.removeRequest(req.user.username, requestId)])
                        .then(res.redirect("/profile"));
                })
                .catch(err => res.json(err));
        }
    },
    removeUserFromFriends(req, res) {

    },
    updateUser(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user,
            newPass = req.body.newPassword,
            confirmPassword = req.body.confirmPassword;

        if (confirmPassword === newPass) {
            data.users.updateUser(user, newPass)
                .then(res.redirect("/profile"))
                .catch(err => res.json(err));
        } else {
            res.render("update-details", { user });
        }
    }
};
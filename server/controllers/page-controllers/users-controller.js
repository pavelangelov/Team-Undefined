"use strict";

const dataController = require("../database/");

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
    },
    sendUserRequest(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            dataController.users.getUserByUsername(req.params.username)
                .then(user => {
                    user.requests.push({
                        _id: `${req.user.username};${req.user.firstname};${req.user.lastname}`,
                        requestUser: req.user.username,
                        requestUserFullname: `${req.user.firstname} ${req.user.lastname}`,
                        requestUserImage: req.user.image
                    });

                    res.redirect("/home");
                })
                .catch(err => res.json(err));
        }
    },
    confirmFriendshipRequest(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let requestId = req.params.requestId,
                otherUser = requestId.split(";")[0];
            dataController.users.getUserByUsername(otherUser)
                .then(user => {
                    // Update this when connect the app with Database
                    user.friends.push({
                        username: req.user.username,
                        _id: req.user._id,
                        image: req.user.image
                    });

                    return user;
                })
                .then(friend => {
                    // Update this when connect the app with Database
                    let currentUser = req.user;
                    currentUser.friends.push({
                        username: friend.username,
                        _id: friend._id,
                        image: friend.image
                    });

                    currentUser.requests.forEach((request, index) => {
                        if (request._id === requestId) {
                            currentUser.requests.splice(index, 1);
                            return;
                        }
                    });
                })
                .then(res.redirect("/profile"))
                .catch(err => res.json(err));
        }
    },
    removeUserFromFriends(req, res, next) {

    }
};
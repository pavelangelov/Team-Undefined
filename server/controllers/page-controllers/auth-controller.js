"use strict";

const passport = require("passport"),
    data = require("../../../database/controllers");

module.exports = {
    login(req, res, next) {
        const auth = passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (user) {
                req.login(user, (error) => {
                    if (error) {
                        return res.json(error);
                    }

                    return res.status(200)
                        .send("home");
                });
            } else {
                res.status(404)
                    .send(`${info.message}`);
            }
        });

        auth(req, res, next);
    },
    register(req, res, next) {
        let user = req.body;

        data.userController.createUser(user)
            .then(() => {
                res.status(201)
                    .send("");
            })
            .catch(err => res.status(404).send(err.message));
    },
    home(req, res, next) {
        if (!req.isAuthenticated()) {
            data.userController.getAnonymousUser()
                .then(user => {
                    let posts = [];
                    res.render("user-home", { user, posts });
                });
        } else {
            let user = req.user;
            data.postController.getPostsByUserId(user._id)
                .then(posts => {
                    res.render("user-home", { user, posts });
                })
                .catch(err => res.json(err));
        }
    },
    messages(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        data.messageControler.getUserMessages(user._id)
            .then(messages => {
                res.render("user-messages", { user, messages });
            })
            .catch(err => res.json(err));
    },
    profile(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            let user = req.user;
            res.render("user-profile", { user });
        }
    },
    friends(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }
        let user = req.user;
        res.render("user-friends", { user });
    },
    friendsSearch(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }
        let user = req.user;
        let str = req.body.search;
        if (str) {
            data.userController.getNonFriendsUsers(str, user)
                .then(searchedUsers => {
                    res.render("user-searchFriends", { user, searchFriends: searchedUsers });
                });
        }
    },
    searchFriends(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }
        let user = req.user;
        let str = req.body.search;
        data.userController.getNonFriendsUsers(str, user)
            .then(searchedUsers => {
                res.render("user-searchFriends", { user, searchFriends: searchedUsers });
            });
    },
    getUpdateUser(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        res.render("update-details", { user });
    },
    updateUser(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user,
            newPass = req.body.newPassword,
            confirmPassword = req.body.confirmPassword;

        if (confirmPassword === newPass) {
            data.userController.updateUser(user, newPass)
                .then(res.redirect("/profile"))
                .catch(err => res.json(err));
        } else {
            res.render("update-details", { user });
        }
    },
    about(req, res, next) {
        if (req.user) {
            let user = req.user;
            data.userController.getTeamMembers()
                .then(team => {
                    res.render("about", { user, team });
                });
        } else {
            Promise.all([data.userController.getAnonymousUser(), data.userController.getTeamMembers()])
                .then(([user, team]) => {
                    res.render("about", { user, team });
                })
                .catch(err => res.json(err));
        }
    },
    logout(req, res) {
        req.logout();

        res.redirect("/");
    }
};
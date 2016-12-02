"use strict";

const passport = require("passport"),
    dataController = require("../database/");

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

                    return res.redirect("/home");
                });
            } else {
                res.status(404)
                    .send(`<h2>${info.message}</h2><a href="/"> Go back<a/>`);
            }
        });

        auth(req, res, next);
    },
    register(req, res, next) {
        let user = req.body;

        dataController.users.createUser(user)
            .then((newUser) => {
                res.send(newUser);
            })
            .catch(err => res.send(err));
        // TODO: check all value and escape bad symbols
        // res.send({ email, password, firstname, lastname });
    },
    home(req, res, next) {
        if (!req.isAuthenticated()) {
            dataController.users.getAnonymousUser()
                .then(user => {
                    let posts = [];
                    res.render("user-home", { user, posts });
                });
        } else {
            let user = req.user;
            dataController.posts.getPostsByUserId(user._id)
                .then(posts => {
                    res.render("user-home", { user, posts });
                });
        }
    },
    messages(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        dataController.messages.getUserMessages(user._id)
            .then(messages => {
                res.render("user-messages", { user, messages });
            });
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
        res.render("user-friends", { user, friends: user.friends });
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
            dataController.users.updateUser(user, newPass)
                .then(res.redirect("/profile"));
        } else {
            res.render("update-details", { user });
        }
    },
    about(req, res, next) {
        if (req.user) {
            let user = req.user;
            dataController.users.getTeamMembers()
                .then(team => {
                    res.render("about", { user, team });
                });
        } else {
            dataController.users.getAnonymousUser()
                .then(user => {
                    dataController.users.getTeamMembers()
                        .then(team => {
                            res.render("about", { user, team });
                        });
                });
        }
    },
    logout(req, res) {
        req.logout();

        res.redirect("/");
    }
};
"use strict";

const passport = require("passport"),
    dataController = require("../database/");

module.exports = {
    login(req, res, next) {
        const auth = passport.authenticate("local", (err, user) => {
            if (err) {
                return next(err);
            }

            if (user) {
                req.login(user, (error) => {
                    if (error) {
                        return res.json(err);
                    }

                    return res.redirect("/home");
                });
            }
            else {
                res.status(404).send("<h2>This user not Exist</h2>");
            }
        });

        auth(req, res, next);
    },
    register(req, res, next) {
        let user = req.body;

        dataController.users.createUser(user).then((newUser) => {
            res.send(newUser);
        });
        // TODO: check all value and escape bad symbols
        // res.send({ email, password, firstname, lastname });
    },
    home(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
        }

        let user = req.user;
        dataController.posts.getPostsByUserId(user._id)
            .then(posts => {
                res.render("user-home", { user, posts });
            });
    },
    messages(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
        }

        let user = req.user;
        res.render("user-messages", { user, messages: user.messages });
    },
    profile(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
        }

        let user = req.user;
        res.render("user-profile", { user });
    },
    friends(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
        }

        let user = req.user;
        res.render("user-friends", { user, friends: user.friends });
    },
    getUpdateUser(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
        }

        let user = req.user;
        res.render("update-details", { user });
    },
    updateUser(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send("<h2>No authentication</h2>");
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
    about(req, res, net) {
        let team = dataController.team,
            user = req.user;
            console.log(user);
        res.render("about", { user, team });
    },
    logout(req, res) {
        req.logout();

        res.redirect("/");
    }
};
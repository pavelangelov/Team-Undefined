"use strict";

const controler = require("../controllers");
let User = require("../data/user-model");

module.exports = (app) => {
    app.get("/", (req, res) => {
            res.render("index");
        })
        .post("/login", (req, res) => {
            let username = req.body.email,
                password = req.body.password;

            controler.users.getUserByUsername(username)
                .then(user => {
                    controler.users.getPostsByUserId(user._id)
                        .then(posts => {
                            res.render("user-home", { user, posts });
                        });
                });
        })
        .post("/register", (req, res) => {
            let user = req.body;

            controler.users.createUser(user).then((newUser) => {
                res.send(newUser)
            });
            // TODO: check all value and escape bad symbols
            //res.send({ email, password, firstname, lastname });

        })
        .get("/users/:username/messages", (req, res) => {
            controler.users.getUserByUsername(req.params.username)
                .then(user => {
                    res.render("user-messages", { user, messages: user.messages });
                });
        })
        .get("/users/:username/profile", (req, res) => {
            controler.users.getUserByUsername(req.params.username)
                .then(user => {
                    console.log(user.friends.length);
                    res.render("user-profile", { user });
                });
        })
        .get("/users/:username/update-details", (req, res) => {
            controler.users.getUserByUsername(req.params.username)
                .then(user => {
                    res.render("update-details", { user });
                })
                .catch(err => console.log(err));
        })
        .post("/users/:username/update-details", (req, res) => {
            let username = req.params.username;
            // TODO: update user details in database

            let newPass = req.body.newPassword;
            let confirmPassword = req.body.confirmPassword;

            controler.users.getUserByUsername(username)
                .then(user => {
                    if (confirmPassword === newPass) {
                        controler.users.updateInfo(user, newPass)
                            .then(user => {
                                res.redirect(`/users/${user.username}/profile`);
                            });
                    } else {
                        res.render("update-details", { user });
                    }
                });


            //res.redirect(`/users/${username}/profile`);
        })
        .get("/users/:username/friends", (req, res) => {
            controler.users.getUserByUsername("pavel")
                .then(user => {
                    res.render("user-friends", { user, friends: user.friends });
                });
        })
        .get("/logout", (req, res) => {
            res.redirect("/");
        })
        .all("*", (req, res) => {
            res.status(404);
            res.send("Not Found");
            res.end();
        });
};
/* globals params */

"use strict";

const controler = require("../controllers");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        controler.users.getUserByUsername("pavel")
            .then(user => {
                controler.users.getPostsByUserId(user._id)
                    .then(posts => {
                        res.render("user-home", { user, posts });
                    });
            });
    });

    app.get("/messages/:username", (req, res) => {
        controler.users.getUserByUsername(req.params.username)
            .then(user => {
                res.render("user-messages", { user, messages: user.messages });
            });
    });

    app.get("/logout", (req, res) => {
        res.redirect("/");
    });

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not Found");
        res.end();
    });
};

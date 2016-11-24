"use strict";

const controler = require("../controllers");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        controler.users.getUserByUsername("pavel")
            .then(user => {
                res.render("user-home", user);
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
"use strict";

const router = require("express").Router(),
    auth = require("../controllers/auth/auth-controller");
// let User = require("../models/user-model");

module.exports = (app) => {
    router.get("/", (req, res) => {
            res.render("index");
        })
        .post("/login", auth.login)
        .get("/home", auth.home)
        .post("/register", auth.register)
        .get("/messages", auth.messages)
        .get("/profile", auth.profile)
        .get("/update-details", auth.getUpdateUser)
        .post("/update-details", auth.updateUser)
        .get("/friends", auth.friends)
        .get("/logout", auth.logout)
        .get("/about", auth.about)
        .all("*", (req, res) => {
            res.status(404);
            res.send("Not Found");
            res.end();
        });

    app.use(router);
};
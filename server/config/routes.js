"use strict";

const router = require("express").Router(),
    authController = require("../controllers/page-controllers/auth-controller"),
    usersController = require("../controllers/page-controllers/users-controller");
// let User = require("../models/user-model");

module.exports = (app) => {
    router.get("/", (req, res) => {
        if (req.user) {
            res.redirect("/home");
        } else {
            res.render("index");
        }
    })
        .post("/login", authController.login)
        .get("/home", authController.home)
        .post("/register", authController.register)
        .get("/messages", authController.messages)
        .get("/profile", authController.profile)
        .get("/update-details", authController.getUpdateUser)
        .post("/update-details", authController.updateUser)
        .get("/friends", authController.friends)
        .get("/logout", authController.logout)
        .get("/about", authController.about)
        .get("/users/:username/profile", usersController.userProfile)
        .all("*", (req, res) => {
            res.status(404);
            res.send("Not Found");
            res.end();
        });

    app.use(router);
};
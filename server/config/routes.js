"use strict";
const str = "";
const router = require("express").Router(),
    authController = require("../controllers/page-controllers/auth-controller"),
    usersController = require("../controllers/page-controllers/users-controller"),
    messagesController = require("../controllers/page-controllers/messages-controller"),
    postsController = require("../controllers/page-controllers/posts-controller"),
    statusCodeNotFound = 404;

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
        .post("/friends", authController.friendsSearch)
        .get("/searchFriends", authController.searchFriends)
        .post("/searchFriends", authController.searchFriends)
        .get("/logout", authController.logout)
        .get("/about", authController.about)
        .get("/users/:username/profile", usersController.userProfile)
        .get("/send-friendship-reques/:username", usersController.sendUserRequest)
        .post("/confirm-request/:requestId", usersController.confirmFriendshipRequest)
        .get("/send-message/:username", messagesController.getAddMessagePage)
        .post("/send-message/:username", messagesController.addMessage)
        .get("/create-post/:username", postsController.getCreatePost)
        .post("/create-post/:username", postsController.addPost)
        .put("/posts/:postId/increase-likes", postsController.increasePostLikes)
        .put("/posts/:postId/decrease-likes", postsController.decreasePostLikes)
        .all("*", (req, res) => {
            res.status(statusCodeNotFound);
            res.send("Not Found");
            res.end();
        });

    app.use(router);
};
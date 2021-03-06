"use strict";

const router = require("express").Router(),
    statusCodeNotFound = 404;
let multipart = require("connect-multiparty");
let multipartMiddleware = multipart();


module.exports = (app, pageController) => {
    router.get("/", (req, res) => {
            if (req.user) {
                res.redirect("/home");
            } else {
                res.render("index");
            }
        })
        .post("/login", pageController.auth.login)
        .get("/home", pageController.auth.home)
        .post("/register", pageController.auth.register)
        .get("/friends", pageController.auth.friends)
        .post("/friends", pageController.auth.friendsSearch)
        .get("/searchFriends", pageController.auth.searchFriends)
        .post("/searchFriends", pageController.auth.searchFriends)
        .get("/logout", pageController.auth.logout)
        .get("/about", pageController.auth.about)
        .get("/profile", pageController.users.profile)
        .get("/update-details", pageController.users.getUpdateUser)
        .post("/update-details", multipartMiddleware, pageController.users.updateUser)
        .post("/update-image", multipartMiddleware, pageController.users.uploadUserImage)
        .get("/users/:username/profile", pageController.users.userProfile)
        .get("/send-friendship-reques/:username", pageController.users.sendUserRequest)
        .post("/confirm-request/:requestId", pageController.users.confirmFriendshipRequest)
        .get("/messages", pageController.messages.getMessages)
        .get("/send-message/:username", pageController.messages.getAddMessagePage)
        .post("/send-message/:username", pageController.messages.addMessage)
        .get("/create-post/:username", pageController.posts.getCreatePost)
        .post("/create-post/:username", pageController.posts.addPost)
        .put("/posts/:postId/increase-likes", pageController.posts.increasePostLikes)
        .put("/posts/:postId/decrease-likes", pageController.posts.decreasePostLikes)
        .get("/unauthorized", (req, res) => {
            res.render("no-auth");
        })
        .all("*", (req, res) => {
            res.status(statusCodeNotFound);
            res.render("error");
        });

    app.use(router);
};
"use strict";

const data = require("../../../database/controllers");

module.exports = {
    getCreatePost(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        data.userController.getUserByUsername(req.params.username)
            .then(reciever => {
                res.render("users/create-post", { user: req.user, reciever });
            })
            .catch(err => res.json(err));
    },
    addPost(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        let postLikeObj = {
            author: user.username,
            authorId: user._id,
            targetUserId: req.body.id,
            image: user.image,
            postDate: new Date(),
            content: req.body.content
        };

        data.postController.createPost(postLikeObj)
            .then(res.redirect("/home"))
            .catch(err => res.json(err));
    }
};
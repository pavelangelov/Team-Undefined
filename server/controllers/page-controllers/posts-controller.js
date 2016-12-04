"use strict";

const data = require("../../../database/controllers"),
    statusCodes = require("../status-codes");

module.exports = {
    getCreatePost(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        data.users.getUserByUsername(req.params.username)
            .then(reciever => {
                res.render("users/create-post", { user: req.user, reciever });
            })
            .catch(err => res.json(err));
    },
    addPost(req, res) {
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

        data.posts.createPost(postLikeObj)
            .then(res.redirect("/home"))
            .catch(err => res.json(err));
    },
    increasePostLikes(req, res) {
        let postId = req.params.postId,
            userId = req.user._id;

        data.posts.increaseLikes(postId, userId)
            .then(post => {
                res.status(statusCodes.OK.code)
                    .send(`${post.likes + 1}`);
            })
            .catch(err => res.status(statusCodes.BadRequest.code).send(err.message));
    },
    decreasePostLikes(req, res) {
        let postId = req.params.postId,
            userId = req.user._id;

        data.posts.decreaseLikes(postId, userId)
            .then(post => {
                res.status(statusCodes.OK.code)
                    .send(`${post.likes - 1}`);
            })
            .catch(err => res.status(statusCodes.BadRequest.code).send(err.message));
    }
};
"use strict";

const statusCodes = require("../status-codes");

module.exports = (data) => {
    return {
        getCreatePost(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            data.users.getUserByUsername(req.params.username)
                .then(reciever => {
                    res.render("users/create-post", { user: req.user, reciever });
                })
                .catch(err => res.json(err));
        },
        addPost(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            let today = new Date(),
                date = `${today.toLocaleDateString()} at ${today.toLocaleTimeString()}`;
            let user = req.user;
            let postLikeObj = {
                author: user.username,
                authorId: user._id,
                targetUser: req.params.username,
                targetUserId: req.body.id,
                image: user.image,
                postDate: date,
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
};
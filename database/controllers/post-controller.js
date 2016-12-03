"use strict";

const Post = require("../models").Post;

module.exports = {
    createPost(postLikeObj) {
        let post = new Post({
            author: postLikeObj.author,
            authorId: postLikeObj.authorId,
            targetUserId: postLikeObj.targetUserId,
            image: postLikeObj.image,
            postDate: postLikeObj.postDate,
            likes: 0,
            content: postLikeObj.content
        });

        return new Promise((resolve, reject) => {
            post.save((err, dbPost) => {
                if (err) {
                    return reject(err);
                }

                return resolve(dbPost);
            });
        });
    },
    getPostById(postId) {
        return new Promise((resolve, reject) => {
            Post.findOne({ "_id": postId }, (err, post) => {
                if (err) {
                    return reject(err);
                }

                return resolve(post);
            });
        });
    },
    getPostsByUserId(userId) {
        return new Promise((resolve, reject) => {
            Post.find({ "authorId": userId, "targetUserId": userId }, (err, posts) => {
                if (err) {
                    return reject(err);
                }

                return resolve(posts);
            });
        });
    }
};
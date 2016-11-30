"use strict";

const db = require("../../../database/fakeDatas");

module.exports = {
    getPostsByUserId(userId) {
        let posts = db.posts
            .filter(post => post.authorId === userId || post.targetUserId === userId);

        return Promise.resolve()
            .then(() => {
                return posts;
            });
    }
};
"use strict";

// let User = require("mongoose").model("User");

// module.exports = {
//     register: (req, res) => {
//         res.redirect("/");
//     },
//     login: (req, res) => {
//         res.redirect("/");
//     },
//     logout: (req, res) => {
//         res.redirect("/");
//     }
// };

const db = require("../../database/fakeDatas");

module.exports = {
    getAllUsers() {
        let users = db.users;

        return Promise.resolve()
            .then(() => {
                return users;
            });
    },
    getUserById(id) {
        let user = db.users.find(x => x._id === id);

        return Promise.resolve()
            .then(() => {
                return user;
            });
    },
    getUserByUsername(username) {
        let user = db.users.find(x => x.username === username);

        return Promise.resolve()
            .then(() => {
                return user;
            });
    },
    getPostsByUserId(userId) {
        let posts = db.posts
            .filter(post => post.authorId === userId || post.targetUserId === userId);

        return Promise.resolve()
            .then(() => {
                return posts;
            });
    },
    getAllUserFriends(username) {
        let friends = db.users
            .find(x => x.username === username).friends;

        return Promise.resolve()
            .then(() => {
                return friends;
            });
    }
};
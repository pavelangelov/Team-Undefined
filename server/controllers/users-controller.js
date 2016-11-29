"use strict";

let User = require("../data/user-model");
const db = require("../../database/fakeDatas");

module.exports = {
    createUser(user) {
        var newUser = new User({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password
        });

        return Promise.resolve()
            .then(() => {
                newUser.save((err, user) => {
                    if (err) return console.log(err);

                    console.log('User saved!');
                });
            });
    },
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
            })
    }
};
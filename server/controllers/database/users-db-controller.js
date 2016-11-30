"use strict";

let User = require("../../models/user-model");
const db = require("../../../database/fakeDatas");

module.exports = {
    createUser(user) {
        let newUser = new User({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password
        });

        return Promise.resolve()
            .then(() => {
                return "<h1>Save user is not implemented</h2>";
                // newUser.save((err, user) => {
                //     if (err) {
                //         return console.log(err);
                //     }

                //     console.log("User saved!");
                // });
            });
    },
    updateUser(user, newPassword) {
        // TODO: Update user details

        return Promise.resolve()
            .then(() => {
                // db.updateOne(user, $password: newPassword);
                return user;
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
    }
};
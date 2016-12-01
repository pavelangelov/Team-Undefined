"use strict";

let User = require("../../models/user-model");
const db = require("../../../database/fakeDatas"),
    defaultUserImage = "/static/images/pesho.jpg";

module.exports = {
    createUser(user) {
        // check if the username already exist
        if (db.users.some(x => x.username === user.username)) {
            return Promise.reject("This username already exist!");
        } else {
            let newUser = new User({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password,
                image: defaultUserImage
            });

            db.users.push(newUser);

            return Promise.resolve()
                .then(() => {
                    return newUser;
                    // newUser.save((err, user) => {
                    //     if (err) {
                    //         return console.log(err);
                    //     }

                    //     console.log("User saved!");
                    // });
                });
        }
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
    },
    getTeamMembers() {
        let team = db.users.filter(x => x.isTeamMember === true);

        return Promise.resolve()
            .then(() => {
                return team;
            });
    },
    getAnonymousUser() {
        let user = db.anonymousUser;

        return Promise.resolve()
            .then(() => {
                return user;
            });
    }
};
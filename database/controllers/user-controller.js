"use strict";

let User = require("../models").User,
    fakeDb = require("../fakeDatas"),
    validator = require("../../utils/validator"),
    defaultUserImage = "/static/images/pesho.jpg";

module.exports = {
    createUser(user) {
        user.username = validator.validateUsername(user.username);
        user.password = validator.validatePassword(user.password);

        let newUser = new User({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            fullname: `${user.firstname} ${user.lastname}`,
            password: user.password,
            image: defaultUserImage,
            telerikAccount: user.telerikAccount,
            githubAccount: user.telerikAccount,
            requests: [],
            friends: []
        });
        return new Promise((resolve, reject) => {
            newUser.save((err, dbUser) => {
                if (err) {
                    return reject(err);
                }
                return resolve(dbUser);
            });
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
    sendRequest(username, request) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate(
                { "username": username },
                { $push: { "requests": request } },
                (err, dbReq) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(dbReq);
                });
        });
    },
    addFriend(username, friend) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate(
                { "username": username },
                { $push: { "friends": friend } },
                (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                }
            );
        });
    },
    removeRequest(username, requestId) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate(
                { "username": username },
                { $pull: { "requests": { "_id": requestId } } },
                { safe: true },
                (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
        });
    },
    getFiltredUsersByPartOfFullname(value) {
        value = validator.escapeBadSymbols(value);
        return new Promise((resolve, reject) => {
            User.find({ "fullname": { "$regex": value, "$options": "i" } }, (err, docs) => {
                if (err) {
                    return reject(err);
                }

                return resolve(docs);
            });
        });
    },
    getUserById(id) {
        return new Promise((resolve, reject) => {
            User.findOne({ "_id": id }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    getUserByUsername(username) {
        username = validator.escapeBadSymbols(username);
        return new Promise((resolve, reject) => {
            User.findOne({ "username": username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    getTeamMembers() {
        let team = fakeDb.teamMembers;

        return Promise.resolve()
            .then(() => {
                return team;
            });
    },
    getAnonymousUser() {
        let user = fakeDb.anonymousUser;

        return Promise.resolve()
            .then(() => {
                return user;
            });
    }
};
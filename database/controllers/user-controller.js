"use strict";

let User = require("../models").User,
    fakeDb = require("../fakeDatas"),
    validator = require("../../utils/validator"),
    defaultUserImage = "/static/images/pesho.jpg";

module.exports = {
    createUser(user) {
        validator.validateUsername(user.username);
        validator.validatePassword(user.password);

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
    updateUser(user, firstName, lastName, userInfo, newImage) {
        firstName = firstName || user.firstname;
        lastName = lastName || user.lastname;
        userInfo = userInfo || user.userInfo;
        newImage = newImage || user.image;

        validator.validateName(firstName);
        validator.validateName(lastName);

        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ "_id": user._id }, { "firstname": firstName, "lastname": lastName, "userInfo": userInfo, "image": newImage }, { save: true },
                (err, user1) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user1);
                });
        });
    },
    sendRequest(username, request) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ "username": username }, { $push: { "requests": request } },
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
            User.findOneAndUpdate({ "username": username }, { $push: { "friends": friend } },
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
            User.findOneAndUpdate({ "username": username }, { $pull: { "requests": { "_id": requestId } } }, { safe: true },
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
        return new Promise((resolve, reject) => {
            User.findOne({ "username": username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    getNonFriendsUsers(str, user) {
        return new Promise((resolve, reject) => {
            let userFriends = user.friends;
            userFriends.push(user);
            let searchedUsers = [],
                findedUsers = [];
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }
                userFriends.forEach((f) => {
                    let id = f.id;
                    users.forEach((u) => {
                        if (u.id != id) {
                            searchedUsers.push(u);
                        }
                    });
                });
                searchedUsers.forEach((f) => {
                    if (f.username.indexOf(str) > -1) {
                        findedUsers.push(f);
                    } else if (f.fullname.indexOf(str) > -1) {
                        findedUsers.push(f);
                    }
                });
                return resolve(findedUsers);
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
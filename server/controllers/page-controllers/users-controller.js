"use strict";
const JSFtp = require("jsftp");

const ftp = new JSFtp({
    host: process.env["FTP_HOST"],
    port: process.env["FTP_PORT"],
    user: process.env["FTP_USER"],
    pass: process.env["FTP_PASS"]
});


module.exports = (data) => {
    return {
        profile(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            } else {
                let user = req.user;
                res.render("user-profile", { user });
            }
        },
        userProfile(req, res) {
            let otherUsername = req.params.username;

            if (!req.isAuthenticated()) {
                Promise.all([data.users.getAnonymousUser(), data.users.getUserByUsername(otherUsername)])
                    .then(([user, pageOwner]) => {
                        res.render("users/users-profile", { user, pageOwner });
                    })
                    .catch(err => res.json(err));
            } else {
                let user = req.user;
                data.users.getUserByUsername(otherUsername)
                    .then(otherUser => {
                        if (user.friends.some(x => x._id.toString() === otherUser._id.toString())) {
                            otherUser.isFriend = true;
                        }

                        res.render("users/users-profile", { user, pageOwner: otherUser });
                    })
                    .catch(err => res.json(err));
            }
        },
        getUpdateUser(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            let user = req.user;
            res.render("update-details", { user });
        },
        sendUserRequest(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            } else if (req.user.friends.some(fr => fr.username.toString() === req.params.username)) {
                res.redirect("/");
            } else {
                let request = {
                    _id: `${req.user.username};${req.user.firstname};${req.user.lastname}`,
                    requestUser: req.user.username,
                    requestUserFullname: `${req.user.firstname} ${req.user.lastname}`,
                    requestUserImage: req.user.image
                };
                data.users.sendRequest(req.params.username, request)
                    .then(res.redirect("/home"))
                    .catch(err => res.json(err));
            }
        },
        confirmFriendshipRequest(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            } else {
                let requestId = req.params.requestId,
                    otherUser = requestId.split(";")[0];

                let self = {
                    username: req.user.username,
                    _id: req.user._id,
                    image: req.user.image
                };
                data.users.addFriend(otherUser, self)
                    .then(user => {
                        let friend = {
                            username: user.username,
                            _id: user._id,
                            image: user.image
                        };

                        Promise.all([data.users.addFriend(req.user.username, friend), data.users.removeRequest(req.user.username, requestId)])
                            .then(() => {
                                let wait = 500;
                                setTimeout(() => {
                                    res.redirect("/profile");
                                }, wait);
                            });
                    })
                    .catch(err => res.json(err));
            }
        },
        removeUserFromFriends() { },
        updateUser(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            let newImage;
            if (req.files.file.originalFilename) {
                let image = req.files.file.originalFilename,
                    tempPath = req.files.file.path;
                newImage = `http://nodejsapp.netcoms.eu/images/${image}`;

                ftp.put(tempPath, image, (error) => {
                    if (!error) {
                        console.log("File transferred successfully!");
                    }
                });
            }

            let user = req.user,
                firstName = req.body.firstname,
                lastName = req.body.lastname,
                userInfo = req.body.about;
            data.users.updateUser(user, firstName, lastName, userInfo, newImage)
                .then(res.redirect("/profile"))
                .catch(err => res.json(err));
        },
        uploadUserImage(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            if (req.files.file.originalFilename) {
                let image = req.files.file.originalFilename,
                    tempPath = req.files.file.path,
                    newImage = `http://nodejsapp.netcoms.eu/images/${image}`;

                ftp.put(tempPath, image, (error) => {
                    if (!error) {
                        console.log("File transferred successfully!");
                    }
                });

                data.users.updateUserImage(req.user._id, newImage)
                    .then(res.status(200).redirect("/profile"))
                    .catch(err => console.log(err.message));
            }
        }
    };
};
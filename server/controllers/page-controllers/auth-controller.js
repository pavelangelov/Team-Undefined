"use strict";

const passport = require("passport"),
    statusCodes = require("../status-codes");

module.exports = (data) => {
    return {
        login(req, res, next) {
            const auth = passport.authenticate("local", (err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (user) {
                    req.login(user, (error) => {
                        if (error) {
                            return res.json(error);
                        }

                        return res.status(statusCodes.OK.code)
                            .send("home");
                    });
                } else {
                    res.status(statusCodes.NotFound.code)
                        .send(`${info.message}`);
                }
            });

            auth(req, res, next);
        },
        register(req, res) {
            let user = req.body;

            data.users.createUser(user)
                .then(() => {
                    res.status(statusCodes.Created.code)
                        .send("");
                })
                .catch(err => res.status(statusCodes.BadRequest.code).send(err.message));
        },
        home(req, res) {
            if (!req.isAuthenticated()) {
                data.users.getAnonymousUser()
                    .then(user => {
                        let posts = [];
                        res.render("user-home", { user, posts });
                    });
            } else {
                let user = req.user;
                data.posts.getPostsByUserId(user._id)
                    .then(posts => {
                        posts.forEach(p => {
                            if (p.likesFrom.some(l => l.toString() === user._id.toString())) {
                                p.isLiked = true;
                            }
                        });
                        res.render("user-home", { user, posts });
                    })
                    .catch(err => res.status(statusCodes.BadRequest.code).send(err.message));
            }
        },
        friends(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }
            let user = req.user;
            res.render("user-friends", { user });
        },
        friendsSearch(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }
            let user = req.user;
            let str = req.body.search;
            if (str) {
                data.users.getNonFriendsUsers(str, user)
                    .then(searchedUsers => {
                        res.render("user-searchFriends", { user, searchFriends: searchedUsers });
                    });
            }
        },
        searchFriends(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }
            let user = req.user;
            let str = req.body.search;
            console.log(str);
            data.users.getNonFriendsUsers(str, user)
                .then(searchedUsers => {
                    res.render("user-searchFriends", { user, searchFriends: searchedUsers });
                });
        },
        about(req, res) {
            if (req.user) {
                let user = req.user;
                data.users.getTeamMembers()
                    .then(team => {
                        res.render("about", { user, team });
                    });
            } else {
                Promise.all([data.users.getAnonymousUser(), data.users.getTeamMembers()])
                    .then(([user, team]) => {
                        res.render("about", { user, team });
                    })
                    .catch(err => res.json(err));
            }
        },
        logout(req, res) {
            req.logout();

            res.redirect("/");
        }
    };
};
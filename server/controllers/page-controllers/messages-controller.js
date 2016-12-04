"use strict";

const data = require("../../../database/controllers");

module.exports = {
    getAddMessagePage(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        data.users.getUserByUsername(req.params.username)
            .then(reciever => {
                res.render("users/send-message", { user: req.user, reciever });
            })
            .catch(err => res.json(err));
    },
    addMessage(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        let messageObj = {
            author: user.username,
            authorId: user._id,
            targetUserId: req.body.id,
            image: user.image,
            postDate: new Date(),
            content: req.body.content
        };

        data.messages.createMessage(messageObj)
            .then(res.redirect("/home"))
            .catch(err => res.json(err));
    },
    messages(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/");
        }

        let user = req.user;
        data.messages.getUserMessages(user._id)
            .then(messages => {
                res.render("user-messages", { user, messages });
            })
            .catch(err => res.json(err));
    }
};
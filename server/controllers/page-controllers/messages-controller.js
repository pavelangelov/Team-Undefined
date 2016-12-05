"use strict";

module.exports = (data) => {
    return {
        getAddMessagePage(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            data.users.getUserByUsername(req.params.username)
                .then(reciever => {
                    res.render("users/send-message", { user: req.user, reciever });
                })
                .catch(err => res.json(err));
        },
        addMessage(req, res) {
            if (!req.isAuthenticated()) {
                res.redirect("/unauthorized");
            }

            let today = new Date(),
                date = `${today.toLocaleDateString()} at ${today.toLocaleTimeString()}`;

            let user = req.user;
            let messageObj = {
                author: user.username,
                authorId: user._id,
                targetUser: req.params.username,
                targetUserId: req.body.id,
                image: user.image,
                postDate: date,
                content: req.body.content
            };

            data.messages.createMessage(messageObj)
                .then(() => {
                    data.users.addUnreadMessage(messageObj.targetUserId)
                        .then(res.redirect("/messages"));
                })
                .catch(err => res.json(err));
        },
        getMessages(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }

            let user = req.user;
            data.messages.getUserMessages(user._id)
                .then(messages => {
                    data.users.restoreMessagesCount(user._id)
                        .then(() => {
                            res.render("user-messages", { user, messages });
                        });
                })
                .catch(err => res.json(err));
        }
    };
};
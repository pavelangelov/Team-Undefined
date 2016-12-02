"use strict";

const Message = require("../models").Message;

module.exports = {
    createMessage(messageObj) {
        let message = new Message({
            author: messageObj.author,
            authorId: messageObj.authorId,
            targetUserId: messageObj.targetUserId,
            image: messageObj.image,
            postDate: messageObj.postDate,
            content: messageObj.content
        });

        return new Promise((resolve, reject) => {
            message.save((err, msg) => {
                if (err) {
                    return reject(err);
                }

                return resolve(msg);
            });
        });
    },
    getUserMessages(userId) {
        return new Promise((resolve, reject) => {
            Message.find({ "targetId": userId }, (err, messages) => {
                if (err) {
                    return reject(err);
                }

                return resolve(messages);
            });
        });
    }
};
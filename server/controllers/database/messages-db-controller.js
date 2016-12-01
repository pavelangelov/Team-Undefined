"use strict";

const db = require("../../../database/fakeDatas");

module.exports = {
    getUserMessages(userId) {
        let messages = db.messages
            .filter(message => message.targetUserId === userId);

        return Promise.resolve()
            .then(() => {
                return messages;
            });
    }
};
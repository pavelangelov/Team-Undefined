"use strict";

const LocalStrategy = require("passport-local");

module.exports = (passport, data) => {
    const strategy = new LocalStrategy((username, password, done) => {
        // Update user validation
        data.users.getUserByUsername(username, password)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });

    passport.use(strategy);
};
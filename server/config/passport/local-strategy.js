"use strict";

const LocalStrategy = require("passport-local");

module.exports = (passport, data) => {
    const strategy = new LocalStrategy((username, password, done) => {
        // Update user validation
        data.users.getUserByUsername(username, password)
            .then(user => {
                if (!user) {
                    return done(null, false, { message: "Incorrect username." });
                }

                if (user.password !== password) {
                    return done(null, false, { message: "Incorrect password." });
                }

                return done(null, user);
            })
            .catch(error => done(error, false));
    });

    passport.use(strategy);
};
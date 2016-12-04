"use strict";

const passport = require("passport"),
    data = require("../../../database/controllers");


require("./local-strategy")(passport, data);

passport.serializeUser((user, done) => {
    // minimalistic example - serialize the user id in the session
    if (user) {
        done(null, user.username);
    }
});

passport.deserializeUser((username, done) => {
    // use the id serialized in the session to retrieve the use from the database
    data.users.getUserByUsername(username)
        .then(user => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch(error => done(error, false));
});


module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
};
"use strict";

const pug = require("pug");
const controler = require("../controllers");

module.exports = (app) => {
    app.get("/", (req, res) => {
        let html = pug.renderFile("./server/views/index.pug");
        res.send(html);
    });

    app.get("/login", (req, res) => {
        controler.users.getUserByUsername("pavel")
            .then(user => {
                pug.renderFile("./server/views/logged-user.pug", user, (err, html) => {
                    if (err) {
                        console.log(err);
                    }

                    res.send(html);
                });
            });
    });

    app.all("*", (req, res) => {
        res.status(404);
        res.send("Not Found");
        res.end();
    });
};
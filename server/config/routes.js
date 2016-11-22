"use strict"

module.exports = (app) => {
    app.get("/", (req, res) => {
        //let html = pug.renderFile("./server/views/index.pug");
        //res.send(html);
        res.render("index");
    });

    app.get("/login", (req, res) => {
        //let html = pug.renderFile("./server/views/logged-user.pug");
        //res.send(html);
        res.render("logged-user");
    });
}
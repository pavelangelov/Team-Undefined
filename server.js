"use strict";

const express = require("express");
const app = express();
//const pug = require("pug");

var env = process.env.PORT || "development";
let config = require('./server/config/config')[env]

require('./server/config/database')(config);

app.set("view engine", "pug");
app.set("views", config.rootPath + "/server/views");

app.use(express.static(config.rootPath + "/public"));

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

app.listen(config.port, () => {
    console.log(`Our app is running on http://localhost:${config.port}`);
});
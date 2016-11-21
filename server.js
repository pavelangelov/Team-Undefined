"use strict";

const express = require("express");
const app = express();
const pug = require("pug");

var port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set(__dirname + "/views/");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    let html = pug.renderFile("./views/index.pug");
    res.send(html);
});

app.get("/login", (req, res) => {
    let html = pug.renderFile("./views/logged-user.pug");
    res.send(html);
});

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
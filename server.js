"use strict";

const express = require("express");
const app = express();

var port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {

    // ejs render automatically looks in the views folder
    res.render("index");
});

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
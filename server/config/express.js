"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", `${config.path.rootPath}/server/views`);

    // here load other routs
    app.use(bodyParser.urlencoded({ extended: true, uploadDir: "../../public/images" }));
    app.use(bodyParser.json());
    let secretKey = process.env["SECRET_KEY"] || config.development.secret;
    app.use(cookieParser(secretKey));
    app.use(session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true
    }));

    require("./passport")(app);
    app.use("/static", express.static(`${config.path.rootPath}/public`));
};
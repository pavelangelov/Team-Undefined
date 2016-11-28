"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", `${config.path.rootPath}/server/views`);

    // here load other routs
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/static", router);
    app.use("/static", express.static(`${config.path.rootPath}/public`));
};
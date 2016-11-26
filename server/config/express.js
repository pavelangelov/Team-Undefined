"use strict";

const express = require("express");
const router = express.Router();

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", `${config.path.rootPath}/server/views`);

    // here load other routs
    app.use("/static", router);
    app.use("/static", express.static(`${config.path.rootPath}/public`));
};
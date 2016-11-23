"use strict";

const express = require("express");

module.exports = (config, app) => {
    app.set("view engine", "pug");
    app.set("views", `${config.rootPath}/server/views`);

    // here load other routs

    app.use(express.static(`${config.rootPath}/public`));
};
"use strict";

const express = require("express");

module.exports = (rootPath, app) => {
    app.set("view engine", "pug");
    app.set("views", `${rootPath}/server/views`);

    // here load other routs

    app.use(express.static(`${rootPath}/public`));
};
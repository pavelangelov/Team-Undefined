"use strict";

const express = require("express"),
    config = require("../config/config");

const app = express();

let env = require("../config/config")["development"];

const dataControler = require("../../database/controllers"),
    pageController = require("../controllers/page-controllers")(dataControler);

require("../config/database")(env);
require("../config/express")(config, app);
require("../config/routes")(app, pageController);

module.exports = app;
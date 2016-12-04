"use strict";

const express = require("express");
const config = require("./server/config/config");

const app = express();

let port = process.env.PORT || config.development.port;
let env = require("./server/config/config")["development"];

const dataControler = require("./database/controllers"),
    pageController = require("./server/controllers/page-controllers")(dataControler);

require("./server/config/database")(env);
require("./server/config/express")(config, app);
require("./server/config/routes")(app, pageController);

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
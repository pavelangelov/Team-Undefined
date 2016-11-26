"use strict";

const express = require("express");
const path = require("path");
const config = require("./server/config/config");

const app = express();

let port = process.env.PORT || config.development.port;

// require("./server/config/database")(config);
require("./server/config/express")(config, app);
require("./server/config/routes")(app);

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
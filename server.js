"use strict";

const express = require("express");
const path = require("path");

let rootPath = path.normalize(path.join(__dirname, "./"));

const app = express();

let port = process.env.PORT || 8080;
// let config = require("./server/config/config")[env];

// require("./server/config/database")(config);
require("./server/config/express")(rootPath, app);
require("./server/config/routes")(app);

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
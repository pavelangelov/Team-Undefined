"use strict";

const express = require("express");

const app = express();

let env = process.env.port || "development";
let config = require("./server/config/config")[env];

// require("./server/config/database")(config);
require("./server/config/express")(config, app);
require("./server/config/routes")(app);

app.listen(config.port, () => {
    console.log(`Our app is running on http://localhost:${config.port}`);
});
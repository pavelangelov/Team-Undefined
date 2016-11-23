"use strict";

const express = require("express");
//const pug = require("pug");

const app = express();

var env = process.env.PORT || "development";
let config = require('./server/config/config')[env]

require('./server/config/database')(config);
require('./server/config/express')(config, app);
require('./server/config/routes')(app);

app.listen(config.port, () => {
    console.log(`Our app is running on http://localhost:${config.port}`);
});
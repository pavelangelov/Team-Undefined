"use strict";

const path = require("path");
const developmentPort = 3001;

let rootPath = path.normalize(path.join(__dirname, "/../../"));


module.exports = {
    development: {
        db: "mongodb://localhost:27017/test-db",
        port: developmentPort,
        secret: "secret_key"
    },

    /* production: {
        // db: process.env.MONGO_DB_CONN_STRING,
    },*/
    path: { rootPath }
};
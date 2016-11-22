"use strict"

const mongoose = require("mongoose");

module.exports = (config) => {
    mongoose.connect(config.db);

    let db = mongoose.connection;

    db.once("open", err => {
        if (err) console.log(err)

        console.log("MongoDB ready!");
    })

    db.on("error", err => console.log("Database error: " + err));
}
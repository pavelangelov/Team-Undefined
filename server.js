"use strict";

const config = require("./server/config/config"),
    app = require("./server/config/app");

let port = process.env.PORT || config.development.port;

app.listen(port, () => {
    console.log(`Our app is running on http://localhost:${port}`);
});
const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const sendResponses = require("./helpers/sendResponses");
const onoff = require("onoff");
const app = express();
const port = 3000;
const Config = require("./config");
const { default: sendResponse } = require("./helpers/sendResponses");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/v1", require("./api/v1/router"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

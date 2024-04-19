require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(router);

module.exports = app;

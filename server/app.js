// Initilisation
require("dotenv").config();
const express = require("express"); // appel express
const app = express(); // appel fonction de express
const cors = require("cors"); // appel cors
const bodyParser = require("body-parser"); //appel body-parser


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = { app, express };

require('dotenv').config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Database = require('./src/Database');
const db = new Database();

const PORT = process.env.PORT || 5000;

//parses the request coming into json object
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
//implementing cors policy
app.use(cors());

app.use(require('./src/Route'));

app.listen(PORT, () => {
    console.log("===========================================");
    console.log(`Server running on port ${PORT}`);
    console.log("===========================================");
    console.log("\n");
});

module.exports = app
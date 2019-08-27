const express = require('express');

const server = express();

//use json for post request
server.use(express.json());

module.exports = server;

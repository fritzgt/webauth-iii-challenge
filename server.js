const express = require('express');

const server = express();

//use json for post request
server.use(express.json());

//implementing router
const usersRouter = require('./usersRouter');
server.use('/api/auth', usersRouter);

server.use('/', (req, res) => {
  res.status(200).send({ message: 'Connected!' });
});

module.exports = server;

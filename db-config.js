//importing knex library
const knex = require('knex');

//importing knex file
const config = require('./knexfile');

//exporting
module.exports = knex(config.development);

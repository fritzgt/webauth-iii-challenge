const db = require('../db-config');

module.exports = {
  find,
  findByUser,
  add,
  update,
  remove
};

function find() {}

//Login by finding a matching username
function findByUser(username) {
  return db('users')
    .where('username', '=', username)
    .first();
}

//Register a new user
function add(newUser) {
  return db('users').insert(newUser);
}

function update(changes, id) {}

function remove(id) {}

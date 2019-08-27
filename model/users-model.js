const db = require('../db-config');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {}

function findById(id) {}

function add(newUser) {
  return db('users').insert(newUser);
}

function update(changes, id) {}

function remove(id) {}

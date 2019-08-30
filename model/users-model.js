const db = require('../db-config');

module.exports = {
  find,
  findByUser,
  add
};

function find(currentDep) {
  return db
    .select('username', 'department')
    .from('users')
    .where('department', currentDep);
}

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

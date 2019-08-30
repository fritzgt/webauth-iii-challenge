exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    //auto id
    tbl.increments();
    //username
    tbl
      .text('username', 128)
      .unique()
      .notNullable();
    //Password
    tbl.text('password').notNullable();
    //department field to group the users
    tbl.text('department');
  });
};

exports.down = function(knex) {
  //dropping table
  return knex.schema.dropTableIfExists('users');
};


exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('users', function(table){
      table.increments().primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.string('image');
      table.string('password_digest').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};

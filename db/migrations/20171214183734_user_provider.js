
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_providers', function(table){
      table.integer('user_id').references('id').inTable('users');
      table.integer('provider_id').references('id').inTable('providers');
      table.string('username');
      table.string('password_digest');
      table.primary(['user_id', 'provider_id']);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_providers')
  ]);
};

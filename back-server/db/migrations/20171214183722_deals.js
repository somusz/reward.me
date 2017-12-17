
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('deals', function(table){
      table.increments().primary();
      table.integer('provider_id').references('id').inTable('providers');
      table.string('name');
      table.string('description');
      table.string('image');
      table.timestamp('expires_at');
      table.string('type');
      table.integer('price');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('deals')
  ]);
};

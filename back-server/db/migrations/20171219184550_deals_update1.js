
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deals', function(table){
      table.text('url');
      table.dropColumn('expires_at');
      table.dropColumn('type');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('deals', function(table){
      table.dropColumn('url');
      table.timestamp('expires_at');
      table.string('type');
    })
  ])
};

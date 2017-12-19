
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users_providers', function(table){
      table.string('membership_id');
      table.string('membership_email');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users_providers', function(table){
      table.dropColumn('membership_id');
      table.dropColumn('membership_email');
    })
  ])
};



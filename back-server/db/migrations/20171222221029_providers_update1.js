
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('providers', function(table){
      table.string('membership_username_required');
      table.string('membership_username_label');
      table.string('membership_id_required');
      table.string('membership_id_label');
      table.string('membership_email_required');
      table.string('membership_email_label');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('providers', function(table){
      table.dropColumn('membership_username_required');
      table.dropColumn('membership_username_label');
      table.dropColumn('membership_id_required');
      table.dropColumn('membership_id_label');
      table.dropColumn('membership_email_required');
      table.dropColumn('membership_email_label');
    })
  ])
};

const usersdata = require('./users.json');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(usersdata);
    });
};

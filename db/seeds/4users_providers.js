const usersProvidersData = require('./users_providers.json')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_providers').del()
    .then(function () {
      return knex('users_providers').insert(usersProvidersData);
    });
};

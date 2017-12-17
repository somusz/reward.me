const providersdata = require('./providers.json');

exports.seed = function(knex, Promise) {
  return knex('providers').del()
    .then(function () {
      return knex('providers').insert(providersdata);
    });
};

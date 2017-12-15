const dealsdata = require('./deals.json');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('deals').del()
    .then(function () {
      return knex('deals').insert(dealsdata);
    });

};

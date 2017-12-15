const express = require('express');
require('dotenv').config();
const ENV            = process.env.ENV || "development";
const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
const knexLogger     = require('knex-logger');
const bodyParser     = require("body-parser");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();

app.use(knexLogger(knex));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  knex.select('*').from('users').then( result => {
    res.send(JSON.stringify(result[0]));

  })
  // var hello = {data: 'hello'}
  //
})


app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

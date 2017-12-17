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

app.get('/user/:id', (req, res) => {
  knex.select('*').from('users').where('id',req.params.id).then( result => {
    console.log('user on the server:', JSON.stringify(result))
    res.send(JSON.stringify(result));
  })
})

app.get('/deals', (req, res) => {
  knex.select('*').from('deals').then( result => {
    console.log('deals on the server:', JSON.stringify(result))
    res.send(JSON.stringify(result));
  })
})

app.get('/deal/:id', (req, res) => {
  console.log(req.params.id)
  knex.select('*').from('deals').where('id',req.params.id).then( result => {
    console.log('deal on the server:', JSON.stringify(result))
    res.send(JSON.stringify(result));
  })
})

app.get('/providers', (req, res) => {
  knex.select('*').from('providers').then( result => {
    console.log('providers on the server:', JSON.stringify(result))
    res.send(JSON.stringify(result));
  })
})

app.get('/provider/:id', (req, res) => {
  knex.select('*').from('providers').where('id',req.params.id).then( result => {
    console.log('provider on the server:', JSON.stringify(result))
    res.send(JSON.stringify(result));
  })
})


app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

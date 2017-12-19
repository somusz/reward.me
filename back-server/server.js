const express = require('express');
require('dotenv').config();
const ENV            = process.env.ENV || "development";
const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
const knexLogger     = require('knex-logger');
const bodyParser     = require("body-parser");
const cookieSession  = require("cookie-session");


// const getMoreRewardDeals  = require("./provider_crawlers/more_rewards");

// Set the port to 3001
const PORT = process.env.PORT;

// Create a new express server
const app = express();

const routes = require("./routes");

app.use(knexLogger(knex));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession( {
  name: 'session',
  keys: [process.env.SESSION_KEY],
  httpOnly: false
  }));
app.use('/', routes(knex));

// app.use(getMoreRewardDeals(knex))

app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

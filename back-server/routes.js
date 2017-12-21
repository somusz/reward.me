"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});
// const bcrypt = require('bcrypt');
const getMoreRewardsPoints = require('./more_rewards_points.js');


module.exports = (knex) => {

  router.post('/login', (req, res) => {
    console.log('attempting to log in', req.body)
    knex
      .select('password_digest', 'id')
      .from('users')
      .where('email', req.body.email)
      .then( (result) => {
        // if (bcrypt.compareSync(req.body.password, result[0])) {
        if (req.body.password === result[0].password_digest) {

          console.log('Login Successful')

          req.session.user_id = result[0].id
          res.status(200).send('ok');
        }
        else {
          console.log('Login Failed')
          res.status(400).send('not ok');
        }
      })
      .catch( (err) => {
        res.status(403).send('Incorrect credentials')

        console.log(err)
      })
  })

  router.post('/logout', (req, res) => {

    console.log('Logout Successful')
    req.session = null
    res.status(200).send('ok');

  })

  router.post('/register', (req, res) => {
    console.log('attempting to register', req.body)
    knex.insert(req.body)
      .returning('id')
      .into('users')
      .then((result) => {
        console.log('result of knex insert', result)
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err.detail)
        res.status(500).send(err);
      });
  })

  router.get('/users/:id', (req, res) => {
    knex.select('*').from('users').where('id',req.params.id).then( result => {
      // console.log('user on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/deals', (req, res) => {
    console.log('REQ PARAMS',req.url);
    knex.select('*').from('deals').then( result => {
      // console.log('deals on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/deals/:id', (req, res) => {
    console.log(req.params.id)
    knex.select('*').from('deals').where('id',req.params.id).then( result => {
      // console.log('deal on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/providers', (req, res) => {
    knex.select('*').from('providers').then( result => {
      // console.log('providers on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/providers/:id', (req, res) => {
    knex.select('*').from('providers').where('id',req.params.id).then( result => {
      // console.log('provider on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/points', (req, res) => {
    console.log(req.session)
    if (req.session.user_id) {

        knex('users_providers')
          .where({user_id: Number(req.session.user_id)})
          .select()
          .then( result => {
            result.forEach(program => {
              switch(program.provider_id) {
                case 1:
                  let {membership_id} = program;
                  if (membership_id){
                    getMoreRewardsPoints(membership_id, (points) => {
                      res.send(JSON.stringify({'1': 18000, '2': 4210}))
                      // res.send(JSON.stringify([{provider_id: 1, points}]));
                    })
                  } else {
                    res.status(404).send('{"error": "no membership id for user"}')
                  }
                  break;
              }
            })
          })

    } else {
      res.status(400).send('{"error": "bad credentials"}')
    }
  })

  return router;

}

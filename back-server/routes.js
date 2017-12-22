"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');

const getPoints = [];
getPoints[1] = require('./provider_crawlers/more_rewards_points.js');
getPoints[2] = require('./provider_crawlers/scene_points.js');
// const getMoreRewardsPoints = require('./more_rewards_points.js');


module.exports = (knex) => {

  router.post('/login', (req, res) => {
    console.log('attempting to log in', req.body)
    knex
      .select('password_digest', 'id')
      .from('users')
      .where('email', req.body.email)
      .then( (result) => {
        if (bcrypt.compareSync(req.body.password, result[0].password_digest)) {
        // if (req.body.password === result[0].password_digest) {

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

    let newUser = req.body
    newUser.password_digest = bcrypt.hashSync(newUser.password_digest, 10)

    knex.insert(newUser)
      .returning('id')
      .into('users')
      .then((result) => {
        req.session.user_id = result[0]
        res.status(200).send('ok')
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
    console.log('logging session at providers', req.session.user_id)
    knex
      .select('providers.*', 'user_related_providers.user_id')
      .from('providers')
      .leftOuterJoin(function() {
        this
          .select('provider_id', 'user_id')
          .from('users_providers')
          .where('user_id', req.session.user_id || 0)
          .as('user_related_providers')
      },'user_related_providers.provider_id','providers.id')
      .then( result => {
        console.log('providers on the server:', JSON.stringify(result))
        res.send(JSON.stringify(result));
      })
  })


  router.get('/providers/:id', (req, res) => {
    knex
      .select('*').from('providers').where('id',req.params.id).then( result => {
      // console.log('provider on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/points', (req, res) => {
    console.log("Received a get request to /points", req.session)
    if (req.session.user_id) {

        //FOR DEBUGGING ONLY:
        res.send(JSON.stringify({'1': 18000, '2': 42100}))
        return;


        knex('users_providers')
          .where({user_id: Number(req.session.user_id)})
          .select()
          .then( result => {

            Promise.all(result.map(program => getPoints[program.provider_id](program)))
              .then(pointsArray => {
                res.send(Object.assign({}, ...pointsArray))
              })
              .catch(err => {
                //FOR DEBUGGING ONLY:
                res.send(JSON.stringify({'1': 12345, '2': 54321}))
              })

          })

    } else {
      console.log('no user - sending points {}')
      res.status(201).send('{}')
    }
  })

  //return only results comtaining the search term:
  //SELECT * FROM deals WHERE description ~ 'query'

  //return only results 40-59:
  //SELECT * FROM deals LIMIT 20 OFFSET 40


  return router;

}

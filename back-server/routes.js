"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');

const getPoints = [];
getPoints[1] = require('./provider_crawlers/more_rewards_points.js');
getPoints[2] = require('./provider_crawlers/scene_points.js');
// const getMoreRewardsPoints = require('./more_rewards_points.js');


module.exports = (knex) => {

  router.get('/', (req, res) => {
    res.send('The index route works')
  })

  router.post('/login', (req, res) => {
    console.log('attempting to log in', req.body)
    knex
    .select('password_digest', 'id')
    .from('users')
    .where('email', req.body.email)
    .then((result) => {
      if (bcrypt.compareSync(req.body.password, result[0].password_digest)) {

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
      res.send(JSON.stringify(result));
    })
  })

  router.post('/users/settings', (req, res) => {
    if(req.body.type === 'email') {
      knex
      .select('user')
      .from('users')
      .where('id', '=', req.session.user_id)
      .update({
        email: req.body.email
      })
      .returning('*')
      .then( result => {
        console.log('this is after the db has been updated', result)
      // res.send(JSON.stringify(result));
    })
      .catch( (err) => {
        res.status(403)
        console.log(err)
      })
    } else if (req.body.type === 'password') {

      knex
      .select('user')
      .from('users')
      .where('id', '=', '1')
      .update({
        password_digest: 'working'
      })

      knex
      .select('password_digest')
      .from('users')
      .where('id', '=', req.session.user_id)
      .then( result => {
        if (bcrypt.compareSync(req.body.oldPassword, result[0].password_digest)) {
          knex
          .select('user')
          .from('users')
          .where('id', '=', req.session.user_id)
          .update({
            password_digest: bcrypt.hashSync(req.body.password_digest, 10)
          })
          .returning('*')
          .then( result => {
            console.log('this is after the db has been updated', result)
            res.send(JSON.stringify({successfull: [true]}));
          })
        }
        else {
          console.log('change not successful')
          knex
          .select('user')
          .from('users')
          .where('id', '=', req.session.user_id)
          .update({
            password_digest: bcrypt.hashSync(req.body.password_digest, 10)
          })
          .returning('*')
          .then( result => {
            console.log('this is after the db has been updated', result)
            res.send(JSON.stringify({successfull: [true]}));
          })
          res.send(JSON.stringify({successfull: [false]}));
          res.status(401)
        }
      })
      .catch( (err) => {
        res.status(403)
        console.log(err)
      })
    }
  })

  router.get('/deals', (req, res) => {

    let limit = Number(req.query.limit) || 50
    let offset = Number(req.query.offset) || 0
    let searchArray = req.query.q ? req.query.q.split(' ') : []
    // let redeemable = Boolean(req.query.redeemable)
    let provider = Number(req.query.provider) ? [Number(req.query.provider)] : [1,2]

    let searchCriteriaCompiler = function () {
      if (searchArray.length > 0) {
        this.where('description', '~*', `${searchArray[0]}`)
        for(let i = 1; i < searchArray.length; i++){
          this.andWhere('description', '~*', `${searchArray[i]}`)
        }
      }
    }

    knex
    .select('deals.*','providers.name as provider_name', 'providers.image as provider_image')
    .from('deals')
    .join('providers', 'deals.provider_id', 'providers.id')
    .whereIn('provider_id', provider)
    .andWhere(searchCriteriaCompiler)
    .limit(limit)
    .offset(offset)
    .then( result => {
      console.log('deals on the server:', JSON.stringify(result))
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

  router.post('/providers/new', (req, res) => {
    req.body.user_id = req.session.user_id

    knex('users_providers')
    .insert(req.body)
    .then(result => {
      console.log('result after insert at new user-provider', result)
      res.send('You have successfully linked the reward program to your account');
    })
    .catch((err) => {
      console.log(err.detail)
      res.status(500).send(err);
    });
  })

  router.put('/providers/:id', (req, res) => {
    console.log('logging request at providers update', req.body)

    knex('users_providers')
    .where('user_id', req.session.user_id)
    .andWhere('provider_id', req.params.id)
    .update(req.body)
    .then(result => {
      res.send('You have successfully updated your credentials');
    })
    .catch((err) => {
      console.log(err.detail)
      res.status(500).send(err);
    });
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

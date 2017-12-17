"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');


module.exports = (knex) => {

  router.post('/login', (req, res) => {
    console.log('attempting to log in', req.body)
    res.redirect('/')
    // knex
    //   .select('password_digest')
    //   .from('users')
    //   .where('email', req.body.email)
    //   .then( (result) => {
    //     if (bcrypt.compareSync(req.body.password, result)) {
    //       console.log('Login Successful')
    //       res.redirect('/');
    //     }
    //     else {
    //       console.log('Login Failed')
    //       res.redirect('/register')
    //     }
    //   })
    //   .catch( (err) => {
    //     res.status(403).send('Incorrect credentials')
    //   })
  })

  router.get('/user/:id', (req, res) => {
    knex.select('*').from('users').where('id',req.params.id).then( result => {
      console.log('user on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/deals', (req, res) => {
    knex.select('*').from('deals').then( result => {
      console.log('deals on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/deal/:id', (req, res) => {
    console.log(req.params.id)
    knex.select('*').from('deals').where('id',req.params.id).then( result => {
      console.log('deal on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/providers', (req, res) => {
    knex.select('*').from('providers').then( result => {
      console.log('providers on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  router.get('/provider/:id', (req, res) => {
    knex.select('*').from('providers').where('id',req.params.id).then( result => {
      console.log('provider on the server:', JSON.stringify(result))
      res.send(JSON.stringify(result));
    })
  })

  return router;

}

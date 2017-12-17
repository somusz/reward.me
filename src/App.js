import React from 'react'
import {Component} from 'react'
import Deals from './Deals.js'
import Login from './Login.js'
import Nav from './Nav.js'
import NewProvider from './NewProvider.js'
import Providers from './Providers.js'
import Register from './Register.js'
import ShowDeal from './ShowDeal.js'
import ShowProvider from './ShowProvider.js'
import ShowUser from './ShowUser.js'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const RouteHandler = () => (
  <Router>
    <div>
      <Nav />

      <Route exact path="/" component={Home}/>
      <Route exact path="/providers" component={Providers}/>
      <Route path="/providers/new" component={NewProvider}/>
      <Route path="/provider/:id" component={ShowProvider}/>
      <Route path="/deals" component={Deals}/>
      <Route path="/deal/:id" component={ShowDeal}/>
      <Route path="/register" component={Register}/>
      <Route path="/user/:id" component={ShowUser}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
)
export default RouteHandler

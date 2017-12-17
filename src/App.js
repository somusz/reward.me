import React from 'react'
import {Component} from 'react'
import Deals from './Deals.js'
import Login from './Login.js'
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



const exampleIDs = {
  user: 2,
  deal: 2,
  provider: 2
}

const RouteHandler = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/providers">Providers List</Link></li>
        <li><Link to="/providers/new">Add new connection</Link></li>
        <li><Link to={`/provider/${exampleIDs.provider}`}>Provider View (the link is hardcoded to provider #2)</Link></li>
        <li><Link to="/deals">All Deals</Link></li>
        <li><Link to={`/deal/${exampleIDs.deal}`}>Deal View (the link is hardcoded to deal #2)</Link></li>
        <li><Link to="/register">Registration</Link></li>
        <li><Link to={`/user/${exampleIDs.user}`}>User account (the link is hardcoded to user #2)</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <hr/>

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

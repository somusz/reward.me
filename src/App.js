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
import $ from 'jquery'


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
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

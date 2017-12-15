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

class Test extends Component{
  state = { data: '' }

  componentDidMount() {
    fetch("api/")
      .then(res => res.json())
      .then(result => this.setState({ data: result.first_name }))
  }
  render(){
    return (
      <p>{this.state.data}</p>
    )
  }
}

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

    <Test />

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
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
export default BasicExample

import React from 'react'
import Deals from './Deals.js'
import Login from './Login.js'
import Nav from './Nav.js'
import ProviderSection from './ProviderSection.js'
import Register from './Register.js'
import ShowDeal from './ShowDeal.js'
import ShowUser from './ShowUser.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/border-box.css'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {points: 0}
  }

  setPoints = () => {
    this.setState({points: 7})
  }

  setSession = () => {
    if ((document.cookie).match(/session=/)) {
      this.setState({session: true})
    } else {
      this.setState({session: false})
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav points={this.state.points} setSession={this.setSession} session={this.state.session} />

          <Route exact path="/" component={Home}/>
          <Route path="/providers" component={ProviderSection}/>
          <Route path="/deals" component={Deals}/>
          <Route path="/deal/:id" component={ShowDeal}/>
          <Route path="/register" component={Register}/>
          <Route path="/user/:id" component={ShowUser}/>
          <Route path="/login" render={(props) => <Login {...props} setPoints={this.setPoints} setSession={this.setSession} points={this.state.points} /> }/>
        </div>
      </Router>

    )
  }
}

export default App

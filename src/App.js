import React from 'react';
import DealsSection from './DealsSection.js';
import Login from './Login.js';
import Nav from './Nav.js';
import ProviderSection from './ProviderSection.js';
import Register from './Register.js';
import ShowUser from './ShowUser.js';
import Home from './Home.js';
import Footer from './Footer.js'



import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/border-box.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: {}
    }
  }

  componentDidMount() {
    console.log("APP DID MOUNT")
    this.setPoints()
    this.setSession()
  }

  setPoints = () => {
    console.log('about to fetch points')
    fetch('/points', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log('got points: res', res)
      return res.json()
      .then((jsonData) => {
        console.log("GOT POINTS FROM SERVER", jsonData)
        this.setState({ points: jsonData })
      })
    })
    .catch((err) => {
      console.log('error:', err)
    })
  }

  setSession = () => {
    if ((document.cookie).match(/session=/)) {
      this.setState({session: true})
    } else {
      this.setState({session: false})
    }
  }

  render() {
    console.log("App Render", this.state)
    return ([
      <Nav points={this.state.points} setSession={this.setSession} session={this.state.session} />,
      <Router>
      <div>
      <Route exact path="/" component={ Home } />
      <Route path="/providers" render={(props) => <ProviderSection {...props} points={this.state.points} session={this.state.session}/> } />
      <Route path="/deals" render={(props) => <DealsSection {...props} points={this.state.points} /> } />
      <Route path="/register" render={(props) => <Register {...props} setSession={this.setSession} /> }/>
      <Route path="/users/settings" component={ShowUser}/>
      <Route path="/login" render={(props) => <Login {...props} setPoints={this.setPoints} setSession={this.setSession} /> }/>
      </div>
      </Router>,
      <Footer />

      ])
  }
}

export default App

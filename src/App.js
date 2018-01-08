import React from 'react';
import DealsSection from './DealsSection.js';
import Login from './Login.js';
import Nav from './Nav.js';
import ProviderSection from './ProviderSection.js';
import Register from './Register.js';
import ShowUser from './ShowUser.js';
import Home from './Home.js';
import Footer from './Footer.js'
import PopUp from './PopUp.js'


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/border-box.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: {},
      cookie: '',
      message: '',
      popUpVisibility: 'hidden',
      popUpOpacity: '0',
      userEmail: ''
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

  saveUserEmail = (email) => {
    console.log('in save user email function')
    this.setState({
      userEmail: email
    })
  }

  showPopUp = (message) => {
    this.setState({
      message: message,
      popUpVisibility: 'visible',
      popUpOpacity: '1',
    })

    setTimeout(() => {
      this.setState({
      message: message,
      popUpVisibility: 'hidden',
      popUpOpacity: '0',
      })}, 1500)
  }

  setSession = () => {
    if ((document.cookie).match(/session=/)) {
      this.setState({session: true, cookie: document.cookie})
    } else {
      this.setState({session: false})
    }
  }

  render() {
    return ([
      <Nav points={this.state.points} setSession={this.setSession} session={this.state.session} />,
      <PopUp message={this.state.message} visibility={this.state.popUpVisibility} opacity={this.state.popUpOpacity} />,
      <Router>
      <div>
      <Route exact path="/" component={ Home } />
      <Route path="/providers" render={(props) => <ProviderSection {...props} points={this.state.points} session={this.state.session} showPopUp={this.showPopUp} /> } />
      <Route path="/deals" render={(props) => <DealsSection {...props} points={this.state.points} showPopUp={this.showPopUp} /> } />
      <Route path="/users/settings" render={(props) => <ShowUser {...props} userID={this.state.points} showPopUp={this.showPopUp}/> }/>
      <Route path="/register" render={(props) => <Register {...props} session={this.state.session} setSession={this.setSession} showPopUp={this.showPopUp}/> }/>
      <Route path="/login" render={(props) => <Login {...props} session={this.state.session} setPoints={this.setPoints} setSession={this.setSession} showPopUp={this.showPopUp} saveUserEmail={this.saveUserEmail} /> }/>
      </div>
      </Router>,
      <Footer />

      ])
  }
}

export default App

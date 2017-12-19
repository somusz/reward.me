import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/nav.css';

const exampleIDs = {
  user: 2,
  deal: 2,
  provider: 2
}

class Nav extends Component{
  constructor(props) {
    super(props);

    this.state = {}

    this._logoutProcess = this._logoutProcess.bind(this)
  }

  componentDidMount () {

  }

  _logoutProcess(event){
    if (event) {
      fetch('/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
      })
      .then((res) => {
        window.location.href='/'
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){
    const session = (document.cookie).match(/session=/)
    return (
      <div>
      <nav className="Top-Navbar">
        <ul>
          <li className="Navbar-Left"><Link to="/">Home</Link></li>
          <li className="Navbar-Left"><Link to="/providers">Providers </Link></li>
          <li className="Navbar-Left"><Link to="/deals">Deals</Link></li>
          {session &&
            <li className="Navbar-Right"><Link to="/" onClick={this._logoutProcess}>Logout</Link></li>
          }
          {!session &&
            <li className="Navbar-Right"><Link to="/login">Login</Link></li>
          }
          {!session &&
            <li className="Navbar-Right"><Link to="/register">Register</Link></li>
          }
        </ul>
      </nav>

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
      </div>
    )
  }
}

export default Nav;

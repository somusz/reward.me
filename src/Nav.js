import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

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
        this.props.setSession()
        window.location.href='/deals'
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){
    let pointsArray = this.props.points.map(({provider_id, points}) =>
      <li className="Navbar-Left">{points}</li>
    )

    return (
      <nav className="Top-Navbar">
        <ul>
          <li className="Navbar-Left"><Link to="/">Home</Link></li>
          <li className="Navbar-Left"><Link to="/providers">Providers </Link></li>
          <li className="Navbar-Left"><Link to="/deals">Deals</Link></li>

          {pointsArray}

          {(this.props.session) &&
            <li className="Navbar-Right"><Link to="/" onClick={this._logoutProcess}>Logout</Link></li>
          }
          {(!this.props.session) &&
            <li className="Navbar-Right"><Link to="/login">Login</Link></li>
          }
          {(!this.props.session) &&
            <li className="Navbar-Right"><Link to="/register">Register</Link></li>
          }
        </ul>
      </nav>
    )
  }
}

export default Nav;

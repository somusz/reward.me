import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/nav.css';

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

    return (

    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">Reward.Me</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="/providers" className="nav-link">Providers</a>
          </li>
          <li className="nav-item">
            <a href="/deals" className="nav-link">Deals</a>
          </li>
          <li className="nav-item">
            <a href="users/settings" className="nav-link">Settings</a>
          </li>
          </ul>
        </div>
      </div>
    </nav>

      
    )
  }
}

export default Nav;

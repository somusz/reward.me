import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";

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
      <div className="container" style={{height: '100%'}}>
        <a className="navbar-brand" id='navbar-title' href="/">Reward.Me</a>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="/providers" className="nav-link">Providers</a>
          </li>
          <li className="nav-item">
            <a href="/deals" className="nav-link">Deals</a>
          </li>

          {(this.props.session) &&
            <li className="nav-item"><a href="users/settings" className="nav-link">Settings</a></li>
          }
          {(this.props.session) &&
            <li className="nav-item"><a href="/" className="nav-link" onClick={this._logoutProcess}>Logout</a></li>
          }
          {(!this.props.session) &&
            <li className="nav-item"><a href="/login" className="nav-link" >Login</a></li>
          }
          {(!this.props.session) &&
            <li className="nav-item"><a href="/register" className="nav-link" >Register</a></li>
          }
          </ul>
        </div>

        <div name='alt-nav-bar' id='alt-nav-bar' className='alt-nav-bar' >
          <ul>
          <li className='alt-nav-item' >
            <a href="/providers" style={{paddingLeft: '20px !important' }} >Providers</a>
          </li>
          <li className='alt-nav-item' >
            <a href="/deals"  style={{paddingLeft: '20px !important' }}>Deals</a>
          </li>

          {(this.props.session) &&
            <li className='alt-nav-item' ><a href="users/settings" style={{paddingLeft: '20px !important' }} >Settings</a></li>
          }
          {(this.props.session) &&
            <li className='alt-nav-item' ><a href="/"  onClick={this._logoutProcess} style={{paddingLeft: '20px !important' }} >Logout</a></li>
          }
          {(!this.props.session) &&
            <li className='alt-nav-item' ><a href="/login" style={{paddingLeft: '20px !important' }} >Login</a></li>
          }
          {(!this.props.session) &&
            <li className='alt-nav-item' ><a href="/register" style={{paddingLeft: '20px !important' }}  >Register</a></li>
          }

          </ul>
        </div>
      </div>
    </nav>


    )
  }
}

export default Nav;

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";


class Nav extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }

    this._logoutProcess = this._logoutProcess.bind(this)
  }

  componentDidMount() {
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
      <div>Watchlist page yo </div>
      )
  }
}

export default Nav;

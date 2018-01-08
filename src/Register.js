import React, {Component} from 'react';
import $ from 'jquery';

import './styles/Login.css';

class Registration extends Component{

  handleRegisterSubmit = (event) => {
    event.preventDefault()

    if (event) {
      fetch('/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: event.target.email.value,
          password_digest: event.target.password.value
        })
      })
      .then((res) => {
        this.props.setSession()
        this.props.history.goBack()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){
    return (
      <div className='register'>
        <h2>Registration Page</h2>

        <form className='register-form' onSubmit={this.handleRegisterSubmit}>

          <label>First Name: </label><input id="first_name" type="text" name="first_name" />
          <label>Last Name: </label><input id="last_name" type="text" name="last_name" />
          <label>Email: </label><input id="email" type="email" name="email" />
          <label>Password: </label><input id="password" type="password" name="password"  />

          <input type="submit" value="Register" />
        </form>

      </div>

    )
  }
}

export default Registration;

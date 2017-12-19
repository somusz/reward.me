import React, {Component} from 'react';
import $ from 'jquery';

import './styles/Login.css';


class Login extends Component{
  state = { data: '' }

  handleLoginSubmit = (event) => {
    event.preventDefault()

    if (event) {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          email: event.target.email.value,
          password: event.target.password.value
        }
      }).done((res) => {
        console.log(res)
      }).fail((err) => {
        console.log(err)
      })
    }
  }

  componentDidMount() {

  }

  render(){
    return (
      <div className='login'>
        <h2>Login Page</h2>

        <form className='login-form' onSubmit={this.handleLoginSubmit}>

          <span>Email: </span><input id="email" type="email" name="email" placeholder="Your email address" />
          <span>Password: </span><input id="password" type="password" name="password" placeholder="Your password" />

          <input type="submit" value="Login" />
        </form>

      </div>
    );
  }
}

export default Login;

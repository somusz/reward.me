import React, {Component} from 'react';
import $ from 'jquery';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()

    if (event) {
      fetch('/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value
        })
      })
      .then((res) => {
        this.props.history.goBack()
      })
      .catch((err) => {
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

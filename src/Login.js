import React, {Component} from 'react';
import $ from 'jquery';
// import bcrypt from 'bcrypt';

class Login extends Component{
  state = { data: '' }

  handleSubmit = (event) => {
    event.preventDefault()


    if (event) {
      // var hashedPassword = bcrypt.hashSync(event.target.password.value, 10)
      $.ajax({
        url: '/login',
        method: 'POST',
        dataType: 'json',
        data: {
          email: event.target.email.value,
          password: '123'//hashedPassword
        }
      })
    }
  }

  componentDidMount() {

  }

  render(){
    return (
      <div className='login'>
        <h2>Login Page</h2>

        <form className='login-form' onSubmit={this.handleSubmit}>

          <span>Email: </span><input id="email" type="email" name="email" placeholder="Your email address" />
          <span>Password: </span><input id="password" type="password" name="password" placeholder="Your password" />

          <input type="submit" value="Login" />
        </form>

        <p>this is the login page, no data</p>
      </div>



    );
  }
}

export default Login;

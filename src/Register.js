import React, {Component} from 'react';
import $ from 'jquery';

class Registration extends Component{
  state = { data: '' }

  handleRegisterSubmit = (event) => {
    event.preventDefault()

    if (event) {
      $.ajax({
        url: '/register',
        method: 'POST',
        data: {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: event.target.email.value,
          image: event.target.image_url.value,
          password_digest: event.target.password.value
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
      <div className='register'>
        <h2>Registration Page</h2>

        <form className='register-form' onSubmit={this.handleRegisterSubmit}>

          <span>First Name: </span><input id="first_name" type="text" name="first_name" placeholder="Your First Name" />
          <span>Last Name: </span><input id="last_name" type="text" name="last_name" placeholder="Your Last Name" />
          <span>Email: </span><input id="email" type="email" name="email" placeholder="Your Email Address" />
          <span>Image URL: </span><input id="image_url" type="text" name="image_url" placeholder="Link To Your Avatar Image" />
          <span>Password: </span><input id="password" type="password" name="password" placeholder="Your password" />

          <input type="submit" value="Register" />
        </form>

      </div>

    )
  }
}

export default Registration;

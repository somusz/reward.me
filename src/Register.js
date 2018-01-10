import React, {Component} from 'react';
import $ from 'jquery';

import './styles/ShowUsers.css'


class Registration extends Component{
  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.session) {
      this.props.history.go(-2)
    }
  }

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
        this.props.history.push('/deals')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render(){
    return (
      <div class="container settings_page" style={{height: '100%', paddingBottom: '550px', paddingTop: '100px'}} >
      <div class="row">
         <div class="col-md-7 settings_form">
            <h3 class="text-center" style={{margin: '20px'}}>Please enter your details</h3>

            <form id='settingsForm' onSubmit={this.handleRegisterSubmit}>

              <div className="form-group">
              <label for="firstName" >First Name: </label>
                <input type="text" id="first_name" className="form-control" name="firstName" placeholder=" Your First Name..." />
              </div>

              <div className="form-group">
              <label for="lastName" >Last Name: </label>
                <input type="text" id="last_name" className="form-control" name="lastName" placeholder=" Your Last Name..." />
              </div>

              <div className="form-group">

              <label for="email" >Email: </label>
                <input className="form-control" id="email" type="email" name="email" placeholder="Your Email Address"/>
              </div>

              <div className="form-group" id="settingsInstructions" style={{position: 'relative'}} >
                <label for ="description">Password: </label>
                <input className="form-control" id="password" type="password" name="password" placeholder="Your password" />
              </div>
              <div clasName='submit form'>
                <button className="btn btn-default submit form" type="submit" style={{cursor: 'pointer', position: 'static', width: '100%', margin: '20px auto 30px auto;'}}>
                  Register
                </button>
              </div>
            </form>
       </div>
    </div>
  </div>

    )
  }
}

export default Registration;

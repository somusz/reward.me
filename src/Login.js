import React, {Component} from 'react';

import './styles/Login.css';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.session) {
      this.props.history.go(-2)
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
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value
        })
      })
      .then((res) => {
        console.log('logged in, about to call setPoints')
        this.props.setPoints()
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
    <div class="container settings_page" id='loginContainer'  style={{height: '100%', paddingBottom: '400px'}}>
      <div class="row">
         <div class="col-md-7 settings_form">
            <h3 class="text-center" style={{margin: '20px'}}>Please enter your details</h3>

            <form id='settingsForm' onSubmit={this.handleLoginSubmit} >

              <div className="form-group" id="settingsPhoneNumber">
              <label for="email" >Email: </label>
                <input className="form-control" id="email" type="email" name="email" placeholder="Your Email Address"/>
              </div>

              <div className="form-group" id="settingsInstructions" style={{position: 'relative'}} >
                <label for ="description">Password: </label>
                <input className="form-control" id="password" type="password" name="password" placeholder="Your password" />
              </div>
              <div clasName='submit form'>
                <button className="btn btn-default submit form" type="submit" style={{cursor: 'pointer', position: 'static', width: '100%', margin: '20px auto 30px auto;'}}>
                  Login
                </button>
              </div>
            </form>
         </div>
      </div>
    </div>
    );
  }
}

export default Login;

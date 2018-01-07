import React, {Component} from 'react';
import './styles/ShowUsers.css'

class ShowUser extends Component{

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      oldPassword: '',
      newPassword: '',
      retypedNewPassword: ''
    }

  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
    this.props.showErrorPopUp('da boombazzle')
  }

  changeEmail = (event) => {
    event.preventDefault()

    fetch('/users/settings', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email,
        password_digest: this.state.newPassword,
        type: 'email'
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    })
    .then((res) => {
      window.location.href='/users/settings'
    })
    .catch((err) => {
      console.log(err)
    })
  }

  passwordsMatch = () => {
    let state = this.state
    if( state.retypedNewPassword === state.newPassword) {
      return true
    } else if (!state.newPassword) {
      console.log('Please enter a new password')
    } else if (!state.retypedNewPassword) {
      console.log('Please retype the new password')
    } else {
      console.log('The retyped password does not match the new password. Try again')
    }
    return false
  }

  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value})
  }

  handleRetypedNewPasswordChange = (event) => {
    this.setState({ retypedNewPassword: event.target.value})
  }
  handleOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value})
  }
  changePassword = (event) => {
    event.preventDefault()
    if(this.passwordsMatch()) {
      fetch('/users/settings', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          password_digest: this.state.newPassword,
          type: 'password',
          oldPassword: this.state.oldPassword
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow'
      })
      .then((res) => {
        this.setState({ 
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''})
        window.location.href='/users/settings'
      })
      .catch((err) => {
        console.log(err)
      })
    } 
  }  
  render(){

    return ([
      <div className='col-md-8' >Hello UserName</div>,
      <div class="container settings_page">
      <div class="row">
         <div class="col-md-6 settings_form">
            <h3 class="text-center">Please enter your details</h3>

            <form id='settingsForm' >
              <div className="form-group" id="settingsName">
                <label for="email">Email</label>
                <input type="email" className="form-control" name="email" placeholder=" Enter Email" onChange={this.handleEmailChange} />
              </div>
              <div className="btn btn-default submit form" onClick={this.changeEmail} style={{cursor: 'pointer', display: 'block'}}>
                Change Email
              </div>

              <div className="form-group" id="settingsPhoneNumber">
                <label for="old-password">Old Password</label>
                <input type="password" className="form-control" onChange={this.handleOldPasswordChange} name="oldPassword" placeholder=" Enter old password" />
              </div>
              <div className="form-group" id="settingsInstructions">
                <label for ="description">New Password</label>
                <input type="password" className="form-control" name="newPassword" onChange={this.handleNewPasswordChange} placeholder=" Enter new password" />
              </div>
              <div className="form-group" id="settingsInstructions">
                <label for ="description">Reconfirm New Password</label>
                <input type="password" className="form-control" name="newPassword" onChange={this.handleRetypedNewPasswordChange} placeholder=" Enter password" />
              </div>
              <div className="btn btn-default submit form" onClick={this.changePassword} style={{cursor: 'pointer', display: 'block'}}>
                Change Password
              </div>
            </form>
       </div>

    </div>
  </div>
      ])
    }
  }

  export default ShowUser;

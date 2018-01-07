import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Deal from './Deal.js'

class NewProvider extends Component{
  constructor (props) {
    super(props)
    this.state = {
      updateMessage: '',
      deals: []
    }
    this.clearMessage = this.clearMessage.bind(this)
  }

  handleLinkAccountSubmit = (event) => {
    event.preventDefault()

    if (event) {
      fetch(this.props.match.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
          provider_id: this.props.location.state.provider,
          username: event.target.username.value ? event.target.username.value : undefined,
          membership_id: event.target.membershipid.value ? event.target.membershipid.value : undefined,
          membership_email: event.target.email.value ? event.target.email.value : undefined,
          password_digest: event.target.password.value ? event.target.password.value : undefined
        })
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            updateMessage: 'success'
          }, this.clearFields)
        }
      })
      .catch((err) => {
        // this.setState({
        //   updateMessage: 'error'
        // })
        console.log(err)
      })
    }
  }

  evaluateLinkAccountSubmit = (result, name) => {
    if (result === 'success') {
      return (
        <div className='provider-user-credentials-link-success'>
          You have successfully linked {name} to your account
        </div>
      )
    }

    else {
      return (
        <div className='provider-user-credentials-link-error'>
          Something went wrong
        </div>
      )
    }
  }

  clearFields() {
    this.refs.username.value = ''
    this.refs.membershipid.value = ''
    this.refs.email.value = ''
    this.refs.password.value = ''
  }

  clearMessage() {
    this.setState({ updateMessage: '' })
  }

  render(){

    const currentProvider = this.props.data.find(item =>
      Number(item.id) === Number(this.props.location.state.provider))

    const submitButtonValue = currentProvider? `Link ${currentProvider.name} to my account` : "Link it to your account"

    return currentProvider ? (
      <div>

        <h2>{currentProvider.name}</h2>
        <div className="provider-image-container">
          <img src={currentProvider.image} alt={currentProvider.name} />
        </div>

        <div id='provider-user-credentials' style={{display: this.props.session ? 'block' : 'none'}} >
          <h3 >Update my credentials at {currentProvider.name}</h3>
          <form className='provider-user-credentials-update-form' onSubmit={this.handleLinkAccountSubmit}>

            <label>Enter your credentials at {currentProvider.name}</label><br/>

            <div id="provider-user-credentials-link-username" style={{display: currentProvider.membership_username_required ? 'block' : 'none'}} >
              <label>Your Username at {currentProvider.name}: </label>
              <input
                 type="text"
                 ref="username"
                 name="username"
                 placeholder={currentProvider.membership_username_label}
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-membershipid" style={{display: currentProvider.membership_id_required ? 'block' : 'none'}} >
              <label>Your {currentProvider.membership_id_label}: </label>
              <input
                 type="text"
                 ref="membershipid"
                 name="membershipid"
                 placeholder={currentProvider.membership_id_label}
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-email" style={{display: currentProvider.membership_email_required ? 'block' : 'none'}} >
              <label>Your Email Address at {currentProvider.name}: </label>
              <input
                 type="email"
                 ref="email"
                 name="email"
                 placeholder="Email"
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-password">
              <label>Your Password at {currentProvider.name}: </label>
              <input
                 type="password"
                 ref="password"
                 name="password"
                 placeholder="Your password"
                 onFocus={this.clearMessage} />
            </div>
            <input type="submit" value={submitButtonValue} />
          </form>

          {this.state.updateMessage &&
            this.evaluateLinkAccountSubmit(this.state.updateMessage, currentProvider.name)
          }

        </div>

      </div>
    ) : <div />
  }
}

export default NewProvider;

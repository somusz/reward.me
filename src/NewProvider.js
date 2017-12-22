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

  handleUpdateSubmit = (event) => {
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

  evaluateUpdateSubmit = (result) => {
    if (result === 'success') {
      return (
        <div className='provider-user-credentials-update-success'>
          You have successfully updated your credentials
        </div>
      )
    }

    else {
      return (
        <div className='provider-user-credentials-update-error'>
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
      Number(item.id) === Number(this.props.match.params.id));

    return currentProvider ? (
      <div>

        <h2>{currentProvider.name}</h2>
        <div className="provider-image-container">
          <img src={currentProvider.image} alt={currentProvider.name} />
        </div>

        <div id='provider-user-credentials' style={{display: this.props.session ? 'block' : 'none'}} >
          <h3>Update my credentials at {currentProvider.name}</h3>
          <form className='provider-user-credentials-update-form' onSubmit={this.handleUpdateSubmit}>

            <label>Fill in the fields that you would like to change and click submit</label><br/>
            <span>Username: </span><input id="provider-user-credentials-update-username" type="text" ref="username" name="username" placeholder="Your new username" onFocus={this.clearMessage} />
            <span>Membership ID: </span><input id="provider-user-credentials-update-membershipid" type="text" ref="membershipid" name="membershipid" placeholder="Your new membership ID" onFocus={this.clearMessage} />
            <span>Email: </span><input id="provider-user-credentials-update-email" type="email" ref="email" name="email" placeholder="Your new email" onFocus={this.clearMessage} />
            <span>Password: </span><input id="provider-user-credentials-update-password" type="password" ref="password" name="password" placeholder="Your new password" onFocus={this.clearMessage} />

            <input type="submit" value="Update" />
          </form>

          {this.state.updateMessage &&
            this.evaluateUpdateSubmit(this.state.updateMessage)
          }

        </div>

      </div>
    ) : <div />
  }
}

export default NewProvider;

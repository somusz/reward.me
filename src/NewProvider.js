import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Deal from './Deal.js'
import $ from "jquery";
import './styles/NewProvider.css'


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
      console.log(event.target)
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
          username: event.target.username ? event.target.username.value : undefined,
          membership_id: event.target.membershipid ? event.target.membershipid.value : undefined,
          membership_email: event.target.email ? event.target.email.value : undefined,
          password_digest: event.target.password ? event.target.password.value : undefined
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
          this.props.showPopUp('You have successfully linked {name} to your account')
    }

    else {
          this.props.showPopUp('Something went wrong')
    }
  }

  clearFields() {
    this.refs = null; 
  }

  clearMessage() {
    this.setState({ updateMessage: '' })
  }

  render(){

    const currentProvider = this.props.data.find(item =>
      Number(item.id) === Number(this.props.location.state.provider))

    const submitButtonValue = currentProvider? `Link ${currentProvider.name} to my account` : "Link it to your account"

    return currentProvider ? ([
       

      <div className='container' id='link-provider-container' style={{height: '100%', paddingBottom: '50px', marginTop: '50px', display: this.props.session ? 'block' : 'none'}}>
        <div>
          <img className="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={currentProvider.image} alt={currentProvider.name} />
        </div>
      <div class="container settings_page" >
      <div class="row">
         <div class="col-md-7 settings_form">
            <h3 style={{margin: '20px auto'}} className='text-center' >Update my credentials at {currentProvider.name}</h3>
            <form id='newProviderForm' onSubmit={this.handleLinkAccountSubmit} >
              <label className='text-center' >Enter your credentials at {currentProvider.name}</label>

            <div id="provider-user-credentials-link-username" style={{display: currentProvider.membership_username_required ? 'block' : 'none'}} className="form-group" >
              <label>Your Username at {currentProvider.name}: </label>
              <input
                 type="text"
                 ref="username"
                 name="username"
                 className="form-control"
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-membershipid" style={{display: currentProvider.membership_id_required ? 'block' : 'none'}} className="form-group" >
              <label>Your {currentProvider.membership_id_label}: </label>
              <input
                 type="text"
                 ref="membershipid"
                 name="membershipid"
                 className="form-control"
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-email" style={{display: currentProvider.membership_email_required ? 'block' : 'none'}} className="form-group" >
              <label>Your Email Address at {currentProvider.name}: </label>
              <input
                 type="email"
                 ref="email"
                 name="email"
                 className="form-control"
                 onFocus={this.clearMessage} />
            </div>

            <div id="provider-user-credentials-link-password" className="form-group" >
              <label>Your Password at {currentProvider.name}: </label>
              <input
                 type="password"
                 ref="password"
                 name="password"
                 className="form-control"
                 onFocus={this.clearMessage} />
            </div>
              <button className="btn btn-default submit form" type='submit' value={submitButtonValue} style={{cursor: 'pointer', position: 'static', width: '100%', margin: '20px auto 30px auto;'}}>
                Submit
              </button>
        </form>
          {this.state.updateMessage &&
            this.evaluateLinkAccountSubmit(this.state.updateMessage, currentProvider.name)
          }
       </div>

    </div>
  </div>
  </div>
    ]) : <div />
  }
}

export default NewProvider;

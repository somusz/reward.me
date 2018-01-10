import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import $ from "jquery";
import Deal from './Deal.js'

class ShowProvider extends Component{
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
      console.log('debugging --> ', event.target)
      fetch(this.props.match.url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
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

  getPercentage(item, nextProps){
    nextProps = nextProps || this.props;
    let p = nextProps.points[item.provider_id] / item.price || 0;
    // console.log('getPercentage', p, nextProps.points);
    return p > 1 ? 1 : p;
  }

  componentDidMount() {
    fetch(`/deals?provider=${this.props.match.params.id}&limit=3`)

      .then((res) => {
        res.json()
          .then((jsonData) => {
            this.setState({ deals: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }

  render(){

    const currentProvider = this.props.data.find(item =>
      Number(item.id) === Number(this.props.match.params.id));

    return currentProvider ? ([
      <div class="container settings_page" style={{ margin: '30px auto', height: '100%', paddingBottom: '300px'}}>
        <div class="row">
           <div class="col-md-5 settings_form" id='provider-user-credentials' style={{display: this.props.session ? 'block' : 'none'}}>
                <img src={currentProvider.image} alt={currentProvider.name} style={{ height: '10%', margin: '15px auto', display: 'block'}}/>
              <form className='provider-user-credentials-update-form' onSubmit={this.handleUpdateSubmit} id='showProvider'>
                <p className='text-center' style={{marginTop: '10px'}} > Provide your {currentProvider.name} credentials to link your {currentProvider.name} Points to your Reward.me account </p>

                {(currentProvider.membership_username_required) &&

                  <div className="form-group" >
                    <label for="username">{currentProvider.membership_username_label || "Username"}: </label>
                    <input type="text" 
                        id="provider-user-credentials-update-username" 
                        className="form-control" 
                        ref="username" 
                        name="username" 
                        placeholder="Your new username" 
                        onFocus={this.clearMessage} />
                  </div>
                }

                {(currentProvider.membership_id_required) &&

                  <div className="form-group" >
                    <label for='membershipid' >{currentProvider.membership_id_label || "Membership ID"}: </label>
                    <input id="provider-user-credentials-update-membershipid"
                           type="text"
                           ref="membershipid"
                           className="form-control" 
                           name="membershipid"
                           placeholder="Your new membership ID"
                           onFocus={this.clearMessage} />
                  </div>
                }

                {(currentProvider.membership_email_required) &&

                  <div className="form-group" >
                    <label for='email' >{currentProvider.membership_email_label || "Email"}: </label>
                    <input id="provider-user-credentials-update-email"
                           type="email"
                           ref="email"
                           name="email"
                           className="form-control" 
                           placeholder="Your new email"
                           onFocus={this.clearMessage} />
                  </div>
                }

                <div className="form-group" >
                  <label for='password' >{currentProvider.membership_password_label || "Password"}: </label>
                    <input id="provider-user-credentials-update-password"
                           type="password"
                           ref="password"
                           className="form-control" 
                           name="password"
                           placeholder="Your new password"
                           onFocus={this.clearMessage} />
                </div>

                <button className="btn btn-default submit form" type="submit" style={{cursor: 'pointer', position: 'static', width: '100%', margin: '20px auto 30px auto;'}}>
                  Submit
                </button>
      
              </form>
      
            {this.state.updateMessage && this.evaluateUpdateSubmit(this.state.updateMessage)}
         </div>


        <div className="deals-container col-md-7 settings_form">
          <h4 className='text-center' style={{margin: '20px auto'}}>Start redeeming now! Check out these available rewards from {currentProvider.name}: </h4>

          {this.state.deals.map(item => {
            return (<Deal key={item.id} item={item} points={this.props.points} />)
          })}
          <div className="deals-container-linkto-deals">
            <Link to={`/deals?provider=${this.props.match.params.id}`}>
              <div className="btn btn-default submit form" style={{cursor: 'pointer', position: 'static', width: '450px', margin: '20px auto 30px auto;'}} >
                See All Rewards
              </div>
            </Link>
          </div>
        </div>


      </div>
    </div>
    ]) : <div />
  }
}

export default ShowProvider;


 



    


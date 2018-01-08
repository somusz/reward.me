import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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
      fetch(this.props.match.url, {
        method: 'PUT',
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

    return currentProvider ? (
      <div>

        <h2>{currentProvider.name}</h2>
        <div className="provider-image-container">
          <img src={currentProvider.image} alt={currentProvider.name} />
        </div>

        <div id='provider-user-credentials' style={{display: this.props.session ? 'block' : 'none'}} >
          <h3>Update my credentials at {currentProvider.name}</h3>
          <form className='provider-user-credentials-update-form' onSubmit={this.handleUpdateSubmit}>

            <label>Provide your {currentProvider.name} credentials to link your {currentProvider.name} Points to your Reward.me account</label><br/>

            {(currentProvider.membership_username_required) &&

              <label>{currentProvider.membership_username_label || "Username"}:
                <input id="provider-user-credentials-update-username"
                       type="text"
                       ref="username"
                       name="username"
                       onFocus={this.clearMessage} />
              </label>
            }

            {(currentProvider.membership_id_required) &&

              <label>{currentProvider.membership_id_label || "Membership ID"}:
                <input id="provider-user-credentials-update-membershipid"
                       type="text"
                       ref="membershipid"
                       name="membershipid"
                       onFocus={this.clearMessage} />
              </label>
            }

            {(currentProvider.membership_email_required) &&

              <label>{currentProvider.membership_email_label || "Email"}:
                <input id="provider-user-credentials-update-email"
                       type="email"
                       ref="email"
                       name="email"
                       onFocus={this.clearMessage} />
              </label>
            }

              <label>{currentProvider.membership_password_label || "Password"}:
                <input id="provider-user-credentials-update-password"
                       type="password"
                       ref="password"
                       name="password"
                       onFocus={this.clearMessage} />
              </label>

            <input type="submit" value="Update" />
          </form>

          {this.state.updateMessage &&
            this.evaluateUpdateSubmit(this.state.updateMessage)
          }

        </div>

        <div className="deals-container">

          <h3>Check out these deals from {currentProvider.name}!</h3>
          <br/>

          {this.state.deals.map(item => {
            return (<Deal key={item.id} item={item} points={this.props.points} />)
          })}

          <br/>
          <div className="deals-container-linkto-deals">
            <Link to={`/deals?provider=${this.props.match.params.id}`}>
              <button>Click here for more deals from {currentProvider.name}</button>
            </Link>
          </div>
        </div>

      </div>
    ) : <div />
  }
}

export default ShowProvider;

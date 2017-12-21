import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/Providers.css';

class Providers extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  render(){

  const ProviderCompiler = (provider) => (
    <Link to={`${this.props.match.url}/${provider.id}`}>
      <li>
        <div className="provider-image-container">
          <img src={provider.image} alt="N/A" />
        </div>
        <h3>{provider.name}</h3>
      </li>
    </Link>
  )

  const Memberships = () => (
    <div>
      <h2>My Reward Memberships</h2>
      {this.props.data.filter(item => item.user_id).map(item => (

        <div key={item.id}>
          { ProviderCompiler(item) }
          <Link to={`${this.props.match.url}/${item.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  )


  const NonMemberships = () => (
    <div>
      <h2>Other Reward Programs</h2>
      {this.props.data.filter(item => !item.user_id).map(item => (

        <div key={item.id}>
          { ProviderCompiler(item) }
          <Link to={{ pathname: `${this.props.match.url}/new`, state: { provider: item.id }}}>
            <button>Add To My Account</button>
          </Link>
        </div>
      ))}
    </div>
  )

    return (
      <div className="providers">
        <Memberships />
        <NonMemberships />
      </div>
    )
  }
}

export default Providers;

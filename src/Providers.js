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

    const Memberships = () => (

      <div>
        <h2 className='text-center' >My Memberships</h2>
        {(this.props.data.filter(item => item.user_id).length > 0) &&
                  <div>
                    {this.props.data.filter(item => item.user_id).map(item => (
                      ProviderMember(item)
                    ))}
                  </div>
        }
        {(this.props.data.filter(item => item.user_id).length === 0) &&
          <h4>You have not linked any Rewards Programs to your account</h4>
        }
      </div>
    )

    const ProviderMember = (item) => (
      <div class="row" key={item.id}>
        <div class="col-md-4" style={{margin: '30px auto'}}>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <img className="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt={item.name} />
          </Link>
        </div>
        <div className="col-md-4" style={{margin: '30px auto'}} >
          <h3></h3>
          <p className='pointsBalance' >My {item.name} Points: {this.props.points[item.id]}</p>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <button className="btn btn-primary"
            style={{display: 'block', position: 'static', width: '100%',
            margin: '20px auto 30px auto;' }} >Edit</button>
          </Link>
        </div>
      </div>
    )

    const NonMemberships = () => (
      <div>
      { this.props.data.filter(item => !item.user_id).length > 0 &&
        <div>
          <h2 style={{margin: '40px'}} className='text-center' >Other Reward Programs</h2>
              {this.props.data.filter(item => !item.user_id).map(item => (
                ProviderNonMember(item)
              ))}
            </div>
          }
      </div>
    )

    const ProviderNonMember = (item) => (
      <div class="row" key={item.id}>
        <div class="col-md-4" style={{margin: '30px auto'}}>
           <Link to={`${this.props.match.url}/${item.id}`}>
            <img className="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt= { "" } />
           </Link>
        </div>
        <div className="col-md-4" style={{margin: '30px auto'}}>
            <Link to={`${this.props.match.url}/${item.id}`}>
          <h3 className='providerName text-center' style={{margin: '30px auto', fontSize: '30px'}}>{item.name}</h3>
            </Link>
          <Link to={{ pathname: `${this.props.match.url}/new`, state: { provider: item.id }}}>
            <button className="btn btn-primary" style={{display: 'block', position: 'static', width: '100%',
            margin: '20px auto 30px auto;' }} >Link To My Account</button>
          </Link>
        </div>
      </div>
    )

    const AllProviders = () => ([
      <h2 className='text-center' style={{margin: '40px'}} >Our Reward Partners</h2>,
      <div>

        {this.props.data.map(item => (
          ProviderAll(item)
        ))}

      </div>
    ])

    const ProviderAll = (item) => (
      <div className="row" key={item.id}>
        <div className="col-md-4 text-center" >
           <Link to={`${this.props.match.url}/${item.id}`}>
            <img className="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt= { "" } />
           </Link>
        </div>
        <div className="col-md-4 ">
            <Link to={`${this.props.match.url}/${item.id}`}>
          <h3>{item.name}</h3>
            </Link>
          <p classNameName='providerDescription' > { item.description }
          </p>
        </div>
      </div>
    )

    return (
      <div>
        {(this.props.session) &&
          <div>
            <Memberships />
            <NonMemberships />
          </div>
        }
        {(!this.props.session) &&
          <div>
            <AllProviders />
          </div>
        }
      </div>
    )
  }
}

export default Providers;
// Those with a Scotiabank account can link their SCENE membership to their SCENE ScotiaCard and earn reward points faster.
// The SCENE program is growing - check back often for more fun rewards!
// </p>


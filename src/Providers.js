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
                      ProviderRowInTableMember(item)
                    ))}
                  </div>
        }
        {(this.props.data.filter(item => item.user_id).length === 0) &&
          <h4>You have not linked any Reward Programs to your account</h4>
        }
      </div>
    )

    const ProviderRowInTableMember = (item) => (
      <div class="row" key={item.id}>
        <div class="col-md-4" style={{margin: '30px auto'}}>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <img class="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt={item.name} />
          </Link>
        </div>
        <div class="col-md-4" style={{margin: '30px auto'}} >
          <h3></h3>
          <p className='pointsBalance' >My Points: {this.props.points[item.id]}</p>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <button className="btn btn-primary" 
            style={{display: 'block', position: 'static', width: '50%', 
            margin: '20px auto 30px auto;' }} >Edit</button>
          </Link>
        </div>
      </div>
    )




    const NonMemberships = () => (    
      <div>
      { this.props.data.filter(item => !item.user_id).length > 0 &&
        <div>
          <h2 style={{margin: '40px'}} >Reward Program</h2>
            <div>Edit</div>
              {this.props.data.filter(item => !item.user_id).map(item => (
                ProviderRowInTableNonMember(item)
              ))}
            </div>
          }
      </div>
    )

    const ProviderRowInTableNonMember = (item) => (
        <div class="row" key={item.id}>
          <div class="col-md-6 text-center" >
             <Link to={`${this.props.match.url}/${item.id}`}>
              <img class="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt= { "" } />
             </Link>
          </div>
          <div class="col-md-6">
              <Link to={`${this.props.match.url}/${item.id}`}>
            <h3>{item.name}</h3>
              </Link>
            <Link to={{ pathname: `${this.props.match.url}/new`, state: { provider: item.id }}}>
              <button className="btn btn-primary" >Link To My Account</button>
            </Link>
          </div>
        </div>
    )





    const AllProviders = () => ([
      <h2 className='text-center' style={{margin: '40px'}} >Reward Programs</h2>,
      <div>
        {this.props.data.map(item => (
          ProviderRowInTableAll(item)
          ))}
      </div>
      ])

    const ProviderRowInTableAll = (item) => (
        <div class="row" key={item.id}>
          <div class="col-md-6 text-center" >
             <Link to={`${this.props.match.url}/${item.id}`}>
              <img class="img-fluid rounded mb-3 mb-md-0 provider-image-container" src={item.image} alt= { "" } />
             </Link>
          </div>
          <div class="col-md-6">
              <Link to={`${this.props.match.url}/${item.id}`}>
            <h3>{item.name}</h3>
              </Link>
            <p className='providerDescription' >More Rewards is one of Western Canada's favourite loyalty programs, and it's easy to see why. 
            More Rewards lets you earn points at dozens of places you already shop and redeem them for great stuff. What kind of stuff? 
            Just about anything you could imagine – rewards range from gift cards to kitchen appliances to camping equipment and travel. 
            Just use your card at retailers you love, and watch the points roll in. To see what you can save up for, view our catalogue.
            </p>
          </div>
        </div>

    )

    return (
      <div className="providers">
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

    // <p>More Rewards is one of Western Canada's favourite loyalty programs, and it's easy to see why. 
    //         More Rewards lets you earn points at dozens of places you already shop and redeem them for great stuff. What kind of stuff? 
    //         Just about anything you could imagine – rewards range from gift cards to kitchen appliances to camping equipment and travel. 
    //         Just use your card at retailers you love, and watch the points roll in. To see what you can save up for, view our catalogue.
    //   </p>

// <p>SCENE is the first and only entertainment rewards program in Canada. It is a partnership between two of Canada's best known companies, Scotiabank and Cineplex Entertainment.
// The program lets members turn movie-going and banking transactions into FREE movie tickets and more.
// Those with a Scotiabank account can link their SCENE membership to their SCENE ScotiaCard and earn reward points faster.
// The SCENE program is growing - check back often for more fun rewards!
// </p>


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

        {(this.props.data.filter(item => item.user_id).length > 0) &&
          <div className='reward-container'>
            <h2>My Reward Memberships</h2>
            <div className='provider-table'>
              <table className="table table-bordered">
                <thead>
                  <div className='table-head'>
                    <tr>
                      <th>Reward Program</th>
                      <th>Balance</th>
                      <th>Edit</th>
                    </tr>
                  </div>
                </thead>
                <tbody>
                  <div className='table-body'>
                    {this.props.data.filter(item => item.user_id).map(item => (
                      ProviderRowInTableMember(item)
                    ))}
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        }

        {(this.props.data.filter(item => item.user_id).length === 0) &&
          <h4>You have not linked any Reward Programs to your account</h4>
        }

      </div>
    )

    const ProviderRowInTableMember = (item) => (
      <tr key={item.id}>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className="provider-image-container">
              <img src={item.image} alt="N/A" />
            </div>
          </Link>
        </td>
        <td>
          <div className='provider-table-text'>
            <span >My {item.name} Points: </span> <br/>
            <span className='provider-table-points'>{this.props.points[item.id]}</span>
          </div>
        </td>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <button>Edit</button>
          </Link>
        </td>
      </tr>
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


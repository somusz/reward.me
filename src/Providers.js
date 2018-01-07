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
        {this.props.data.filter(item => !item.user_id).length > 0 &&
          <div>
            <h2>Other Reward Programs</h2>
            <div className='provider-table'>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan="2">Reward Program</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.filter(item => !item.user_id).map(item => (
                    ProviderRowInTableNonMember(item)
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    )

    const ProviderRowInTableNonMember = (item) => (
      <tr key={item.id}>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className="provider-image-container">
              <img src={item.image} alt="N/A" />
            </div>
          </Link>
        </td>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className='provider-table-text'>{item.name}</div>
          </Link>
        </td>
        <td>
          <Link to={{ pathname: `${this.props.match.url}/new`, state: { provider: item.id }}}>
            <button>Link To My Account</button>
          </Link>
        </td>
      </tr>
    )

    const AllProviders = () => ([
        <div class="row">
          <div class="col-md-7">
            <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src={ "http://placehold.it/700x300" } alt= { "" } />
            </a>
          </div>
          <div class="col-md-5">
            <h3>Project One</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
            <a class="btn btn-primary" href="#">View Project</a>
          </div>
        </div>,
        
        <div>
        <h2>Reward Programs</h2>
        <div className='provider-table'>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan="2">Reward.me Partners</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map(item => (
                ProviderRowInTableAll(item)
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ])

    const ProviderRowInTableAll = (item) => (
      <tr key={item.id}>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className="provider-image-container">
              <img src={item.image} alt="N/A" />
            </div>
          </Link>
        </td>
        <td>
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className='provider-table-text'>{item.name}</div>
          </Link>
        </td>
      </tr>
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

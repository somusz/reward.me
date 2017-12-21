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
        <h2>My Reward Memberships</h2>

        {(this.props.data.filter(item => item.user_id).length > 0) &&
          <div className='provider-table'>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan="2">Reward Program</th>
                  <th>Balance</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.filter(item => item.user_id).map(item => (
                  ProviderRowInTableMember(item)
                ))}
              </tbody>
            </table>
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
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div className='provider-table-text'>{item.name}</div>
          </Link>
        </td>
        <td>
          <div className='provider-table-text'>My Points: {this.props.points[item.id]}</div>
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

    const AllProviders = () => (
      <div>
        <h2>Reward Programs</h2>
        <div className='provider-table'>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan="2">Reward Program</th>
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
    )

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

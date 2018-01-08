import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/Providers.css';
import './vendor/bootstrap/css/bootstrap.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/bootstrap-grid.css';
import './vendor/bootstrap/css/bootstrap-grid.min.css';
import './vendor/bootstrap/css/bootstrap-reboot.css';
import './vendor/bootstrap/css/bootstrap-reboot.min.css';

class Providers extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }


  render(){

    const Memberships = () => (
      <div className="container">

        {(this.props.data.filter(item => item.user_id).length > 0) &&
          <div>
            <h1 className="my-4">My Reward Memberships</h1>
            <div>
              <ul>
                {this.props.data.filter(item => item.user_id).map(item => (
                  ProviderMember(item)
                ))}
              </ul>
            </div>
          </div>
        }

        {(this.props.data.filter(item => item.user_id).length === 0) &&
          <h4>You have not linked any Reward Programs to your account</h4>
        }

      </div>
    )

    const ProviderMember = (item) => (
      <li className="row" key={item.id}>
        <div className="col-md-5">
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div>
              <img className="img-fluid rounded mb-3 mb-md-0" src={item.image} alt="N/A" />
            </div>
          </Link>
        </div>
        <div className="col-md-7">
            <span className="points points-text">My {item.name} Points:
              <span className="points-point">{this.props.points[item.id]}</span>
            </span>
          <div>
            <Link to={`${this.props.match.url}/${item.id}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          </div>
        </div>
      </li>
    )


    const NonMemberships = () => (
      <div>
        {this.props.data.filter(item => !item.user_id).length > 0 &&
          <div>
            <h1 className="my-4">Other Reward Programs</h1>
            <div>
              <ul>
                {this.props.data.filter(item => !item.user_id).map(item => (
                  ProviderNonMember(item)
                ))}
              </ul>
            </div>
          </div>
        }
      </div>
    )

    const ProviderNonMember = (item) => (
      <li className="row" key={item.id}>
        <div className="col-md-5">
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div>
              <img className="img-fluid rounded mb-3 mb-md-0" src={item.image} alt="N/A" />
            </div>
          </Link>
        </div>
        <div className="col-md-7">
          <div>
            <Link to={`${this.props.match.url}/${item.id}`}>
              <div>{item.name}</div>
            </Link>
          </div>
          <div>
            <Link to={{ pathname: `${this.props.match.url}/new`, state: { provider: item.id }}}>
              <button className="btn btn-primary">Link To My Account</button>
            </Link>
          </div>
        </div>
      </li>
    )

    const AllProviders = () => (
      <div>
        <h1>Our Reward Partners</h1>
        <div>
          <ul>
            {this.props.data.map(item => (
              ProviderAll(item)
            ))}
          </ul>
        </div>
      </div>
    )

    const ProviderAll = (item) => (
      <li className="row" key={item.id}>
        <div className="col-md-5">
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div>
              <img className="img-fluid rounded mb-3 mb-md-0" src={item.image} alt="N/A" />
            </div>
          </Link>
        </div>
        <div className="col-md-7">
          <Link to={`${this.props.match.url}/${item.id}`}>
            <div>{item.name}</div>
          </Link>
        </div>
      </li>
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

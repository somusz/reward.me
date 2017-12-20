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

  componentWillMount() {
    fetch("/providers")
      .then((res) => {
        res.json()
          .then((jsonData) => {
            this.setState({ data: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }
  render(){
    return (
      <div className="providers">
        <ul>
          {this.state.data.map(item => (
            <div key={item.id}>
              <Link to={`${this.props.match.url}/${item.id}`}>
                <li>
                  <div className="provider-image-container">
                    <img src={item.image} alt="N/A" />
                  </div>
                  <h3>{item.name}</h3>
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default Providers;

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/Providers.css';

class Providers extends Component{
  state = { data: [] }

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
    console.log('rendering...');
    return (
      <div className="providers">
        <ul>
          {this.state.data.map(item => (
            <div key={item.id}>
              <Link to={`/provider/${item.id}`}>
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

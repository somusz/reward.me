import Deal from './Deal.js'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/Deals.css';

class Deals extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      providers: {'1': 'More Rewards', '2': 'Scene'}
    };
  }

  componentWillMount() {
    fetch("/deals")
      .then((res) => {
        res.json()
          .then((jsonData) => {
            jsonData.forEach(item => Object.assign(item, {provider: this.state.providers[item.provider_id]}))
            console.log(jsonData)
            this.setState({ items: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }
  render(){
    return (
      <div>
        <header>
          <h1> Deals </h1>
          {this.props.points.map(p => `You have ${p.points} for provider ${this.state.providers[p.provider_id]}`)}
        </header>
        <div className="deals-container">

          {this.state.items.map(item =>
             <Deal key={item.id} item={item} />
          )}

        </div>
      </div>
    )
  }
}

export default Deals;

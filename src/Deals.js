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

  getPercentage = item => {

    let p = this.props.points[item.provider_id] / item.price || 0;
    return p > 1 ? 1 : p;
  }

  componentWillMount() {
    fetch("/deals")
      .then((res) => {
        res.json()
          .then((jsonData) => {
            jsonData = jsonData.map(item => Object.assign(item, {
              provider: this.state.providers[item.provider_id],
              percentage: this.getPercentage(item)
            }))

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
          <p> {this.props.points[1] ? `More Rewards Points: ${this.props.points[1]}` : ""} </p>
          <p> {this.props.points[2] ? `Scene Points: ${this.props.points[2]}` : ""} </p>
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

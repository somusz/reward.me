import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/Deals.css';

class Deals extends Component{
  state = { data: [] }

  componentDidMount() {
    fetch("/deals")
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
      <div className="deals">

        {this.state.data.map(item => (
          <article key={item.id} className="deal">
            <Link to={`/deal/${item.id}`}>
                <aside> {item.price} </aside>
                <img src={item.image} alt={item.name}/>
                <h3> {item.name} </h3>
            </Link>
          </article>
        ))}

      </div>
    )
  }
}

export default Deals;

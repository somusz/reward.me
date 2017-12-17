import React, {Component} from 'react';
import './styles/Deals.css'

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
              {console.log(item)}
              <aside> {item.price} </aside>
              <img src={item.image} alt="image"/>
              <h3> {item.name} </h3>
              <div> {item.description} </div>
          </article>
        ))}

      </div>
    )
  }
}

export default Deals;

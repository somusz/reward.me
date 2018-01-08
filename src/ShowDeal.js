import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ShowDeal extends Component{
  constructor(props){
    super(props);
    this.state = { data: [] }
  }

  componentDidMount() {
    let url = `/deals/${this.props.match.params.id}`
    fetch(url)
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
      <div>
        <Link to="/deals">All Deals</Link>

        {this.state.data.map(item => (
          <article key={item.id} className="deal-show">
            <aside> {item.price} </aside>
            <h3> {item.name} </h3>
            <img src={item.image} alt={item.name}/>
            <div> {item.description} </div>
            <a href={item.url}> REDEEM </a>
            <p>{item.url}</p>
          </article>
        ))}

      </div>
    )
  }
}

export default ShowDeal;

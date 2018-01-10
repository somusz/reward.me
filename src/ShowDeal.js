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
      <div className='show-deal-container' >

        {this.state.data.map(item => (
          <article key={item.id} className="deal-show">
        <Link to="/deals" style={{display: 'block', textAlign: 'right', marginTop: '10px', marginRight: '10px'}}> Go Back to All Deals</Link>
            <h3 className='text-center' > {item.name} - {item.price} points </h3>
            <img src={item.image} alt={item.name}/>
            <div> {item.description} </div>
            <div className="text-center">
              <a className="redeem-button" href={item.url} target='_blank' > REDEEM </a>
              <br/><br/>
              {this.props.points[item.provider_id] ? <small> You have {this.props.points[item.provider_id]} points </small> : ''}
            </div>
          </article>
        ))}

      </div>
    )
  }
}

export default ShowDeal;

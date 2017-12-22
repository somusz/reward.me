import {Link} from 'react-router-dom';
import React from 'react';


class Deal extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("Dead shouldUpdate?", nextProps)
    return nextProps.item.percentage !== this.props.item.percentage;
  }

  render(){
  return (
    <article className="deal">
      <Link to={`/deals/${this.props.item.id}`}>
        <aside style ={{width: this.props.item.percentage * 349}}> {this.props.item.price} &nbsp; </aside>
        <div className="deal-left">
          <img src={this.props.item.image} alt={this.props.item.name}/>
        </div>
        <div className="deal-right">
          <p> {this.props.item.provider} </p>
          <h3> {this.props.item.name} </h3>
        </div>
      </Link>
    </article>
    )
  }
}

export default Deal;

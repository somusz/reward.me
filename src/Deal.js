import {Link} from 'react-router-dom';
import React from 'react';


const Deal = (props) => {
  return (
  <article className="deal">
    <Link to={`/deals/${props.item.id}`}>
      <aside style ={{width: props.item.percentage * 349}}> {props.item.price} &nbsp; </aside>
      <div className="deal-left">
        <img src={props.item.image} alt={props.item.name}/>
      </div>
      <div className="deal-right">
        <p> {props.item.provider} </p>
        <h3> {props.item.name} </h3>
      </div>
    </Link>
  </article>
  )
}

export default Deal;

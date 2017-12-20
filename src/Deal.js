import {Link} from 'react-router-dom';
import React from 'react';


const Deal = (props) => {
  return (
  <article className="deal">
    <Link to={`/deals/${props.item.id}`}>
        <aside> {props.item.price} </aside>
        <img src={props.item.image} alt={props.item.name}/>
        <h3> {props.item.name} </h3>
    </Link>
  </article>
  )
}

export default Deal;

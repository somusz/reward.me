import {Link} from 'react-router-dom';
import React from 'react';


class Deal extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.points[this.props.item.product_id] !== this.props.points[this.props.item.product_id]
  }

// <img src={this.props.item.image} alt={this.props.item.name}/>

  render(){
    return (
      <div class="col-lg-3 col-md-4 mb-4">
        <div class="card h-100">
          <Link to={`/deals/${this.props.item.id}`}>
            <div className="deal-image-div" style={{backgroundImage: `url(${this.props.item.image})`}} />
          </Link>
          <div class="card-body">
            <h4 class="card-title">
              <Link to={`/deals/${this.props.item.id}`}>
                {this.cleanName(this.props.item.name)}
              </Link>
            </h4>

          </div>
          <div class="card-footer">
            <small class ="text-muted">
              {this.props.points[this.props.item.provider_id]} / {this.props.item.price} points
            </small>
          </div>
        </div>
      </div>
    )

    // <p class="card-text"> {this.cleanDescription(this.props.item.description)} </p>

 // <img class="card-img-top" src={this.props.item.image}  alt=""/>
            // <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>


    //old:
    return (
      <article className="deal" style={{width: '100%'}}>
        <Link to={`/deals/${this.props.item.id}`}>
          <div className="deal-left">
            <div className="deal-image-div" style={{backgroundImage: `url(${this.props.item.image})`}} />
          </div>
          <div className="deal-right">
            <p> {this.props.item.provider_name} </p>
            <h3> {this.cleanName(this.props.item.name)} </h3>
            <span className="points"> {this.props.item.price} </span>
          </div>
        </Link>
        <div className="progressbar-container">
          <div className="progressbar" style ={{flex: this.getPercentage()}}> </div>
          <div className="progress-percent"> {this.cleanPercent(this.getPercentage())}% </div>
        </div>
      </article>
    )
  }

  getPercentage(){
    let points = this.props.points[this.props.item.provider_id];
    let price = this.props.item.price;
    let p = points / price || 0;
    return p > 1 ? 1 : p;
  }

  cleanPercent(percentage){
    return Math.floor(percentage * 100);
  }

  cleanName(name){
    return (name.length < 60) ? name : name.substr(0,50) + '...';
  }
  cleanDescription(description){
    return (description.length < 200) ? description : description.substr(0,150) + '...';
  }
}

export default Deal;

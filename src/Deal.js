import {Link} from 'react-router-dom';
import React from 'react';


class Deal extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.points[this.props.item.product_id] !== this.props.points[this.props.item.product_id]
  }

// <img src={this.props.item.image} alt={this.props.item.name}/>

  render(){
    console.log('Deal.js props history --> ', this.props.history.location.pathname, this.props.history.location.pathname.search('/providers') === -1)
    return (


        <div className= {(this.props.history.location.pathname.search('/providers') === -1) ? "col-lg-3 col-md-4 mb-4" : "col-lg-6 col-md-12 mb-4"} >

          <div className="card h-100" style={{position: 'relative'}}>
          <Link to={`/deals/${this.props.item.id}`} >
            <div className="deal-image-div" style={{backgroundImage: `url(${this.props.item.image})`}} />
          </Link>
          <div
            className='card-provider-name'
            style={{
              background: this.providerBackgroundColor(this.props.item.provider_id),
              color: this.providerColor(this.props.item.provider_id)
            }}
          >
              {this.props.item.provider_name}
            </div>
          <div className="card-body">
            <h4 className="card-title">
              <Link to={`/deals/${this.props.item.id}`}>
                {this.cleanName(this.props.item.name)}
              </Link>
            </h4>
          </div>
          {this.getPercentage() === 1 ?
            <a href={this.props.item.url} target='_blank' >

                <button className="card-footer btn-primary">
                   REDEEM NOW <br/> {this.props.item.price} points
                </button>

            </a> :
            <div className="card-footer">
              <span>
                {this.props.points[this.props.item.provider_id] ? this.props.points[this.props.item.provider_id] + ' / ' + this.props.item.price + ' points' : this.props.item.price + ' points'}
              </span>
            </div>
          }
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

  providerBackgroundColor(id){
    switch(id) {
      case 1:
        return '#01599a'
      case 2:
        return '#ed1b2e'
      case 3:
        return '#94d833'
      case 4:
        return '#6cd0ef'
      case 5:
        return '#27082f'
      case 6:
        return '#f5efc5'
      case 7:
        return '#f39495'
      case 8:
        return '#690201'
    }
  }
  providerColor(id){
    switch(id) {
      case 1:
        return '#fed200'
      case 2:
        return 'white'
      case 3:
        return '#154530'
      case 4:
        return 'white'
      case 5:
        return 'white'
      case 6:
        return '#9a2226'
      case 7:
        return 'black'
      case 8:
        return 'white'
    }
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

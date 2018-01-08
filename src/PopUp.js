import React, {Component} from 'react';


import './styles/PopUp.css';

class PopUp extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {

  }

  render(){

    return (
      <div id="popup1" className="overlay" style={{  visibility: this.props.visibility, opacity: this.props.opacity}}>
        <div className="popup">
          <a className="close" href="#">&times;</a>
          <img src={ "https://openclipart.org/download/217592/Sad-dino-by-Rones.svg"} alt={"Sad Dinosaur"} style={{height: '100%', width: '100%', margin: '0 auto'}} />
          <div className="content text-center" style={{fontSize: '20px'}} >
            {this.props.message}
          </div>
        </div>
      </div>
    )
  }
}

export default PopUp;

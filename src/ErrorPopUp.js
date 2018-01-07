import React, {Component} from 'react';


import './styles/ErrorPopUp.css';

class ErrorPopUp extends Component{
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
          <div className="content">
            {this.props.errorMessage}
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPopUp;

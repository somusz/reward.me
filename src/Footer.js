import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './styles/Footer.css';

class Footer extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {

  }

  render(){

    return (
     <footer className="py-5 bg-black">
     <div className="container">
     <p className="m-0 text-center text-white small">Copyright &copy; REWARD.ME 2017</p>
     </div>
     </footer>
     )
   }
 }

 export default Footer;

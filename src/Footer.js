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
    //  <footer class="footer-bs">
    //     <div class="row">
    //       <div class="col-md-4 footer-brand">
    //           <h2>REWARD.ME</h2>
    //             <p>Suspendisse hendrerit tellus laoreet luctus pharetra. Aliquam porttitor vitae orci nec ultricies. Curabitur vehicula, libero eget faucibus faucibus, purus erat eleifend enim, porta pellentesque ex mi ut sem.</p>

    //         </div>

    //         <div class="col-md-5 footer-ns">
    //           <h4>Newsletter</h4>
    //             <p>Get the latest updates and offers directly in your inbox</p>

    //               <div class="input-group">
    //                   <input type="text" class="form-control" placeholder="Enter your email..." />
    //                   <span class="input-group-btn newsletter">
    //                     <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-envelope"></span></button>
    //                   </span>
    //                 </div>
    //         </div>

    //       <div class="col-md-3 footer-social">
    //           <h4 class="text-center">Follow Us</h4>
    //           <ul class="text-center">
    //               <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
    //               <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
    //               <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
    //             </ul>
    //         </div>

    //     </div>
    //     <p class="text-center right_reserved" >© 2017 REWARD.ME, All rights reserved</p>
    // </footer>
     )
   }
 }

 export default Footer;

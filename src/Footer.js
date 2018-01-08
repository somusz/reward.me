import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import twitter from './img/twitter.svg'
import github from './img/github.svg'
import linkedin from './img/linkedin.svg'
import facebook from './img/facebook.svg'
import locationPoint from './img/location-point.svg'
import closedEnvelopeCircle from './img/closed-envelope-circle.svg'
import phoneSymbolInsideCircle from './img/phone-symbol-of-an-auricular-inside-a-circle.svg'

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
    <footer className="footer-distributed">

      <div className="footer-left">

        <h3>REWARD<span>.ME</span></h3>

        <p className="footer-links">
          <a href="#">Home</a>
          ·
          <a href="#">Blog</a>
          ·
          <a href="#">Pricing</a>
          ·
          <a href="#">About</a>
          ·
          <a href="#">Faq</a>
          ·
          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">REWARD.ME &copy; 2017</p>
      </div>

      <div className="footer-center">

        <div>
          <a href="#" ><img src={locationPoint} alt={'Facebook'} className='footerOtherLogos' /></a>
          <p><span>46 Spadina Ave - 4th Floor
      </span>Toronto, ON, Canada M5V 2H8</p>
        </div>

        <div>
          <a href="#" ><img src={phoneSymbolInsideCircle} alt={'Facebook'} className='footerOtherLogos' /></a>
          <p>+1-888-818-8890</p>
        </div>

        <div>
          <a href="#" ><img src={closedEnvelopeCircle} alt={'Facebook'} className='footerOtherLogos' /></a>
          <p><a href="mailto:support@company.com" style={{color: 'rgb(29, 128, 159)'}}>rewardme@company.com</a></p>
        </div>

      </div>

      <div className="footer-right">

        <p className="footer-company-about">
          <span>About Us</span>
          REWARD.ME is a user friendly one stop shop that allows you to manage all your rewards points from one dashboard, comfortably. Forget the days that you had to use 6 different websites to manage your rewards points. REWARD.ME. 
        </p>

        <div className="footer-icons">

          <a href="#" className='footerLogoBackground' ><img src={facebook} alt={'Facebook'} className='footerSocialMediaLogos' /></a>
          <a href="#" className='footerLogoBackground' ><img src={twitter} alt={'Twitter'} className='footerSocialMediaLogos' /></a>
          <a href="#" className='footerLogoBackground' ><img src={linkedin} alt={'Linkedin'} className='footerSocialMediaLogos' /></a>
          <a href="#" className='footerLogoBackground' ><img src={github} alt={'Github'} className='footerSocialMediaLogos' /></a>

        </div>

      </div>

    </footer>

     )
   }
 }

 export default Footer;

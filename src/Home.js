import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles/Home.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { faMoneyBillAlt } from '@fortawesome/fontawesome-free-solid'
import { faThumbsUp } from '@fortawesome/fontawesome-free-solid'

class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {}

    // this._logoutProcess = this._logoutProcess.bind(this)
  }

  componentDidMount () {

  }

  render(){

    return ([
    <header >
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active" style={ {backgroundImage: "url('http://www.thepeak.fm/uploads/contest/27896/PK_MoreRewards2_HD_1200_400_width.jpg')" } } >
          </div>
          <div className="carousel-item" style={ { backgroundImage : "url('https://i.ytimg.com/vi/uxuw6LpkAdM/maxresdefault.jpg')" } } >
          </div>
          <div className="carousel-item" style={ {backgroundImage: "url('http://www.pointswithacrew.com/wp-content/uploads/2017/11/boxed-5x-membership-rewards-1024x878.jpg')" } } >
          </div>
        </div>
        <div className="hero-banner homepage-bg">
        <div className="inner">
          <div className="short-line"></div>
        <div className="banner-cta-con">
          <a className="join-link" href="/register">join for free</a>
          <a className="signin-link" href="/login">sign in now</a>
        </div>
        </div>
      </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </header>,



    <section className="content-section bg-primary text-white text-center" id="services">
      <div className="container">
        <div className="content-section-heading">
          <h3 className="text-secondary mb-0">Services</h3>
          <h2 className="mb-5">What We Offer</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <span className="service-icon rounded-circle mx-auto mb-3">
                  <FontAwesomeIcon icon={faClock}/>
            </span>
            <h4>
              <strong>Accurate</strong>
            </h4>
            <p className="text-faded mb-0">Real-time updates, every time you sign in!</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <span className="service-icon rounded-circle mx-auto mb-3">
              <FontAwesomeIcon icon={faMobileAlt} />
            </span>
            <h4>
              <strong>Mobile-Friendly</strong>
            </h4>
            <p className="text-faded mb-0">Uncompromising user experience on any screen.</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
            <span className="service-icon rounded-circle mx-auto mb-3">
              <FontAwesomeIcon icon={faMoneyBillAlt} />
            </span>
            <h4>
              <strong>Convenience</strong>
            </h4>
            <p className="text-faded mb-0">Manage a variety of rewards points from one incredible site!</p>
          </div>
          <div className="col-lg-3 col-md-6">
            <span className="service-icon rounded-circle mx-auto mb-3">
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
            <h4>
              <strong>Easy Login</strong>
            </h4>
            <p className="text-faded mb-0">Access all your points with one unique Reward.Me login</p>
          </div>
        </div>
      </div>
    </section>,


    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="p-5">
              <img className="img-fluid" src={'https://smartcanucks.ca/wp-content/uploads/2010/04/scene.jpg'} alt={"Scene Rewards Card"} style={{height: '250px'}}/>
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="p-5">
              <h2 className="display-4">Join !</h2>
              <p> Start earning FREE movies, meals, and more with SCENE. It’s FREE to join – Earn points while having fun – like seeing a movie or sharing a meal with friends and family.!</p>
            </div>
          </div>
        </div>
      </div>
    </section>,

       <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src={'http://www.shidastudio.com/img/More-Rewards-home.png'} alt={"More Rewards Logo"} style={{height: '250px'}} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-5">
              <h2 className="display-4"> Amazing!</h2>
              <p>More Rewards is one of Western Canada's favourite loyalty programs, and it's easy to see why. Their program lets you earn points at dozens of places you already shop and redeem them for great stuff. </p>
            </div>
          </div>
        </div>
      </div>
    </section>,
    <div style={{height: '100%', paddingBottom: '400px'}}>
        <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src={'http://nogginadvertising.com/wp-content/uploads/2014/03/Air-Miles-logo.jpg'} alt={"Air Miles Logo"} style={{height: '250px'}} />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="p-5">
              <h2 className="display-4">Limitless!</h2>
              <p>AIR MILES® is one of the best ways to get rewards in Canada. With an AIR MILES® Collector Card, you can turn everyday purchases like gas and groceries into movie tickets, kitchen gadgets, electronics, dream vacations and so much more.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    ])
  }
}

export default Home;

import Deal from './Deal.js'
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './styles/Deals.css';

class Deals extends Component{
  constructor(props){
    console.log("constructing deals.js with props", props)
    super(props);
    this.state = {
      items: [],
      providers: {'1': 'More Rewards', '2': 'Scene'}, //temporary, should link to db somewhere?
      formRedeemable: false,
      formProvider: 'all',
      formQuery: ''
    };
    let redeemableValue = /redeemable=([^&]+)/.exec(props.location.search)
    if (redeemableValue) this.state.formRedeemable = true;
    let providerValue = /provider=([^&]+)/.exec(props.location.search)
    if (providerValue) this.state.formProvider = providerValue[1];
    let queryValue = /q=([^&]+)/.exec(props.location.search)
    if (queryValue) this.state.formQuery = queryValue[1];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.items || nextState.items.length !== this.props.items.length
      || nextProps.points[1] !== this.props.points[1]
      || nextProps.points[2] !== this.props.points[2]
      || nextProps.location.search !== this.props.location.search;
  }

  componentDidMount() {

    console.log("Component Did Mount fetching deals data", this.props.location.search)

    fetch("/deals?limit=1000")

      .then((res) => {
        return res.json()
          .then((jsonData) => {
            this.setState({ items: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }

  render(){
    return (
      <div>

        <div className="deals container">

          <h2 className="text-center"> Deals </h2>

          <div className="row" >

              <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src="./StockPhoto1_900x350.jpeg" alt="First slide"/>
                    <h2 className="carousel-content"> Trip of Your Life </h2>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="./StockPhoto2_900x350.jpeg" alt="Second slide"/>
                    <h2 className="carousel-content"> Tropical Vacation </h2>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="./StockPhoto3_900x350.jpg" alt="Third slide"/>
                    <h2 className="carousel-content"> Visit Disney Land </h2>
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

          </div>


          <hr />

          <form
            action='/deals'
            method='GET'
            onSubmit={this.handleSubmit}
            className="form-group row "
          >
            <div className="col">
              <div className="form-control">
                <input
                  type="checkbox"
                  name="redeemable"
                  id="redeemableCheck"
                  checked={this.state.formRedeemable}
                  onChange={this.handleCheckboxChange}
                  className="form-check form-check-inline"
                />
                <label className="form-check-label" htmlFor="redeemableCheck"> Redeemable </label>
              </div>
            </div>

            <div className="col">
              <select
                name="providers"
                value={this.state.formProvider}
                onChange={this.handleProviderChange}
                className="form-control"
              >
                <option value="all"> All Providers </option>
                <option value="1"> More Rewards </option>
                <option value="2"> Scene </option>
              </select>
            </div>

            <div className="col">
              <input
                name="q"
                placeholder="search..."
                value={this.state.formQuery}
                onChange={this.handleQueryChange}
                className="form-control"
              />
            </div>
          </form>


          <hr />

          <div className="deals-container" style={{marginBottom: '600px'}} >

            {this.state.items.map(item => {
              if (this.shouldDisplay(item)){
               return (<Deal key={item.id} item={item} points={this.props.points} />)
              }
            })}

          </div>
        </div>
      </div>
    )
  }

  shouldDisplay(item){
    let findQueryExec = /q=([^&]+)/.exec(this.props.location.search);
    let searchQueries = findQueryExec ? findQueryExec[1].split('%20') : [];

    return (item.percentage === 1 || !this.state.formRedeemable)
      && (this.state.formProvider === "all" || Number(this.state.formProvider) === item.provider_id)
      && (searchQueries.length === 0 || searchQueries.reduce((acc,q) => acc || item.description.toUpperCase().indexOf(q.toUpperCase()) >= 0, false))
  }

  handleCheckboxChange = e => {
    this.state.formRedeemable= !this.state.formRedeemable;
    this.changeURL();
  }
  handleProviderChange = e => {
    this.state.formProvider= e.target.value;
    this.changeURL();
  }
  handleQueryChange = e => {
    this.setState({formQuery: e.target.value});
  }

  changeURL = (query) => {
    let queries = [];
    if (query){
      queries.push(`q=${query}`)
    }else if (query !== "") {
      let prevQuery = /q=([^&]+)/.exec(this.props.location.search)
      if (prevQuery) queries.push(prevQuery[0]);
    }
    if (this.state.formRedeemable) queries.push("redeemable=true");
    if (this.state.formProvider !== "all") queries.push(`provider=${this.state.formProvider}`)
    let url = '/deals';
    if (queries.length > 0) url += '?' + queries.join('&');
    this.props.history.push(url);
    this.props.history.goForward();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.changeURL(this.state.formQuery);
  }
}

export default Deals;

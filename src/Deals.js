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

    fetch("/deals")
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
        <header>
          <h1> Deals </h1>
          <p> {this.props.points[1] ? `More Rewards Points: ${this.props.points[1]}` : ""} </p>
          <p> {this.props.points[2] ? `Scene Points: ${this.props.points[2]}` : ""} </p>
          <form
            action='/deals'
            method='GET'
            onSubmit={this.handleSubmit}
            className="deals-filter"
          >
              <label htmlFor="redeemableCheck"> Redeemable </label>
              <input
                type="checkbox"
                name="redeemable"
                id="redeemableCheck"
                checked={this.state.formRedeemable}
                onChange={this.handleCheckboxChange}
              />


              <select
                name="providers"
                value={this.state.formProvider}
                onChange={this.handleProviderChange}
              >
                <option value="all"> All </option>
                <option value="1"> More Rewards </option>
                <option value="2"> Scene </option>
              </select>

            <input
              name="q"
              placeholder="search..."
              value={this.state.formQuery}
              onChange={this.handleQueryChange}
            />
            <button type="submit"> Search </button>
          </form>
        </header>

        <div className="deals-container">

          {this.state.items.map(item => {
            if (this.shouldDisplay(item)){
             return (<Deal key={item.id} item={item} points={this.props.points} />)
            }
          })}

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

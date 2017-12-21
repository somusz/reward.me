import Deal from './Deal.js'
import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import './styles/Deals.css';

class Deals extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      providers: {'1': 'More Rewards', '2': 'Scene'}, //temporary, should link to db somewhere?
      formRedeemable: false,
      formProvider: 'all'
    };
  }

  getPercentage(item, nextProps){
    nextProps = nextProps || this.props;
    let p = nextProps.points[item.provider_id] / item.price || 0;
    // console.log('getPercentage', p, nextProps.points);
    return p > 1 ? 1 : p;
  }

  componentWillReceiveProps(nextProps){
    //check whether props have changed before doing this calculation.
    this.state.items.forEach(item => item.percentage = this.getPercentage(item, nextProps));
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate', nextProps.history)

    return nextState.items || nextState.items.length !== this.props.items.length
      || nextProps.points[1] !== this.props.points[1]
      || nextProps.points[2] !== this.props.points[2]
      || nextProps.location.search !== this.props.location.search
      // || nextState.items.shouldUpdate

  }

  componentDidMount() {

    // console.log("Component Did Mount", this.props.location.search)

    fetch("/deals?q=99")

      .then((res) => {
        res.json()
          .then((jsonData) => {
            console.log('componentDidMount', jsonData, this.props.points)
            jsonData =
              jsonData.map(item =>
                        Object.assign(item, {
                          provider: this.state.providers[item.provider_id],
                          percentage: this.getPercentage(item)
                      }))
                      // .filter(item=>item.provider_id == 1)
                      // .sort((a,b) => a.percentage > b.percentage ? -1 : a.percentage < b.percentage ? 1 : a.price > b.price ? -1 : 1)

            // jsonData.shouldUpdate = true;
            // console.log('jsonData', jsonData);
            this.setState({ items: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }
  render(){
    console.log('POINTS', this.props.points)
    return (
      <div>
        <header>
          <h1> Deals </h1>
          <p> {this.props.points[1] ? `More Rewards Points: ${this.props.points[1]}` : ""} </p>
          <p> {this.props.points[2] ? `Scene Points: ${this.props.points[2]}` : ""} </p>
          <form action='/deals' method='GET' onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div>
              <input type="checkbox" name="redeemable" id="redeemableCheck" checked={this.state.formRedeemable}/>
              <label htmlFor="redeemableCheck"> "Only show redeemable items" </label>


              <select name="providers" value={this.state.formProvider}>
                <option value="all"> All </option>
                <option value="1"> More Rewards </option>
                <option value="2"> Scene </option>
              </select>
            </div>
            <button type="submit"> Search </button>
          </form>
        </header>

        <div className="deals-container">

          {this.state.items.map(item => {
            if (this.shouldDisplay(item)){
             return (<Deal key={item.id} item={item} />)
            }
          })}

        </div>
      </div>
    )
  }

              //   <input list="providers" name="provider"/>
              // <datalist id="providers" value={this.state.formProvider}>
              //   <option value="More Rewards"> More Rewards </option>
              //   <option value="Scene"> Scene </option>
              // </datalist>

  shouldDisplay(item){
    // console.log("Should Display", item, this.state.formRedeemable, this.state.formProvider);
    let bool =  (item.percentage === 1 || !this.state.formRedeemable)
      && (this.state.formProvider === "all" || Number(this.state.formProvider) === item.provider_id)
    console.log(bool)
    return bool;
  }

  handleChange = e => {
    // console.log(e.target)
    if (e.target.name === "redeemable"){
      this.setState({formRedeemable: !this.state.formRedeemable});
      console.log('checkbox state updated to', !this.state.formRedeemable)
    } else if (e.target.name === "providers"){
      this.setState({formProvider: e.target.value})
      console.log('provider state updated to', e.target.value)
    } else {
      return;
    }
    this.changeURL();
  }

  changeURL = () => {
    let queries = [];
    if (this.state.formRedeemable) queries.push("redeemable=true");
    if (this.state.formProvider != "all") queries.push(`provider=${this.state.formProvider}`)
    let url = '/deals';
    if (queries.length > 0) url += '?' + queries.join('&');
    // console.log('url',url);
    this.props.history.push(url);
    this.props.history.goForward();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.changeURL();
  }
}

export default Deals;

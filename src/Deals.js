import Deal from './Deal.js'
import React, {Component} from 'react';
import './styles/Deals.css';

class Deals extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      providers: {'1': 'More Rewards', '2': 'Scene'}, //temporary, should link to db somewhere?
      formRedeemable: false,
      formProvider: ''
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
    console.log('shouldComponentUpdate', nextState, nextProps)
    return nextState.items.shouldUpdate
      || nextProps.points[1] !== this.props.points[1]
      || nextProps.points[2] !== this.props.points[2]
      || nextProps.location.search != this.props.location.search;
  }

  componentDidMount() {
    console.log("Component Did Mount", this.props.location.search)

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
                      .filter(item=>item.provider_id == 1)
                      .sort((a,b) => a.percentage > b.percentage ? -1 : a.percentage < b.percentage ? 1 : a.price > b.price ? -1 : 1)

            jsonData.shouldUpdate = true;
            console.log('jsonData', jsonData);
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
          <form action='/deals' method='GET' onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div>
              <input type="checkbox" name="redeemable" id="redeemableCheck" checked={this.state.formRedeemable}/>
              <label htmlFor="redeemableCheck"> "Only show redeemable items" </label>

              <input list="providers" name="provider"/>
              <datalist id="providers" value={this.state.formProvider}>
                <option value="More Rewards"> More Rewards </option>
                <option value="Scene"> Scene </option>
              </datalist>
            </div>
            <button type="submit"> Search </button>
          </form>
        </header>

        <div className="deals-container">

          {this.state.items.map(item =>
             <Deal key={item.id} item={item} />
          )}

        </div>
      </div>
    )
  }

  handleChange = e => {
    if (e.target.name === "redeemable"){
      this.setState({formRedeemable: !this.state.formRedeemable});
      console.log('checkbox state updated to', !this.state.formRedeemable)
    } else if (e.target.name === "provider"){
      this.setState({formProvider: e.target.value})
      console.log('provider state updated to', e)
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log("handle submit", e.target.value);
  }
}

export default Deals;

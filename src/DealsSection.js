import React from 'react'
import Deals from './Deals.js'
import ShowDeal from './ShowDeal.js'
import {Route} from 'react-router-dom'


class DealsSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} render={(props) => <Deals {...props} points={this.props.points} /> } />
        <Route path={`${this.props.match.url}/:id`} render={(props) => <ShowDeal {...props} points={this.props.points} /> } />
      </div>
    )
  }
}

        // <Route path={`${this.props.match.url}/:id`} component={ShowDeal} />


export default DealsSection

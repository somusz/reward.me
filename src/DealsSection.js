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
        <Route exact path={`${this.props.match.url}`} component={Deals}/>
        <Route path={`${this.props.match.url}/:id`} component={ShowDeal}/>
      </div>
    )
  }
}

export default DealsSection

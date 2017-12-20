import React from 'react'
import NewProvider from './NewProvider.js'
import Providers from './Providers.js'
import ShowProvider from './ShowProvider.js'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


class ProviderSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={Providers}/>
        <Route path={`${this.props.match.url}/new`} component={NewProvider}/>
        <Route path={`${this.props.match.url}/:id`} component={ShowProvider}/>
      </div>
    )
  }
}

export default ProviderSection

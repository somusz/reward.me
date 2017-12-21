import React from 'react'
import NewProvider from './NewProvider.js'
import Providers from './Providers.js'
import ShowProvider from './ShowProvider.js'
import {Route} from 'react-router-dom'


class ProviderSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    fetch("/providers", {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        res.json()
          .then((jsonData) => {
            this.setState({ data: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} render={(props) =>
          <Providers {...props} data={this.state.data} /> } />
        <Route path={`${this.props.match.url}/new`} component={NewProvider}/>
        <Route path={`${this.props.match.url}/:id`} component={ShowProvider}/>

      </div>
    )
  }
}

export default ProviderSection

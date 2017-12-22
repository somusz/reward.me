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

  componentDidMount() {
    console.log('fetch starting...')
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
          <Providers {...props} data={this.state.data} session={this.props.session} points={this.props.points} /> } />
        <Route path={`${this.props.match.url}/:id`} render={(props) =>
          <ShowProvider {...props} data={this.state.data} session={this.props.session} points={this.props.points} /> } />
        <Route path={`${this.props.match.url}/new`} render={(props) =>
          <NewProvider {...props} data={this.state.data} session={this.props.session} points={this.props.points} /> } />

      </div>
    )
  }
}

export default ProviderSection

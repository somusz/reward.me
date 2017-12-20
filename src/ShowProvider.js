import React, {Component} from 'react';

class ShowProvider extends Component{
  state = { data: [] }

  componentDidMount() {
    let url = `/providers/${this.props.match.params.id}`
    fetch(url)
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
  render(){
    return (
      <div>

        {this.state.data.map(item => (
          <p key={item.id}>Provider Name: {item.name}</p>
        ))}

      </div>
    )
  }
}

export default ShowProvider;


/*
- date

*/

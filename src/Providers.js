import React, {Component} from 'react';

class Providers extends Component{
  state = { data: [] }

  componentDidMount() {
    fetch("/providers")
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

export default Providers;

import React, {Component} from 'react';

class Deals extends Component{
  state = { data: [] }

  componentDidMount() {
    fetch("/deals")
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
          <p key={item.id}>Deal Name: {item.name}</p>
        ))}

      </div>
    )
  }
}

export default Deals;

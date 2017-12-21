import React, {Component} from 'react';

class NewProvider extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log(this.props)
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

export default NewProvider;

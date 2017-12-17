import React, {Component} from 'react';

class ShowUser extends Component{
  state = { data: [] }

  componentDidMount() {
    let url = `/user/${this.props.match.params.id}`
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
          <p key={item.id}>User First Name: {item.first_name}</p>
        ))}

      </div>
    )
  }
}

export default ShowUser;

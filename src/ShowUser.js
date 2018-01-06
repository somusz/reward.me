import React, {Component} from 'react';

class ShowUser extends Component{
  state = { data: [] }
  handleChange(event) {
    console.log(event)
  }
  componentDidMount() {
    // let url = `/user/2`
    // fetch(url)
    //   .then((res) => {
    //     res.json()
    //       .then((jsonData) => {
    //         this.setState({ data: jsonData })
    //       })
    //   })
    //   .catch((err) => {
    //     console.log('error:', err)
    //   })
  }
  render(){

    return ([
      <div className='col-md-8' >Hello</div>,
      <form onSubmit={this.handleSubmit} >
      <label for='email'>
      Email:
      <input type='email' id='email' placeholder='email'/>
      <input type='submit' name='change-email'  placeholder='Change Email' />
      </label>

      <h3 className="text-right" > Change Password: </h3>

      <label for='old-password' > Old Password: 
      <input type='text' name='change-email' id='old-password' placeholder='Old Password' />
      </label>

      <label for='new-password' >New Password: 
      <input type='text' name='new-password' id='new-password' placeholder='New Password' />
      </label>

      <label for='confirm-password'>Confirm New Password: 
      <input type='text' name='confirm-password' id='confirm-password' placeholder='Confirm New Password' />
      </label>

      <input type='submit'  placeholder='Change Password'/>
      </form>
      ])
    }
  }

  export default ShowUser;

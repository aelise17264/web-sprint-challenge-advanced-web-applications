import React from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

class Login extends React.Component {

 state = {
    credentials:{
      username: '',
      password: ''
    }
  }

handleChange = event => {
  this.setState({
    credentials:{
      ...this.state.credentials,
      [event.target.name]: event.target.value
    }
  })
}

login = event => {
  event.preventDefault()
  axiosWithAuth()
  .post('/api/login', this.state.credentials)
  .then(res => {
    localStorage.setItem('token', res.data.payload)
    this.props.history.push('/BubblePage')
  })
  .catch(error => {
    console.log('error in post')
  })
}


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 render(){
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div className='login-form'>
        <form onSubmit={this.login}>
          <input
          type='text'
          name='username'
          value={this.state.credentials.username}  
          onChange={this.handleChange}
          />
          <input
          type='password'
          name='password'
          value={this.state.credentials.password}
          onChange={this.handleChange}
          />
        <button >Login</button>
        </form>
    </div>
    </>
  );
};
}
export default Login;

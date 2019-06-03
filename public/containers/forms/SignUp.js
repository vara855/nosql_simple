import React, { Component } from 'react';
import RegistryNav from './ChangePages';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Request-Headers'] = null
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log('this :', this);
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return;
    }

    axios({
      method: 'post',
      url: 'http://localhost:5501/api/register',
      data: {
        email,
        password: Buffer.from(password).toString('base64')
      },
    }).then((resp) => {
      console.log('resp :', resp);
      this.props.history.push('/login');
    }).catch(err => {
        alert(err.message)
        this.state.err = err.message;
      })
  }

  render() {
    this.state.identialPassword = this.state.password !== this.state.confirmPassword && this.state.confirmPassword;
    console.log('this :', this);
    return (
      <div>
        <RegistryNav></RegistryNav>
        <form className='login'>
          <input type='email' name='email' onChange={this.handleChange} placeholder='example@box.com'></input>
          <input type='password' name='password' onChange={this.handleChange} placeholder='Password'></input>
          <input type='password' name='confirmPassword' onChange={this.handleChange} placeholder='Confirm Password'></input>
          <Alert
            show={this.state.identialPassword}
            variant='warning'>
            Passwords are not idential
          </Alert>
          {/* <Alert
            show={this.state.err}
            variant='info'>
            {this.state.err}
          </Alert> */}
          <button type='button' onClick={this.handleSubmit}>Sign Up</button>

        </form>

      </div>
    );
  }
}

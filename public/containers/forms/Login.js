import React, { Component } from 'react';
import RegistryNav from './ChangePages';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    this.login()

  }

  login = () => {
    const { email, password } = this.state;
    return axios({
      method: 'post',
      url: 'http://localhost:5501/api/login',
      data: {
        email,
        password: Buffer.from(password).toString('base64')
      }
    })
      .then(resp => {
        console.log('resp :', resp);
        const { token, user } = resp.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log('err :', err);
      })
  }

  render() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/home');
    }
    return (
      <div>
        <RegistryNav></RegistryNav>
        <form className='login' onSubmit={this.handleSubmit}>
          <input type='email' name='email' value={this.state.email} onChange={this.handleChange} placeholder='example@box.com'></input>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'></input>
          <button type='button' onClick={this.handleSubmit}>Login</button>
        </form>
      </div>
    )
  }
}
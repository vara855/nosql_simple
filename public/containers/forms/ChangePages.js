import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';


class ToLogout extends Component {
  
  onLogoutClick() {
    localStorage.clear();
    this.props.history.push('/login');
    console.log('s');
  }
  render() {
    return (
      <div>
        <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
      </div>
    )
  }
}
class RegistryNav extends Component {

  onLoginClick() {
    this.props.history.push('/login')
  }
  onSignUpClick() {
    this.props.history.push('/register')
  }
  render() {
    const Logout = withRouter(ToLogout);
    const buttons = (
      <div>
        <button onClick={this.onSignUpClick.bind(this)}>Sign up</button>
        <button onClick={this.onLoginClick.bind(this)}>Sign in</button>
      </div>
      )

    return (
      <div className='cp-wrapper'>
        <div className='btn-group-head'>
          {localStorage.getItem('token') ? <Logout></Logout> : buttons}
        </div>
      </div>
    )
  }
}

export default withRouter(RegistryNav);


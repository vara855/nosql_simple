import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';

class RegistryNav extends Component {

  onLoginClick() {
    this.props.history.push('/login')
  }
  onSignUpClick() {
    this.props.history.push('/register')
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='btn-group-head'>
          <button onClick={this.onSignUpClick.bind(this)}>Sign up</button>
          <button onClick={this.onLoginClick.bind(this)}>Sign in</button>
        </div>
      </div>
    )
  }
}

export default withRouter(RegistryNav);


import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import ReactDom from 'react-dom';
import './styles/style.scss';
import Login from './containers/forms/Login';
import SignUp from './containers/forms/SignUp';
import MainView from './containers/forms/MainView';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={SignUp} />
      <Route path='/home' component={MainView} />
    </Switch>
  );
}

ReactDom.render(
  <Router>
    <App></App>
  </Router>
  ,
  document.getElementById('root'));

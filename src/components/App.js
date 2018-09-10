import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from '../lib/store.js';

import Dashboard from './dashboard/Dashboard.js';
import Home from './home/Home.js';
import SignUpForm from './signup/SignUpForm.js';
import LogInForm from './login/LogInForm.js';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='/signup' component={SignUpForm} />
            <Route path = '/preferences' component={() => <h1>preferences</h1>} />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

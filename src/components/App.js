import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from '../lib/store.js';

import Dashboard from './dashboard/Dashboard.js';
import Home from './home/Home.js';
import SignUpForm from './signup/SignUpForm.js';
import Results from './results/Results.js';
import Preferences from './preferences/Preferences.js';
import Privacy from './privacy/Privacy.js';

import ToDashboard from './redirect/ToDashboard.js';
import ToPreferences from './redirect/ToPreferences.js';
import About from './about/About.js';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='/signup' component={SignUpForm} />
            <Route path = '/preferences' component={Preferences} />
            <Route path = '/results' component={Results} />
            <Route path = '/noredirect' component={ToDashboard} />
            <Route path = '/redirect' component={ToPreferences} />
            <Route path = '/privacypolicy' component={Privacy} />
            <Route path = '/About' component={About} />

          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

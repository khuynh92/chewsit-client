import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

import './style/main.scss';

class Main extends Component {

  render() {
    return (
      <App />
    );
  }

}
ReactDOM.render(<Main />, document.getElementById('root'));
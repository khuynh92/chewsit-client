import './style/main.scss';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import App from './components/App.js';



class Main extends Component {

  render() {
    return (
      <Fragment>
        <Favicon url="./assets/logos/favicon-16x16.png" />
        <App />
      </Fragment>
    );
  }

}
ReactDOM.render(<Main />, document.getElementById('root'));
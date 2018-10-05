import './style/main.scss';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import App from './components/App.js';



class Main extends Component {

  render() {
    return (
      <Fragment>
        <Favicon url="https://raw.githubusercontent.com/khuynh92/chewsit-client/master/src/assets/logos/favicon-96x96.png" />
        <App />
      </Fragment>
    );
  }
}
ReactDOM.render(<Main />, document.getElementById('root'));
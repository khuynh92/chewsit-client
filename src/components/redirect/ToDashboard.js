import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import cookies from 'react-cookies';


export default class ToDashboard extends Component {

  componentDidMount() {
    const { t } = queryString.parse(this.props.location.search);
    cookies.save('token', t);
  }
  
  render() {
    return (
      <Redirect to='/dashboard' />
    );
  }
}
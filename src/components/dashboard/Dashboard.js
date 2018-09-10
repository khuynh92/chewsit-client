import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class Dashboard extends Component {

  componentDidMount() {
    document.title = 'Dashboard';
    // if (cookie.load('token')) {
    //   this.props.logIn();
    // }
  }

  render() {
    if (this.props.loggedIn.isLoggedIn) {
      return (
        <Fragment>
          <h1>Dashboard</h1>
          <p>all redux state is below</p>
          <p>{JSON.stringify(this.props.state)}</p>
        </Fragment>
      );
    } else {
      return  <Redirect to='/'/>;
    }
  }
}


const mapStateToProps = ({ loggedIn }) => ({ loggedIn });

export default connect(mapStateToProps, null)(Dashboard);

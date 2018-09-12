import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';

import {getPrefThunk} from '../../action/preferences-action.js';
import { logOutThunk, logIn } from '../../action/login-action.js';

class Dashboard extends Component {

  async componentDidMount() {
    document.title = 'Dashboard';
    if (cookie.load('token')) {
      let user = JSON.parse(atob(cookie.load('token').split('.')[1]));
      await this.props.logIn(user.id);
      await this.props.getPrefThunk(user.id);
    }
  }

  render() {
    if (this.props.user.isLoggedIn) {
      return (
        <Fragment>
          <h1>Dashboard</h1>
          <p>all redux state is below</p>
          <p>{JSON.stringify(this.props.state)}</p>
          <Button  onClick={this.props.logOutThunk} size="small" variant="contained" color="secondary">Log Out</Button>
        </Fragment>
      );
    } else {
      return <Redirect to='/' />;
    }
  }
}


const mapStateToProps = (state) => ({ state, user: state.user });

const mapDispatchToProps = { logOutThunk, logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

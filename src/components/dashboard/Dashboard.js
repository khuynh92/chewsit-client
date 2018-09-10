import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { logOutThunk } from '../../action/login-action.js';

class Dashboard extends Component {

  componentDidMount() {
    document.title = 'Dashboard';
  }

  render() {
    if (this.props.loggedIn.isLoggedIn) {
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


const mapStateToProps = (state) => ({ state, loggedIn: state.loggedIn });

const mapDispatchToProps = { logOutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

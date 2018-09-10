import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GooglePlus from 'mdi-material-ui/GooglePlus';

import LogInForm from '../login/LogInForm';

import { logIn } from '../../action/login-action.js';


const styles = {
  home: {
    'color': 'black',
  },
  oAuth: {
    marginLeft: 10,
  },
};

class Home extends Component {

  componentDidMount() {
    document.title = 'Home';
    if (cookie.load('token')) {
      this.props.logIn();
    }
  }

  oAuth = () => {
    window.location = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=123538572340-or8e9drlqqnlmkfupkcfh519d889dqo6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/google/code&scope=email openid profile&prompt=consent&response_type=code';
  }

  render() {
    if (this.props.loggedIn.isLoggedIn) {
      return <Redirect push to='/dashboard' />;
    } else {
      return (
        <Fragment>
          <Typography variant="display1" className={this.props.classes.home}>Home</Typography>
          <LogInForm />
          <p>Don't have an account? <Link to='/signup'>Create Account</Link></p>
          <p>Or sign in using Google<Button variant="fab" mini color="secondary" className={this.props.classes.oAuth} onClick={this.oAuth}> <GooglePlus /> </Button> </p>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

const mapDispatchToProps = { logIn };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

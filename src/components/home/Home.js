import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GooglePlus from 'mdi-material-ui/GooglePlus';
import Linkedin from 'mdi-material-ui/linkedin';

import LogInForm from '../login/LogInForm';

import { logIn } from '../../action/login-action.js';


const styles = {
  home: {
    'color': 'black',
  },
  oAuth: {
    marginLeft: 10,
  },
  linkedIn: {
    backgroundColor: 'rgb(33, 138, 218)',
    '&:hover': {
      backgroundColor: 'rgb(30, 120, 189)',
    },
  },
};

class Home extends Component {

  componentDidMount() {
    document.title = 'Home';
    if (cookie.load('token')) {
      this.props.logIn();
    }
  }

  googleOAuth = () => {
    let googleURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let options = {
      client_id: '123538572340-or8e9drlqqnlmkfupkcfh519d889dqo6.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3000/oauth/google/code',
      scope: 'email openid profile',
      prompt: 'consent',
      response_type: 'code',
    }
    let queryString = Object.keys(options).map(key => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join('&');
    let authURL = `${googleURL}?${queryString}`;

    window.location = authURL;

  }

  linkedInOAuth = () => {
    let linkedInURL = 'https://www.linkedin.com/oauth/v2/authorization';
    let options = {
      client_id: '86v36mks0tlhmk',
      redirect_uri: 'http://localhost:3000/oauth',
      // redirect_uri: 'https://khoa-18-oauth.herokuapp.com/oauth',
      scope: 'r_basicprofile r_emailaddress',
      response_type: 'code',
      state: 'LKKdlahjk123jhka23hk1dh12',
    };
    let queryString = Object.keys(options).map(key => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join('&');
    let authURL = `${linkedInURL}?${queryString}`;

    window.location = authURL;

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
          <p>Or sign in with: <Button variant="fab" mini color="secondary" className={this.props.classes.oAuth} onClick={this.googleOAuth}> <GooglePlus /> </Button>     <Button variant="fab" mini color="secondary" className={this.props.classes.linkedIn} onClick={this.linkedInOAuth}> <Linkedin /> </Button></p>
         
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ loggedIn: state.loggedIn });

const mapDispatchToProps = { logIn };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

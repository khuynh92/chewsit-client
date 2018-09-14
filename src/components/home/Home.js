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
import Facebook from 'mdi-material-ui/facebook';
import LogInForm from '../login/LogInForm';

import { logIn } from '../../action/login-action.js';
import { getPrefThunk } from '../../action/preferences-action.js';


const styles = {
  home: {
    'color': 'black',

  },
  google: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgb(211, 72, 54)',
    '&:hover': {
      backgroundColor: 'rgb(241, 102, 84 )',
    },
  },
  facebook: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgb(59, 89, 152)',
    '&:hover': {
      backgroundColor: 'rgb(89, 119, 180)',
    },
  },
  linkedIn: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgb(0, 119, 181)',
    '&:hover': {
      backgroundColor: 'rgb(30, 149, 211)',
    },
  },
};

class Home extends Component {

  async componentDidMount() {
    document.title = 'Home';
    if (cookie.load('token')) {
      let user = JSON.parse(atob(cookie.load('token').split('.')[1]));
      await this.props.logIn(user.id);
      await this.props.getPrefThunk(user.id);
    }
  }

  facebookOAuth = () => {
    window.location = 'https://www.facebook.com/v3.1/dialog/oauth?client_id=510060352775198&scope=email&redirect_uri=http://localhost:3000/oauth/facebook/code&state=123kl21jdo9u01je2l1ij2dlkaj0112';
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
      redirect_uri: 'http://localhost:3000/oauth/linkedIn/code',
      // redirect_uri: 'https://khoa-18-oauth.herokuapp.com/oauth/linkedIn/code',
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
    if (this.props.user.isLoggedIn) {
      return <Redirect push to='/dashboard' />;
    } else {
      return (
        <Fragment>
          <Typography variant="display1" className={this.props.classes.home}>Home</Typography>
          <p>Sign in with:
            <Button variant="fab" mini color="secondary" className={this.props.classes.facebook} onClick={this.facebookOAuth}>
              <Facebook />
            </Button>
            <Button variant="fab" mini color="secondary" className={this.props.classes.google} onClick={this.googleOAuth}>
              <GooglePlus />
            </Button>
            <Button variant="fab" mini color="secondary" className={this.props.classes.linkedIn} onClick={this.linkedInOAuth}>
              <Linkedin />
            </Button>
          </p>
          <LogInForm />
          <p>Don't have an account? <Link to='/signup'>Create Account</Link></p>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = { logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

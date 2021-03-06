import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Linkedin, Facebook, InformationOutline } from 'mdi-material-ui';
import LogInForm from '../login/LogInForm';
import Grid from '@material-ui/core/Grid';

import { logIn } from '../../action/login-action.js';
import { getPrefThunk } from '../../action/preferences-action.js';


import {styles} from '../../style/homeStyles.js';

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
    window.location = `https://www.facebook.com/v3.1/dialog/oauth?client_id=510060352775198&scope=email&redirect_uri=${process.env.API_URL}/oauth/facebook/code&state=123kl21jdo9u01je2l1ij2dlkaj0112`;
  }

  linkedInOAuth = () => {
    let linkedInURL = 'https://www.linkedin.com/oauth/v2/authorization';
    let options = {
      client_id: '86v36mks0tlhmk',
      redirect_uri: `${process.env.API_URL}/oauth/linkedIn/code`,
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
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <Fragment>
          <Grid
            className={this.props.classes.container}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="display1" className={this.props.classes.home}>chewsit</Typography>
            <p>
              <Button disabled variant="fab" mini color="secondary" className={this.props.classes.facebook} onClick={this.facebookOAuth}>
                <Facebook />
              </Button>
              <Button disabled variant="fab" mini color="secondary" className={this.props.classes.linkedIn} onClick={this.linkedInOAuth}>
                <Linkedin />
              </Button>
            </p>
            <LogInForm className={this.props.classes.login} />
            <p>Don't have an account?</p>
            <Link to='/signup' className={this.props.classes.link}>Create Account</Link>

            <Link to='/about' className={this.props.classes.about}>
              <Button >
                <InformationOutline />
                <Typography className={this.props.classes.listText} variant='body1'>About</Typography>
              </ Button>
            </Link>

          </Grid>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = { logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

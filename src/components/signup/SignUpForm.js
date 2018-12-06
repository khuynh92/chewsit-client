import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Linkedin, GooglePlus, Facebook } from 'mdi-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import Navbar from '../navbar/Navbar.js';


import { signUpThunk } from '../../action/signup-action.js';

import {styles} from '../../style/signUpFormStyles.js';

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    passwordError: false,
    noUsername: false,
    noEmail: false,
    notChecked: false,
  }

  handleChange = name => async event => {
    await this.setState({
      [name]: event.target.value,
    });
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.checked) {
      await this.setState({ notChecked: true });
    }
    if (!this.state.username) {
      await this.setState({ noUsername: true });
    }
    if (!this.state.email) {
      await this.setState({ noEmail: true });
    }
    if (!this.state.password) {
      await this.setState({ noPassword: true });
    }
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ passwordError: true });
    }

    if (this.state.password === this.state.passwordConfirm && this.state.username && this.state.password && this.state.email && !this.state.notChecked) {
      this.props.signUpThunk(this.state);
    }

  }

  componentDidMount() {
    document.title = 'Sign Up';
  }

  componentWillUnmount() {
    this.setState({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      checked: '',
    });
  }

  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked, notChecked: false }, () => {console.log(this.state)});
  };

  facebookOAuth = () => {
    window.location = `https://www.facebook.com/v3.1/dialog/oauth?client_id=510060352775198&scope=email&redirect_uri=${process.env.API_URL}/oauth/facebook/code&state=123kl21jdo9u01je2l1ij2dlkaj0112`;
  }

  googleOAuth = () => {
    let googleURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let options = {
      client_id: '123538572340-or8e9drlqqnlmkfupkcfh519d889dqo6.apps.googleusercontent.com',
      redirect_uri: `${process.env.API_URL}/oauth/google/code`,
      scope: 'email openid profile',
      prompt: 'consent',
      response_type: 'code',
    };
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
    const { classes } = this.props;

    if (this.props.user.isLoggedIn === 'new user') {
      return <Redirect to='/preferences' />;
    } else if (cookie.load('token')) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <Fragment>
          <Navbar />
          <Grid
            className={classes.grid}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >

            <h3>Create an account with: </h3>
            <p>
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

            <h3>or </h3>

            <form>
              <TextField
                fullWidth
                required
                id="username"
                label="username"
                error={this.props.user.signUpError || this.state.noUsername ? true : false}
                value={this.state.username}
                onChange={this.handleChange('username')}
                margin="normal"
                placeholder="username"
              />
              <br />
              <TextField
                fullWidth
                required
                id="email"
                label="email"
                error={this.props.user.signUpError || this.state.noEmail ? true : false}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                placeholder="email"
              />
              <br />
              <TextField
                fullWidth
                required
                id="password"
                label='password'
                error={this.state.noPassword ? true : false}
                value={this.state.password}
                onChange={this.handleChange('password')}
                type='password'
                margin="normal"
                placeholder="password"
              />
              <br />
              <TextField
                fullWidth
                required
                id="passwordConfirm"
                label='confirm password'
                error={this.state.passwordError || this.state.noPassword ? true : false}
                value={this.state.passwordConfirm}
                onChange={this.handleChange('passwordConfirm')}
                type='password'
                margin="normal"
                placeholder="confirm password"
              />
              <br />
              <div>
                <Checkbox
                  checked={this.state.checked}
                  onChange={this.handleChecked('checked')}
                  value="checked"
                  color="primary"
                  className={classes.checkbox}
                />
                <Typography className={!this.state.notChecked ? classes.consent : classes.noConsent} variant="body1">I acknowledge that I have read the <Link to='/privacypolicy' target="_blank"> privacy policy</Link> and consent the use of cookies.</Typography>
              </div>
              <Typography variant="body2" color="error">{this.props.user.signUpError ? 'Username/Email already taken' : ''}</Typography>
              <Typography variant="body2" color="error">{this.state.noUsername || this.state.noEmail || this.state.noPassword ? 'Please complete the form' : ''}</Typography>
              <br />
              <Button className={classes.button} size="small" variant="contained" onClick={this.handleSubmit}>Sign Up</Button>
            </form>

          </Grid>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { signUpThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUpForm));
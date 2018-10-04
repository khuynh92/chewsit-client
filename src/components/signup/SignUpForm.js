import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Navbar from '../navbar/Navbar.js';


import { signUpThunk } from '../../action/signup-action.js';

const styles = {
  button: {
    backgroundColor: '#52525B',
    color: '#ECEBE3',
  },
  grid: {
    marginTop: '15vh',
  },
};

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    passwordError: false,
    noUsername: false,
    noEmail: false,
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

    if (this.state.password === this.state.passwordConfirm && this.state.username && this.state.password && this.state.email) {
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
    });
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

            <h3>Create an account</h3>

            <form>
              <TextField
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
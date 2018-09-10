import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {signUpThunk} from '../../action/signup-action.js';

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    passwordError: false,
  }

  handleChange = name => async event => {
    await this.setState({
      [name]: event.target.value,
    });
    if(this.state.password !== this.state.passwordConfirm) {
      this.setState({passwordError: true });
    } else {
      this.setState({passwordError: false });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({passwordError: true });
    } else {
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
    if (this.props.isLoggedIn) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <Fragment>

          <h3>Create an account</h3>

          <form>
            <TextField
              id="username"
              label="username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
              placeholder="username"
            />
            <br />
            <TextField
              id="email"
              label="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              placeholder="email"
            />
            <br />
            <TextField
              id="password"
              label='password'
              value={this.state.password}
              onChange={this.handleChange('password')}
              type='password'
              margin="normal"
              placeholder="password"
            />
            <br />
            <TextField
              id="passwordConfirm"
              label='confirm password'
              error={this.state.passwordError ? true : false}
              value={this.state.passwordConfirm}
              onChange={this.handleChange('passwordConfirm')}
              type='password'
              margin="normal"
              placeholder="confirm password"
            />
            <br />
            <Button size="small" variant="contained" color="primary" onClick={this.handleSubmit}>Sign Up</Button>
          </form>

        </Fragment>

      );
    }
  }
}

const mapDispatchToProps = {signUpThunk};

export default connect()(SignUpForm);
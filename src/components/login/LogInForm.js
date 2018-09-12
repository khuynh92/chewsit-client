import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

import { logInThunk } from '../../action/login-action.js';

class LogInForm extends Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.logInThunk(this.state);
  }

  componentDidMount() {
    document.title = 'Log In';
  }

  componentWillUnmount() {
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <Fragment>
        <form >
          <TextField
            id="username"
            label="username"
            error={this.props.user.logInError ? true : false}
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin="normal"
            placeholder="username"
          />
          <br />
          <TextField
            id="password"
            label="password"
            type="password"
            error={this.props.user.logInError ? true : false}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            placeholder="password"
          />
          <br />
          {this.props.user.logInError ? <Typography variant='body2' color='error'>Invalid Username/Password</Typography> : null}
          <Button size="small" variant="contained" color="primary" onClick={this.handleSubmit}>Log In</Button>
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = { logInThunk };

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
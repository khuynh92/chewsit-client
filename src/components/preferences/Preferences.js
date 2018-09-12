import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import cookie from 'react-cookies';

import { logIn } from '../../action/login-action.js';
import { savePrefThunk, getPrefThunk } from '../../action/preferences-action.js';

import Vietnamese from './food/Vietnamese.js';
import Pizza from './food/Pizza.js';
import Chinese from './food/Chinese.js';

const styles = {
  checkBox: {
    padding: 60,
    marginRight: -50,
    marginLeft: 50,
  },
  button: {
    marginTop: 30,
  },
};

class Preferences extends Component {
  state = {
    vietnamese: false,
    pizza: false,
    chinese: false,
  }

  async componentDidMount() {
    document.title = 'Preferences';
    if (cookie.load('token')) {
      let user = JSON.parse(atob(cookie.load('token').split('.')[1]));

      await this.props.logIn(user.id);
      await this.props.getPrefThunk(user.id);

      let newState = {};
      this.props.user.preferences.forEach(preference => newState[preference] = true);
      this.setState({...this.state, ...newState});
    }
  }

  handleChange = event => {
    this.setState({ [event.target.value]: event.target.checked });
  };

  handleSubmit = () => {
    let preferences = Object.keys(this.state).filter(food => this.state[food]);

    let newPref = {
      id: this.props.user.id,
      preferences,
    };

    this.props.savePrefThunk(newPref);
  }

  render() {
    return (
      <Grid>
        <h1>preferences</h1>
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              className={this.props.classes.checkBox}
              icon={<Vietnamese />}
              checkedIcon={<Vietnamese checked='checked' />}
              value="vietnamese"
              onChange={this.handleChange}
              checked={this.state.vietnamese}
            />
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              className={this.props.classes.checkBox}
              icon={<Pizza />}
              checkedIcon={<Pizza checked='checked' />}
              value="pizza"
              onChange={this.handleChange}
              checked={this.state.pizza}
            />
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              className={this.props.classes.checkBox}
              icon={<Chinese />}
              checkedIcon={<Chinese checked='checked' />}
              value="chinese"
              onChange={this.handleChange}
              checked={this.state.chinese}
            />
          }
        />
        <br />
        <Button className={this.props.classes.button} variant='contained' onClick={this.handleSubmit}>save preferences</Button>
      </Grid>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { savePrefThunk, logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Preferences));
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import Navbar from '../navbar/Navbar.js';

const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    checkBoxContainer: {
      margin: 'auto',
    },
    checkBox: {
      margin: 20,
    },
    buttonPreSave: {
      width: 180,
      position: 'fixed',
      top: '78vh',
      backgroundColor: '#497890',
      color: '#ECEBE3',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#7baec6',
      },
    },
    buttonPostSave: {
      width: 180,
      position: 'fixed',
      top: '78vh',
      backgroundColor: '#ff411d',
      color: '#ECEBE3',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#ff411d',
      },
    },
    rest: {
      marginBottom: '35vh',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
  });
};

class Preferences extends Component {
  state = {
    vietnamese: false,
    pizza: false,
    chinese: false,
    prefSaved: false,
  }

  async componentDidMount() {
    document.title = 'Preferences';
    if (cookie.load('token')) {
      let user = JSON.parse(atob(cookie.load('token').split('.')[1]));

      await this.props.logIn(user.id);
      await this.props.getPrefThunk(user.id);

      let newState = {};
      this.props.user.preferences.forEach(preference => newState[preference] = true);
      this.setState({ ...this.state, ...newState });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.value]: event.target.checked });
  };

  handleSubmit = async () => {
    let preferences = Object.keys(this.state).filter(food => food !== 'prefSaved' && this.state[food]);

    let newPref = {
      id: this.props.user.id,
      preferences,
    };

    await this.props.savePrefThunk(newPref);

    this.setState({prefSaved: true},
      ()=>setTimeout(() => this.setState({prefSaved: false}), 3000)
    );

    

  }

  render() {
    if (cookie.load('token')) {
      return (
        <Fragment>
          <Navbar />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h1>preferences</h1>
            <Grid className={this.props.classes.rest}>
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
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
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
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
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Chinese />}
                    checkedIcon={<Chinese checked='checked' />}
                    value="chinese"
                    onChange={this.handleChange}
                    checked={this.state.chinese}
                  />
                }
              />
            </Grid>
            <Button className={!this.state.prefSaved ? this.props.classes.buttonPreSave : this.props.classes.buttonPostSave} variant='contained' onClick={this.handleSubmit}>{this.state.prefSaved ? 'saved' : 'save preferences'}</Button>
          </Grid>
        </Fragment>

      );
    } else {
      return <Redirect to='/' />;
    }
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { savePrefThunk, logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Preferences));
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import cookie from 'react-cookies';
import Dialog from '@material-ui/core/Dialog';

import { logIn } from '../../action/login-action.js';
import { savePrefThunk, getPrefThunk } from '../../action/preferences-action.js';

import Vietnamese from './food/Vietnamese.js';
import Pizza from './food/Pizza.js';
import Chinese from './food/Chinese.js';
import Bakery from './food/Bakery.js';
import Barbeque from './food/Barbeque.js';
import Brunch from './food/Brunch.js';
import Burgers from './food/Burgers.js';
import Cafe from './food/Cafe.js';
import Wings from './food/Wings.js';
import Indian from './food/Indian.js';
import Italian from './food/Italian.js';
import Japanese from './food/Japanese.js';
import Korean from './food/Korean.js';
import Mexican from './food/Mexican.js';
import Sandwich from './food/Sandwich.js';
import Seafood from './food/Seafood.js';
import Soulfood from './food/Soulfood.js';
import Steakhouse from './food/Steakhouse.js';
import Sushi from './food/Sushi.js';
import Thai from './food/Thai.js';
import Glutenfree from './food/Glutenfree.js';




import Navbar from '../navbar/Navbar.js';

import {styles} from '../../style/preferencesStyles.js';

class Preferences extends Component {
  state = {
    vietnamese: false,
    pizza: false,
    chinese: false,
    bakeries: false,
    bbq: false,
    burgers: false,
    breakfast_brunch: false,
    cafes: false,
    chicken_wings: false,
    indpak: false,
    italian: false,
    japanese: false,
    korean: false,
    mexican: false,
    sandwiches: false,
    seafood: false,
    soulfood: false,
    steak: false,
    sushi: false,
    thai: false,
    vegetarian: false,
    gluten_free: false,

    prefSaved: false,
    openDialog: false,
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
    let preferences = Object.keys(this.state).filter(food => food !== 'prefSaved' && food !== 'openDialog' && this.state[food]);

    let newPref = {
      id: this.props.user.id,
      favorites: this.props.user.favorites,
      preferences,
    };

    await this.props.savePrefThunk(newPref);

    this.setState({ prefSaved: true },
      () => setTimeout(() => this.setState({ prefSaved: false, openDialog: true }), 500)
    );
  }

  handleClose = () => {
    this.setState({ openDialog: false });
  };

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
            <Typography className={this.props.classes.title} variant='display1'>preferences</Typography>
            <Grid className={this.props.classes.rest}>
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Bakery />}
                    checkedIcon={<Bakery checked='checked' />}
                    value="bakeries"
                    onChange={this.handleChange}
                    checked={this.state.bakeries}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Barbeque />}
                    checkedIcon={<Barbeque checked='checked' />}
                    value="bbq"
                    onChange={this.handleChange}
                    checked={this.state.bbq}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Brunch />}
                    checkedIcon={<Brunch checked='checked' />}
                    value="breakfast_brunch"
                    onChange={this.handleChange}
                    checked={this.state.breakfast_brunch}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Burgers />}
                    checkedIcon={<Burgers checked='checked' />}
                    value="burgers"
                    onChange={this.handleChange}
                    checked={this.state.burgers}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Cafe />}
                    checkedIcon={<Cafe checked='checked' />}
                    value="cafes"
                    onChange={this.handleChange}
                    checked={this.state.cafes}
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
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Glutenfree />}
                    checkedIcon={<Glutenfree checked='checked' />}
                    value="gluten_free"
                    onChange={this.handleChange}
                    checked={this.state.gluten_free}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Indian />}
                    checkedIcon={<Indian checked='checked' />}
                    value="indpak"
                    onChange={this.handleChange}
                    checked={this.state.indpak}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Italian />}
                    checkedIcon={<Italian checked='checked' />}
                    value="italian"
                    onChange={this.handleChange}
                    checked={this.state.italian}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Japanese />}
                    checkedIcon={<Japanese checked='checked' />}
                    value="japanese"
                    onChange={this.handleChange}
                    checked={this.state.japanese}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Korean />}
                    checkedIcon={<Korean checked='checked' />}
                    value="korean"
                    onChange={this.handleChange}
                    checked={this.state.korean}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Mexican />}
                    checkedIcon={<Mexican checked='checked' />}
                    value="mexican"
                    onChange={this.handleChange}
                    checked={this.state.mexican}
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
                    icon={<Sandwich />}
                    checkedIcon={<Sandwich checked='checked' />}
                    value="sandwiches"
                    onChange={this.handleChange}
                    checked={this.state.sandwiches}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Seafood />}
                    checkedIcon={<Seafood checked='checked' />}
                    value="seafood"
                    onChange={this.handleChange}
                    checked={this.state.seafood}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Soulfood />}
                    checkedIcon={<Soulfood checked='checked' />}
                    value="soulfood"
                    onChange={this.handleChange}
                    checked={this.state.soulfood}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Steakhouse />}
                    checkedIcon={<Steakhouse checked='checked' />}
                    value="steak"
                    onChange={this.handleChange}
                    checked={this.state.steak}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Sushi />}
                    checkedIcon={<Sushi checked='checked' />}
                    value="sushi"
                    onChange={this.handleChange}
                    checked={this.state.sushi}
                  />
                }
              />
              <FormControlLabel
                className={this.props.classes.checkBoxContainer}
                control={
                  <Checkbox
                    disableRipple
                    className={this.props.classes.checkBox}
                    icon={<Thai />}
                    checkedIcon={<Thai checked='checked' />}
                    value="thai"
                    onChange={this.handleChange}
                    checked={this.state.thai}
                  />
                }
              />
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
                    icon={<Wings />}
                    checkedIcon={<Wings checked='checked' />}
                    value="chicken_wings"
                    onChange={this.handleChange}
                    checked={this.state.chicken_wings}
                  />
                }
              />
            </Grid>
            <Button className={!this.state.prefSaved ? this.props.classes.buttonPreSave : this.props.classes.buttonPostSave} variant='contained' onClick={this.handleSubmit}>{this.state.prefSaved ? 'saved' : 'save preferences'}</Button>
            <SimpleDialogWrapped
              open={this.state.openDialog}
              onClose={this.handleClose}
            />
          </Grid>
        </Fragment>

      );
    } else {
      return <Redirect to='/' />;
    }
  }
}

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <Link to='/dashboard' style={{ textDecoration: 'none' }}>
          <Button className={classes.redirectButton} variant='contained'>chewsit</Button>
        </Link>
      </Dialog>
    );
  }
}

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);


const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { savePrefThunk, logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Preferences));
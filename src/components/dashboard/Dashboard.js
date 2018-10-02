import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Navbar from '../navbar/Navbar.js';


import { getPrefThunk } from '../../action/preferences-action.js';
import { logIn, saveLocation } from '../../action/login-action.js';
import { fetchAllResultsThunk } from '../../action/results-action.js';

const styles = {
  button: {
    marginRight: 0,
  },
  locationFetch: {
    marginTop: -30,
    marginLeft: -5,
  },
  submitLoading: {
    marginTop: -30,
    marginLeft: -5,
  },
  buttonLeftMargin: {
    marginLeft: 10,
  },
};

class Dashboard extends Component {

  state = {
    price: '',
    mealType: '',
    distance: '',
    location: '',
    locationFetchText: '',
    locationFetch: false,
    submitLoading: false,
    priceError: false,
    mealTypeError: false,
    distanceError: false,
    locationError: false,
  }

  changePrice = (e) => {
    this.setState({ price: e.target.textContent, priceError: false });
  }

  changeMealType = (e) => {
    this.setState({ mealType: e.target.textContent.toLowerCase(), mealTypeError: false });

  }

  changeDistance = (e) => {
    this.setState({ distance: e.target.value, distanceError: false });

  }

  getLocation = async () => {
    await this.setState({ locationFetchText: 'Getting location...', locationFetch: true });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        location.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.props.saveLocation(location.pos);
        this.setState({ location: location.pos, locationFetchText: 'Location received!', locationFetch: false, locationError: false });
      });
    }
  };

  submit = async () => {
    if (this.state.location && this.state.distance && this.state.mealType && this.state.price) {
      await this.setState({ submitLoading: true });
      let location = this.state.location.lat ? `latitude=${this.state.location.lat}&&longitude=${this.state.location.lng}` : location;
      let prefStr = this.props.user.preferences.length ? this.props.user.preferences.join(',') : 'restaurant';
      let food = this.state.mealType === 'desserts' || this.state.mealType === 'breakfast' ? this.state.mealType : prefStr;

      await this.props.fetchAllResultsThunk(food, location, this.state.price.length, this.state.distance);

      this.props.history.push('/results');

    } else {
      if (!this.state.location) {
        this.setState({ locationError: 'secondary' });
      }
      if (!this.state.mealType) {
        this.setState({ mealTypeError: 'secondary' });
      }
      if (!this.state.distance) {
        this.setState({ distanceError: true });
      }
      if (!this.state.price) {
        this.setState({ priceError: 'secondary' });
      }
    }

  }

  render() {
    if (this.props.user.isLoggedIn) {
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
            <h1>Dashboard</h1>

            <Button disabled={this.state.locationFetch} onClick={this.getLocation} id='location' className={this.props.classes.button} variant='contained' color={this.state.locationError ? this.state.locationError : 'primary'}>use location</Button>
            {this.state.locationFetch && <CircularProgress size={24} thickness={5} className={this.props.classes.locationFetch} />}
            <Typography variant='body1'>{this.state.locationFetchText}</Typography>

            <br />
            <br />

            <FormControl>
              <InputLabel error={this.state.distanceError} htmlFor="distance-native-helper">Distance</InputLabel>
              <NativeSelect error={this.state.distanceError} onChange={this.changeDistance} value={this.state.distance} input={<Input name="distance" id="distance-native-helper" />}>
                <option value="" />
                <option value={805}>½ mile</option>
                <option value={1610}>1 mile</option>
                <option value={8045}>5 miles</option>
                <option value={16094}>10 miles</option>
                <option value={32186}>20 miles</option>
              </NativeSelect>
            </FormControl>

            <br />
            <br />
            <Grid>
              <Button onClick={this.changePrice} id='$' className={this.props.classes.button} variant={this.state.price === '$' ? 'contained' : 'outlined'} color={this.state.priceError ? this.state.priceError : 'primary'}>$</Button>

              <Button onClick={this.changePrice} id='$$' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$' ? 'contained' : 'outlined'} color={this.state.priceError ? this.state.priceError : 'primary'}>$$</Button>

              <Button onClick={this.changePrice} id='$$$' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$$' ? 'contained' : 'outlined'} color={this.state.priceError ? this.state.priceError : 'primary'}>$$$</Button>

              <Button onClick={this.changePrice} id='$$$$' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$$$' ? 'contained' : 'outlined'} color={this.state.priceError ? this.state.priceError : 'primary'}>$$$$</Button>
            </Grid>
            <br />
            <br />

            <Grid>
              <Button onClick={this.changeMealType} id='breakfast' className={this.props.classes.button} variant={this.state.mealType === 'breakfast' ? 'contained' : 'outlined'} color={this.state.mealTypeError ? this.state.mealTypeError : 'primary'}>Breakfast</Button>

              <Button onClick={this.changeMealType} id='lunch' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.mealType === 'lunch' ? 'contained' : 'outlined'} color={this.state.mealTypeError ? this.state.mealTypeError : 'primary'}>Lunch</Button>

              <Button onClick={this.changeMealType} id='dinner' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.mealType === 'dinner' ? 'contained' : 'outlined'} color={this.state.mealTypeError ? this.state.mealTypeError : 'primary'}>Dinner</Button>

              <Button onClick={this.changeMealType} id='desserts' className={[this.props.classes.button, this.props.classes.buttonLeftMargin].join(' ')} variant={this.state.mealType === 'desserts' ? 'contained' : 'outlined'} color={this.state.mealTypeError ? this.state.mealTypeError : 'primary'}>Desserts</Button>
            </Grid>
            <br />
            <br />

            <Button onClick={this.submit} size="small" variant="contained" color="primary" disabled={this.state.submitLoading}>chewsit</Button>
            {this.state.submitLoading && <CircularProgress size={24} thickness={5} className={this.props.classes.submitLoading} />}

            <br />
            <br />

          </Grid>
        </Fragment>
      );
    } else {
      return <Redirect push to='/' />;
    }
  }
}


const mapStateToProps = (state) => ({ state, user: state.user });

const mapDispatchToProps = { logIn, getPrefThunk, fetchAllResultsThunk, saveLocation };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));

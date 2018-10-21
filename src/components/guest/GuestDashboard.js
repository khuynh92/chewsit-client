/*global google*/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { TextField, withStyles, Button, NativeSelect, InputLabel, FormControl, Input, Typography, CircularProgress, Grid, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Navbar from '../navbar/Navbar.js';

import { logIn, saveLocation } from '../../action/login-action.js';
import { fetchAllResultsThunk, saveDashboard } from '../../action/results-action.js';


const styles = {
  button: {
    minWidth: 70.5,
    marginTop: 0,
    marginRight: 0,
    borderColor: '#497890',
    color: '#497890',
  },
  buttonSelected: {
    minWidth: 70.5,
    marginTop: 0,
    marginRight: 0,
    backgroundColor: '#497890',
    color: '#ECEBE3',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  buttonErr: {
    minWidth: 70.5,
    marginRight: 0,
    borderColor: '#C44632',
    color: '#C44632',
  },
  mealButton: {
    width: 313,
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 0,
    borderColor: '#497890',
    color: '#497890',
  },
  mealButtonSelected: {
    width: 313,
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 0,
    backgroundColor: '#497890',
    color: '#ECEBE3',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  mealButtonErr: {
    width: 313,
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 0,
    borderColor: '#C44632',
    color: '#C44632',
  },
  locationButton: {
    marginTop: '5vh',
    marginBottom: 0,
    color: '#ECEBE3',
    backgroundColor: '#497890',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  enterLocationButton: {
    marginTop: '5vh',
    marginBottom: 0,
    color: '#ECEBE3',
    backgroundColor: '#497890',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  getLocationButtonErr: {
    marginTop: '5vh',
    marginBottom: 0,
    color: '#ECEBE3',
    backgroundColor: '#C44632',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  locationButtonErr: {
    marginTop: '5vh',
    marginBottom: 0,
    color: '#ECEBE3',
    backgroundColor: '#C44632',
    '&:hover': {
      backgroundColor: '#7baec6',
    },
  },
  locationFetch: {
    marginTop: -50,
    marginLeft: -5,
    marginBottom: 25,
    color: '#ff411d',
  },
  submitLoading: {
    marginTop: -36,
    marginLeft: -5,
    color: '#ff411d',
  },
  buttonLeftMargin: {
    marginLeft: 10,
  },
  submitButton: {
    width: 200,
    height: 50,
    color: '#ECEBE3',
    backgroundColor: '#D36F75',
    transition: '300ms',
    '&:hover': {
      backgroundColor: '#ea989d',
    },
  },
  mealContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  multiFormControl: {
    marginTop: -30,
  },
  navbar: {
    position: 'fixed',
  },
  errorMessage: {
    color: '#ff411d',
    marginBottom: 2,
  },
  snackbar: {
    background: '#9DA6AF',
  },
  or: {
    marginLeft: 5,
    marginRight: 5,
    paddingTop: '6vh',
  },
  locationDiv: {
    display: 'flex',
  },
  formDiv: {
    marginTop: 5,
    width: 313,
  },
};

class Dashboard extends Component {

  state = {
    price: this.props.dashboard.price,
    mealType: this.props.dashboard.mealType,
    distance: this.props.dashboard.distance,
    location: '',
    locationFetchText: '',
    locationFetch: false,
    submitLoading: false,
    priceError: false,
    mealTypeError: false,
    distanceError: false,
    locationError: false,
    getLocationError: false,
    openSnackbar: false,
    useLocation: true,
    enterLocation: true,
    showLocationForm: false,
    locationForm: '',
    emptyLocationForm: false,
  };

  handleChange = name => async event => {
    await this.setState({
      [name]: event.target.value,
    });
  };

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

    await this.setState({ locationFetchText: 'Getting location...', locationFetch: true, enterLocation: false });

    setTimeout(() => {
      this.setState({ openSnackbar: true });
    }, 5000);

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

  showLocationForm = async () => {
    await this.setState({ useLocation: false, showLocationForm: true, enterLocation: false });
  }

  submit = async () => {

    this.props.saveDashboard({
      price: this.state.price,
      mealType: this.state.mealType,
      distance: this.state.distance,
      location: this.state.location,
    });

    if (this.state.locationForm) {
      if ((this.state.location || this.state.locationForm) && this.state.distance && this.state.mealType && this.state.price) {
        superagent.get(`${process.env.API_URL}/api/v1/google/${this.state.locationForm}`)
          .then(response => {
            if (response.text === 'Could not fetch location') {
              throw response.text;
            }
            return response.body;
          })
          .then(async latlng => {
            let { lat } = latlng;
            let { lng } = latlng;
            this.props.saveLocation({ lat, lng });
            await this.setState({ location: { lat, lng } });

            await this.setState({ submitLoading: true });
            let location = this.state.location.lat ? `latitude=${this.state.location.lat}&&longitude=${this.state.location.lng}` : location;
            let food = this.state.mealType === 'desserts' || this.state.mealType === 'breakfast' ? this.state.mealType : 'restaurants';

            await this.props.fetchAllResultsThunk(food, location, this.state.price.length, this.state.distance);

            this.props.history.push('guest/results');
          })
          .catch(err => {
            alert(err);
          });
      } else {
        if (!this.state.locationForm) {
          this.setState({ locationError: 'secondary', emptyLocationForm: true });
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
    } else {

      if ((this.state.location || this.state.locationForm) && this.state.distance && this.state.mealType && this.state.price) {
        await this.setState({ submitLoading: true });
        let location = this.state.location.lat ? `latitude=${this.state.location.lat}&&longitude=${this.state.location.lng}` : location;
        let food = this.state.mealType === 'desserts' || this.state.mealType === 'breakfast' ? this.state.mealType : 'restaurants';

        await this.props.fetchAllResultsThunk(food, location, this.state.price.length, this.state.distance);

        this.props.history.push('/guest/results');

      } else {
        if (!this.state.location) {
          this.setState({ locationError: 'secondary', getLocationError: 'secondary', emptyLocationForm: true });
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
  }

  snackbarClose = () => {
    this.setState({ openSnackbar: false });
  }


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Navbar className={classes.navbar} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <div className={this.state.showLocationForm ? classes.formDiv : classes.locationDiv}>
            {this.state.useLocation && <Button disabled={this.state.locationFetch} onClick={this.getLocation} id='location' className={this.state.locationError ? classes.locationButtonErr : classes.locationButton} variant='contained'>use location</Button>}

            {(this.state.enterLocation && this.state.useLocation) && <span className={classes.or}>or</span>}

            {this.state.enterLocation && <Button onClick={this.showLocationForm} className={this.state.getLocationError ? classes.getLocationButtonErr : classes.enterLocationButton}>Enter Location</Button>}

            {this.state.showLocationForm && <TextField
              error={this.state.emptyLocationForm}
              fullWidth
              required
              id="locationForm"
              label="Enter Location"
              value={this.state.locationForm}
              onChange={this.handleChange('locationForm')}
              margin="normal"
              placeholder="username"
            />}

          </div>
          <Typography variant='body1'>{this.state.locationFetchText}</Typography>
          {this.state.locationFetch && <CircularProgress size={24} thickness={5} className={classes.locationFetch} />}
          <br />
          <br />

          <FormControl className={classes.multiFormControl}>
            <InputLabel error={this.state.distanceError} htmlFor="distance-native-helper">Distance</InputLabel>
            <NativeSelect error={this.state.distanceError} onChange={this.changeDistance} value={this.state.distance} input={<Input name="distance" id="distance-native-helper" />}>
              <option value="" />
              <option value={400}>¼	mile</option>
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
            <Button onClick={this.changePrice} id='$' className={this.state.priceError ? classes.buttonErr : (this.state.price === '$' ? classes.buttonSelected : classes.button)} variant={this.state.price === '$' ? 'contained' : 'outlined'} >$</Button>

            <Button onClick={this.changePrice} id='$$' className={[this.state.priceError ? classes.buttonErr : (this.state.price === '$$' ? classes.buttonSelected : classes.button), classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$' ? 'contained' : 'outlined'} >$$</Button>

            <Button onClick={this.changePrice} id='$$$' className={[this.state.priceError ? classes.buttonErr : (this.state.price === '$$$' ? classes.buttonSelected : classes.button), classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$$' ? 'contained' : 'outlined'} >$$$</Button>

            <Button onClick={this.changePrice} id='$$$$' className={[this.state.priceError ? classes.buttonErr : (this.state.price === '$$$$' ? classes.buttonSelected : classes.button), classes.buttonLeftMargin].join(' ')} variant={this.state.price === '$$$$' ? 'contained' : 'outlined'} >$$$$</Button>
          </Grid>


          <Grid className={classes.mealContainer}>
            <Button onClick={this.changeMealType} id='breakfast' className={this.state.mealTypeError ? classes.mealButtonErr : (this.state.mealType === 'breakfast' ? classes.mealButtonSelected : classes.mealButton)} variant={this.state.mealType === 'breakfast' ? 'contained' : 'outlined'}>Breakfast</Button>

            <Button onClick={this.changeMealType} id='lunch' className={this.state.mealTypeError ? classes.mealButtonErr : (this.state.mealType === 'lunch' ? classes.mealButtonSelected : classes.mealButton)} variant={this.state.mealType === 'lunch' ? 'contained' : 'outlined'}>Lunch</Button>

            <Button onClick={this.changeMealType} id='dinner' className={this.state.mealTypeError ? classes.mealButtonErr : (this.state.mealType === 'dinner' ? classes.mealButtonSelected : classes.mealButton)} variant={this.state.mealType === 'dinner' ? 'contained' : 'outlined'}>Dinner</Button>

            <Button onClick={this.changeMealType} id='desserts' className={this.state.mealTypeError ? classes.mealButtonErr : (this.state.mealType === 'desserts' ? classes.mealButtonSelected : classes.mealButton)} variant={this.state.mealType === 'desserts' ? 'contained' : 'outlined'}>Desserts</Button>
          </Grid>
          <br />
          {(this.state.mealTypeError || this.state.distanceError || this.state.priceError || this.state.locationError) && <Typography variant='body1' className={classes.errorMessage}>Please complete all fields</Typography>}

          <Button className={classes.submitButton} onClick={this.submit} size="small" variant="contained" color="primary" disabled={this.state.submitLoading}>chewsit</Button>

          {this.state.submitLoading && <CircularProgress size={24} thickness={5} className={classes.submitLoading} />}

        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.locationFetch && this.state.openSnackbar}
          onClose={this.snackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            classes: {
              root: classes.snackbar,
            },
          }}
          message={<span id="message-id">if 'USE LOCATION' is still spinning, reload the page over 'https'</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.snackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ state, user: state.user, dashboard: state.resultsState.dashboard });

const mapDispatchToProps = { logIn, fetchAllResultsThunk, saveLocation, saveDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
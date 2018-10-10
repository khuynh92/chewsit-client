//#ff411d red

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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Navbar from '../navbar/Navbar.js';


import { getPrefThunk } from '../../action/preferences-action.js';
import { logIn, saveLocation } from '../../action/login-action.js';
import { fetchAllResultsThunk } from '../../action/results-action.js';

const styles = {
  button: {
    marginTop: 0,
    marginRight: 0,
    borderColor: '#497890',
    color: '#497890',
  },
  buttonSelected: {
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
    marginRight: 0,
    borderColor: '#C44632',
    color: '#C44632',
  },
  mealButton: {
    width: 290,
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 0,
    borderColor: '#497890',
    color: '#497890',
  },
  mealButtonSelected: {
    width: 290,
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
    width: 290,
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
  locationButtonErr: {
    marginTop: '5vh',
    marginBottom: 0,
    color: '#ECEBE3',
    backgroundColor: '#C44632',
  },
  locationFetch: {
    marginTop: -30,
    marginLeft: -5,
    marginBottom: 5,
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
    openSnackbar: false,
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

  submit = async () => {
    if (this.state.location && this.state.distance && this.state.mealType && this.state.price) {
      await this.setState({ submitLoading: true });
      let location = this.state.location.lat ? `latitude=${this.state.location.lat}&&longitude=${this.state.location.lng}` : location;
      let prefStr = this.props.user.preferences.length ? this.props.user.preferences.join(',') : 'restaurants';
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

  snackbarClose = () => {
    this.setState({ openSnackbar: false });
  }


  render() {
    const { classes } = this.props;

    if (this.props.user.isLoggedIn) {
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
            <Button disabled={this.state.locationFetch} onClick={this.getLocation} id='location' className={this.state.locationError ? classes.locationButtonErr : classes.locationButton} variant='contained'>use location</Button>
            {this.state.locationFetch && <CircularProgress size={24} thickness={5} className={classes.locationFetch} />}
            <Typography variant='body1'>{this.state.locationFetchText}</Typography>

            <br />
            <br />

            <FormControl className={classes.multiFormControl}>
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
    } else {
      return <Redirect to='/' />;
    }
  }
}

const mapStateToProps = (state) => ({ state, user: state.user });

const mapDispatchToProps = { logIn, getPrefThunk, fetchAllResultsThunk, saveLocation };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));

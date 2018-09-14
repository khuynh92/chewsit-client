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

import { getPrefThunk } from '../../action/preferences-action.js';
import { logOutThunk, logIn } from '../../action/login-action.js';

const styles = {
  button: {
    marginRight: 20,
  },
};

class Dashboard extends Component {

  state = {
    price: '',
    mealType: '',
    distance: '',
    location: '',
    locationFetch: '',
  }

  changePrice = (e) => {
    this.setState({ price: e.target.textContent });
  }

  changeMealType = (e) => {
    this.setState({ mealType: e.target.textContent.toLowerCase() });

  }

  changeDistance = (e) => {
    this.setState({ distance: e.target.value });

  }

  getLocation = async () => {
    await this.setState({locationFetch: 'Getting location...'});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>   {
        location.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(location.pos.lat + ', ' + location.pos.lng);
        this.setState({ location: location.pos, locationFetch: 'Location received!' });
      });
    }
  };

  submit = () => {
    let completeForm = {
      price: this.state.price.length,
      mealType: this.state.mealType,
      distance: this.state.distance,
      location: this.state.location,
    };

    console.log(completeForm);
  }

  render() {
    if (this.props.user.isLoggedIn) {
      return (
        <Fragment>
          <h1>Dashboard</h1>
          <Button onClick={this.getLocation} id='location' className={this.props.classes.button} variant='contained' color='primary'>use location</Button>
          <Typography variant='body1'>{this.state.locationFetch}</Typography>
          
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="distance-native-helper">Distance</InputLabel>
            <NativeSelect onChange={this.changeDistance} value={this.state.distance} input={<Input name="distance" id="distance-native-helper" />}>
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

          <Button onClick={this.changePrice} id='$' className={this.props.classes.button} variant={this.state.price === '$' ? 'contained' : 'outlined'} color='primary'>$</Button>
          <Button onClick={this.changePrice} id='$$' className={this.props.classes.button} variant={this.state.price === '$$' ? 'contained' : 'outlined'} color='primary'>$$</Button>
          <Button onClick={this.changePrice} id='$$$' className={this.props.classes.button} variant={this.state.price === '$$$' ? 'contained' : 'outlined'} color='primary'>$$$</Button>
          <Button onClick={this.changePrice} id='$$$$' className={this.props.classes.button} variant={this.state.price === '$$$$' ? 'contained' : 'outlined'} color='primary'>$$$$</Button>

          <br />
          <br />
          <Button onClick={this.changeMealType} id='breakfast' className={this.props.classes.button} variant={this.state.mealType === 'breakfast' ? 'contained' : 'outlined'} color='primary'>Breakfast</Button>
          <Button onClick={this.changeMealType} id='lunch' className={this.props.classes.button} variant={this.state.mealType === 'lunch' ? 'contained' : 'outlined'} color='primary'>Lunch</Button>
          <Button onClick={this.changeMealType} id='dinner' className={this.props.classes.button} variant={this.state.mealType === 'dinner' ? 'contained' : 'outlined'} color='primary'>Dinner</Button>
          <Button onClick={this.changeMealType} id='dessert' className={this.props.classes.button} variant={this.state.mealType === 'dessert' ? 'contained' : 'outlined'} color='primary'>Dessert</Button>
          <br />
          <br />
          <Button onClick={this.submit} size="small" variant="contained" color="primary">chewsit</Button>
          <br />
          <br />
          <Button onClick={this.props.logOutThunk} size="small" variant="contained" color="secondary">Log Out</Button>
        </Fragment>
      );
    } else {
      return <Redirect to='/' />;
    }
  }
}


const mapStateToProps = (state) => ({ state, user: state.user });

const mapDispatchToProps = { logOutThunk, logIn, getPrefThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));

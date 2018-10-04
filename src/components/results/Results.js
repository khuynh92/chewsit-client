
/*global google*/

import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';

import {ChevronRight, ChevronLeft} from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Restaurant from './Restaurant.js';
import RestInfo from './RestInfo.js';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Navbar from '../navbar/Navbar.js';

const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    container: {
      marginTop: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '75%',
      height: '75vh',
      justifyContent: 'center',
    },
    results: {
      width: '100%',
    },
    map: {
      width: '100%',
    },
    back: {
      marginLeft: '-9vw',
      position: 'fixed',
      cursor: 'pointer',
    },
    forward: {
      marginLeft: '78vw',
      position: 'fixed',
      cursor: 'pointer',
    },
    redArrow: {
      fontSize: 53,
      color: '#ff411d',
    },
    blackArrow: {
      fontSize: 53,
      color: '#9DA6AF',
    },
  });
};


class Results extends Component {

  state = {
    index: 0,
    restImg: '',
    restName: '',
    restDisplayPhone: '',
    restDistance: '',
    restType: '',
    restNum: '',
    restAddress: [],
    restRating: '',
    restReviewCount: '',
    restWebsite: '',
    restLat: 47.6205,
    restLng: -122.3493,
    endOfResults: false,
    beginningOfResults: true,
  };

  async componentDidMount() {
    if (this.props.resultsState.allResults && this.props.resultsState.allResults.length) {
      await this.setState({
        restImg: this.props.resultsState.allResults[0].image_url,
        restName: this.props.resultsState.allResults[0].name,
        restDistance: (this.props.resultsState.allResults[0].distance / 1609.344).toFixed(2) + ' miles away',
        restType: this.props.resultsState.allResults[0].categories.map(category => category.title).join(', '),
        restDisplayPhone: this.props.resultsState.allResults[0].display_phone,
        restNum: this.props.resultsState.allResults[0].phone,
        restAddress: this.props.resultsState.allResults[0].location.display_address,
        restRating: this.props.resultsState.allResults[0].rating,
        restReviewCount: this.props.resultsState.allResults[0].review_count,
        restLat: this.props.resultsState.allResults[0].coordinates.latitude,
        restLng: this.props.resultsState.allResults[0].coordinates.longitude,
        restWebsite: this.props.resultsState.allResults[0].url,
      });

      // const DirectionsService = new google.maps.DirectionsService();
      // DirectionsService.route({
      //   origin: new google.maps.LatLng(this.props.user.location.lat, this.props.user.location.lng),
      //   destination: new google.maps.LatLng(this.state.restLat, this.state.restLng),
      //   travelMode: google.maps.TravelMode.DRIVING,
      // }, (result, status) => {
      //   if (status === google.maps.DirectionsStatus.OK) {
      //     console.log(result);
      //     this.setState({
      //       directions: result,
      //     });
      //   } else {
      //     console.error(`error fetching directions ${result}`);
      //   }
      // });
    }
  }

  nextRestaurant = async () => {
    if (this.state.index < this.props.resultsState.allResults.length) {
      await this.setState({index: this.state.index+1});

      await this.setState({
        restImg: this.props.resultsState.allResults[this.state.index].image_url,
        restName: this.props.resultsState.allResults[this.state.index].name,
        restDistance: (this.props.resultsState.allResults[this.state.index].distance / 1609.344).toFixed(2) + ' miles away',
        restType: this.props.resultsState.allResults[this.state.index].categories.map(category => category.title).join(', '),
        restDisplayPhone: this.props.resultsState.allResults[this.state.index].display_phone,
        restNum: this.props.resultsState.allResults[this.state.index].phone,
        restAddress: this.props.resultsState.allResults[this.state.index].location.display_address,
        restRating: this.props.resultsState.allResults[this.state.index].rating,
        restReviewCount: this.props.resultsState.allResults[this.state.index].review_count,
        restWebsite: this.props.resultsState.allResults[this.state.index].url,
        restLat: this.props.resultsState.allResults[this.state.index].coordinates.latitude,
        restLng: this.props.resultsState.allResults[this.state.index].coordinates.longitude,
        beginningOfResults: false,
      });

      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.user.location.lat, this.props.user.location.lng),
        destination: new google.maps.LatLng(this.state.restLat, this.state.restLng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            newDirections: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    } else {
      this.setState({ endOfResults: true });
    }
  }

  prevRestaurant = async () => {
    if (this.state.index > 0) {
      await this.setState({index: this.state.index-1});

      this.setState({
        index: this.state.index - 1,
        restImg: this.props.resultsState.allResults[this.state.index].image_url,
        restName: this.props.resultsState.allResults[this.state.index].name,
        restDistance: (this.props.resultsState.allResults[this.state.index].distance / 1609.344).toFixed(2) + ' miles away',
        restType: this.props.resultsState.allResults[this.state.index].categories.map(category => category.title).join(', '),
        restDisplayPhone: this.props.resultsState.allResults[this.state.index].display_phone,
        restNum: this.props.resultsState.allResults[this.state.index].phone,
        restAddress: this.props.resultsState.allResults[this.state.index].location.display_address,
        restRating: this.props.resultsState.allResults[this.state.index].rating,
        restReviewCount: this.props.resultsState.allResults[this.state.index].review_count,
        restWebsite: this.props.resultsState.allResults[this.state.index].url,
        restLat: this.props.resultsState.allResults[this.state.index].coordinates.latitude,
        restLng: this.props.resultsState.allResults[this.state.index].coordinates.longitude,
        endOfResults: false,
      });
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.user.location.lat, this.props.user.location.lng),
        destination: new google.maps.LatLng(this.state.restLat, this.state.restLng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            newDirections: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    } else {
      this.setState({ beginningOfResults: true });
    }
  }

  render() {
    if (!this.props.resultsState.allResults || !this.props.resultsState.allResults.length) {
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
            <Typography variant='display1'>No Results found</Typography>
          </Grid>
        </Fragment>

      );
    } else {
      return (
        <Fragment>
          <Navbar />
          <Grid
            className={this.props.classes.container}
          // container
          // spacing={0}
          // direction="column"
          // alignItems="center"
          // justify="center"
          > 
            <Button className={this.props.classes.back} onClick={this.prevRestaurant}><ChevronLeft className={this.state.beginningOfResults ? this.props.classes.blackArrow: this.props.classes.redArrow}/></Button>
            
            <Button className={this.props.classes.forward} onClick={(this.nextRestaurant)}><ChevronRight className={this.state.endOfResults ? this.props.classes.blackArrow: this.props.classes.redArrow}/></Button>
            

            <div className={this.props.classes.results}>
              <RestInfo restaurant={this.state}/>
              <Restaurant image={this.state.restImg} />
            </div>
            <div className={this.props.classes.map}>
              <MapWithADirectionsRenderer name={this.state.restName} newDirections={this.state.newDirections} lat={this.state.restLat} lng={this.state.restLng}/>
            </div>
          </Grid>
        </Fragment>
      );
    }
  }
}


const mapStateToProps = state => ({ user: state.user, resultsState: state.resultsState });

export default connect(mapStateToProps, null)(withStyles(styles)(Results));

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <Card style={{ height: `40vh`, width: '100%',  marginRight: '2%' }} />,
    mapElement: <div style={{ height: `100%`, width: '100%', marginRight: 0 }} />,
  }),
  withStateHandlers(() => ({
    marker1isOpen: false,
    marker2isOpen: false,
  }), {
      marker1onToggle: ({ marker1isOpen }) => () => ({
        marker1isOpen: !marker1isOpen,
      }),
      marker2onToggle: ({ marker2isOpen }) => () => ({
        marker2isOpen: !marker2isOpen,
      }),
    }),
  withScriptjs,
  withGoogleMap,
  connect(mapStateToProps, null),
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.user.location.lat, this.props.user.location.lng),
        destination: new google.maps.LatLng(this.props.resultsState.allResults[0].coordinates.latitude, this.props.resultsState.allResults[0].coordinates.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
  })
)(props =>
  <GoogleMap
    defaultCenter={new google.maps.LatLng(props.user.location.lat, props.user.location.lng)}
  >
    {props.directions && <DirectionsRenderer options={{ suppressMarkers: true }} directions={!props.newDirections ? props.directions : props.newDirections} />}
    <Marker
      label='you'
      position={{ lat: props.user.location.lat, lng: props.user.location.lng }}
      onClick={(props.marker1onToggle)}
    >
      {props.marker1isOpen && <InfoWindow onCloseClick={props.marker1onToggle} ><p>current location</p></InfoWindow>}
    </Marker>
    <Marker
      position={new google.maps.LatLng(props.lat, props.lng)}
      onClick={props.marker2onToggle}
    >
      {props.marker2isOpen && <InfoWindow onCloseClick={props.marker2onToggle}><p>{props.name}</p></InfoWindow>}
    </Marker>
  </GoogleMap>
);

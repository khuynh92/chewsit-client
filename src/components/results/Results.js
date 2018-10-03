
/*global google*/

import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import Restaurant from './Restaurant.js';
import RestInfo from './RestInfo.js';
import Grid from '@material-ui/core/Grid';

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
  });
};


class Results extends Component {
  render() {
    if (!this.props.resultsState.allResults || !this.props.resultsState.allResults.length) {
      return <Redirect to='/dashboard' />;
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
            <div className={this.props.classes.results}>
              {/* <div style={{ width: '75%' }}> */}
              <Restaurant rating={this.props.resultsState.allResults[0].rating} image={this.props.resultsState.allResults[0].image_url} restaurantName={this.props.resultsState.allResults[0].name} />
              <RestInfo rating={this.props.resultsState.allResults[0].rating} restaurantName={this.props.resultsState.allResults[0].name} />
            </div>
            <div className={this.props.classes.map}>
              <MapWithADirectionsRenderer />
            </div>
            {/* </div> */}
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
    containerElement: <div style={{ height: `40vh`, width: '50%' }} />,
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
    {props.directions && <DirectionsRenderer options={{ suppressMarkers: true }} directions={props.directions} defaultPanel={document.getElementById('panel')} />}
    <div id="panel" style={{ height: 280, width: '100%', marginLeft: '100%', marginTop: -285, overflow: 'auto' }}></div>
    <Marker
      label='you'
      position={{ lat: props.user.location.lat, lng: props.user.location.lng }}
      onClick={props.marker1onToggle}
    >
      {props.marker1isOpen && <InfoWindow onCloseClick={props.marker1onToggle} ><p>current location</p></InfoWindow>}
    </Marker>
    <Marker
      position={new google.maps.LatLng(props.resultsState.allResults[0].coordinates.latitude, props.resultsState.allResults[0].coordinates.longitude)}
      onClick={props.marker2onToggle}
    >
      {props.marker2isOpen && <InfoWindow onCloseClick={props.marker2onToggle} ><p>{props.resultsState.allResults[0].name}</p></InfoWindow>}
    </Marker>
  </GoogleMap>
);

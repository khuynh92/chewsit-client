import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, withStyles, IconButton } from '@material-ui/core';
import { GoogleMaps, StarOutline, Star } from 'mdi-material-ui';
import { connect } from 'react-redux';

import { newFavoriteThunk, removeFavoriteThunk } from '../../action/preferences-action.js';

import large_0 from '../../assets/yelp/stars/large/large_0.png';
import large_1 from '../../assets/yelp/stars/large/large_1.png';
import large_1_half from '../../assets/yelp/stars/large/large_1_half.png';
import large_2 from '../../assets/yelp/stars/large/large_2.png';
import large_2_half from '../../assets/yelp/stars/large/large_2_half.png';
import large_3 from '../../assets/yelp/stars/large/large_3.png';
import large_3_half from '../../assets/yelp/stars/large/large_3_half.png';
import large_4 from '../../assets/yelp/stars/large/large_4.png';
import large_4_half from '../../assets/yelp/stars/large/large_4_half.png';
import large_5 from '../../assets/yelp/stars/large/large_5.png';

import yelp_logo from '../../assets/yelp/yelp_logo.png';

const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.mid = 769;
  theme.breakpoints.values.md = 910;
  theme.breakpoints.values.lg = 1024;
  theme.breakpoints.values.xl = 3000;


  return ({
    card: {
      [theme.breakpoints.between('xs', 'md')]: {
        position: 'relative',
        minWidth: 300,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: '2%',
        width: '50%',
        height: '40vh',
      },
      [theme.breakpoints.between('mid', 'xl')]: {
        position: 'relative',
        minWidth: 300,
        marginRight: '2%',
        marginBottom: '2%',
        display: 'inline-block',
        width: '48%',
        height: '40vh',
      },
    },
    media: {
      height: 204,
    },
    yelpLogo: {
      marginTop: -20,
      marginBottom: -20,
      width: '100%',
    },
    yelpLogoCont: {
      width: 120,
    },
    typeSpacing: {
      marginTop: 30,
    },
    cardAction: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    stars: {
      marginTop: 10,
    },
    directions: {
      textDecoration: 'none',
    },
    directionsChild: {
      color: '#497890',
      transition: '300ms',
      '&:hover': {
        color: '#9DA6AF',
      },
    },
    mapsIcon: {
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: 0,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        marginRight: 0,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginRight: 10,
      },
    },
    starFilled: {
      fontSize: 36,
      color: '#FFE021',
    },
    starOutlined: {
      fontSize: 36,
    },
    starIcon: {
      float: 'right',
    },

  });
};

function MediaCard(props) {
  let { restaurant } = props;

  let image;
  const { classes } = props;

  switch (restaurant.restRating) {
    case 0: image = large_0;
      break;
    case 1: image = large_1;
      break;
    case 1.5: image = large_1_half;
      break;
    case 2: image = large_2;
      break;
    case 2.5: image = large_2_half;
      break;
    case 3: image = large_3;
      break;
    case 3.5: image = large_3_half;
      break;
    case 4: image = large_4;
      break;
    case 4.5: image = large_4_half;
      break;
    case 5: image = large_5;
  }

  return (
    <Card className={classes.card}>

      {props.favorites && props.favorites.includes(restaurant.restID) ?
        <IconButton onClick={() => props.removeFavoriteThunk(props.user, restaurant.restID)} className={classes.starIcon}>
          <Star className={classes.starFilled} />
        </IconButton> :
        <IconButton onClick={() => props.newFavoriteThunk(props.user, restaurant.restID)} className={classes.starIcon}>
          <StarOutline className={classes.starOutlined} />
        </IconButton>
      }

      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {restaurant.restName}
          <Typography variant="caption">{restaurant.restDistance}</Typography>
        </Typography>
        <img className={classes.stars} src={image} /> {restaurant.restReviewCount} reviews
        <Typography className={classes.typeSpacing} component="p">
          <strong>Type:</strong> {restaurant.restType}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>

        <a href={restaurant.restWebsite} rel="noopener noreferrer" target="_blank">
          <Button className={classes.yelpLogoCont} size="small" color="primary">
            <img className={classes.yelpLogo} src={yelp_logo} />
          </Button>
        </a>

        <a className={classes.directions} href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.restName.replace(/\s/g, '+')}+${restaurant.restAddress.join(' ').replace(/\s/g, '+').replace(/,/g, '%2C')}`} rel="noopener noreferrer" target="_blank">
          <Button className={classes.directionsChild} size="small">
            <GoogleMaps className={classes.mapsIcon} />
            Get Directions
          </Button>
        </a>

      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({ state, user: state.user, favorites: state.user.favorites });

const mapDispatchToProps = { newFavoriteThunk, removeFavoriteThunk };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MediaCard));
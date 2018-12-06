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

import {styles} from '../../style/restInfoStyles.js';

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
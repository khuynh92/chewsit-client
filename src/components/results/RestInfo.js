import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

const styles = {
  card: {
    position: 'relative',
    minWidth: 300,
    marginRight: '2%',
    marginBottom: '2%',
    display: 'inline-block',
    width: '48%',
    height: '40vh',
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
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.restName.replace(/\s/g, '+')}+${restaurant.restAddress.join(' ').replace(/\s/g, '+').replace(/,/g, '%2C')}`} rel="noopener noreferrer" target="_blank">
          <Button size="small" color="primary">
            Google Maps
          </Button>
        </a>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
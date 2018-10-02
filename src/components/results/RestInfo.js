import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

const styles = {
  card: {
    display: 'inline-block',
    width: '50%',
    height: '40vh',
  },
  media: {
    height: 204,
  },
};

function MediaCard(props) {
  let image;
  const { classes } = props;
  switch (props.rating) {
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
      <CardActionArea>
        <img src={image} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
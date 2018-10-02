import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    display: 'inline-block',
    width:'50%',
    height: '40vh',
  },
  media: {
    height: 160,
  },
  cardActionArea: {
    width: '100%',
  },
  cardContent: {
    paddingBottom: 0,
    marginBottom: 0,
  },
  
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.cardActionArea}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="picture of restaurant"
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardContent} variant="headline" component="h3">
            {props.restaurantName}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button size="small" color="primary">
          Website
        </Button>
        <Button size="small" color="primary">
          Open in Google Maps
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(MediaCard);
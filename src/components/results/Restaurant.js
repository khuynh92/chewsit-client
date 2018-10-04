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
    minWidth: 300,
    marginBottom: '2%',
    display: 'inline-block',
    width: '50%',
    height: '40vh',
  },
  media: {
    height: '100%',
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
      <CardMedia
        className={classes.media}
        image={props.image}
        title="picture of restaurant"
      />
    </Card>
  );
}

export default withStyles(styles)(MediaCard);
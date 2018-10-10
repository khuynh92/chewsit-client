import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';


const styles = theme => {

  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 769;
  theme.breakpoints.values.lg = 1024;
  theme.breakpoints.values.xl = 3000;

  return ({
    card: {
      [theme.breakpoints.between('xs', 'md')]: {
        minWidth: 300,
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        height: '40vh',
      },
      [theme.breakpoints.between('md', 'xl')]: {
        minWidth: 300,
        marginBottom: '2%',
        display: 'inline-block',
        width: '50%',
        height: '40vh',
      },
    },
    media: {
      cursor: 'pointer',
      height: '100%',
    },
    cardActionArea: {
      width: '100%',
    },
    cardContent: {
      paddingBottom: 0,
      marginBottom: 0,
    },
  })
};

class MediaCard extends Component {


  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          onClick={this.changeImage}
          className={classes.media}
          image={this.props.image}
          title="picture of restaurant"
        />
      </Card>
    );
  }
}

export default withStyles(styles)(MediaCard); 
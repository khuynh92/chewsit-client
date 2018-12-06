import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import {styles} from '../../style/restaurantStyles.js';

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
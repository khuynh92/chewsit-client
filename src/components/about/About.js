import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../navbar/Navbar.js';
import { LinkedinBox } from 'mdi-material-ui';

import khoa from '../../assets/about/khoachurro.png';

import {styles} from '../../style/aboutStyles.js';

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Navbar />
        <Grid
          className={classes.grid}
          container
          direction='column'
          alignItems="center"
          justify="center"
        >
          <Typography variant='display1'>About</Typography>
          <img className={classes.khoa} src={khoa} />
          <Typography variant='body1' className={classes.aboutText}>Khoa is a Software Developer with a B.S degree in Psychology from the University of Washington. He aims to harmonize psychology principles along with software development to create user driven products. Khoa also strives to make the best user experience for all, with a passion in accessibility features for underrepresented populations. In his free time, Khoa loves to hike, take photos, and eat pizza. <a href='https://khuynh92.github.io/portfolio'>Find out more about Khoa</a></Typography>
          <Typography variant='body1' className={classes.socialMedia}><a target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/khoa-huynh92/'><LinkedinBox className={classes.linkedIn}/></a></Typography>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(About);
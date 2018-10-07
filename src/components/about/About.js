import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../navbar/Navbar.js';
import { LinkedinBox } from 'mdi-material-ui';

import khoa from '../../assets/about/khoachurro.png';

const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    grid: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5vh',
    },
    khoa: {
      marginTop: 10,
      marginBottom: 30,
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 100,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        marginLeft: 5,
        width: 200,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginLeft: 5,
        width: 200,
      },
    },
    aboutText: {
      [theme.breakpoints.between('xs', 'sm')]: {
        textAlign: 'center',
        width: 300,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        textAlign: 'left',
        marginLeft: 5,
        width: 500,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        textAlign: 'left',
        marginLeft: 5,
        width: 500,
      }, 
    },
    socialMedia: {
      position: 'absolute',
      bottom: '15vh',
    },
    linkedIn: {
      color: '#0077B5',
      textDecoration: 'none',
      fontSize: 42,
    },
  });
};

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
          <Typography variant='body1' className={classes.aboutText}>Khoa is a Software Developer with a B.S degree in Psychology from the University of Washington. He aims to harmonize psychology principles along with software development to create user driven products. Khoa also strives to make the best user experience for all, with a passion in accessibility features for underrepresented populations. In his free time, Khoa loves to hike, take photos, and eat pizza.</Typography>
          <Typography variant='body1' className={classes.socialMedia}><a target='_blank' rel="noopener noreferrer" href='https://www.linkedin.com/in/khoa-huynh92/'><LinkedinBox className={classes.linkedIn}/></a></Typography>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(About);
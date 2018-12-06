import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavMenu from './NavMenu';
import { Link } from 'react-router-dom';

import { logOutThunk } from '../../action/login-action.js';

import {styles} from  '../../style/navbarStyles.js';

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <NavMenu/>
            <Typography variant="title" color="inherit" className={classes.grow}>
              <Link className={classes.link} to='/dashboard'>chewsit</Link>
            </Typography>
            {this.props.user.isLoggedIn && <Button className={classes.logoutButton} onClick={this.props.logOutThunk} >Logout</Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state, user: state.user });

const mapDispatchToProps = { logOutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
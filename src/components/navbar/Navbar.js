import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavMenu from './NavMenu';

import { logOutThunk } from '../../action/login-action.js';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    paddingTop: 10,
    paddingBottom: 8,
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <NavMenu/>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Chewsit
          </Typography>
          <Button onClick={props.logOutThunk}color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = { logOutThunk };


export default connect(null, mapDispatchToProps)(withStyles(styles)(Navbar));
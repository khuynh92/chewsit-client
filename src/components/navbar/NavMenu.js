import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ThumbUpOutline, InformationOutline, HomeOutline, StarOutline } from 'mdi-material-ui';

import { logOutThunk } from '../../action/login-action.js';

import NoUserDialog from './NoUserDialog.js';

import {styles} from '../../style/navMenuStyles.js';

class NavMenu extends React.Component {
  state = {
    left: false,
    openPreferencesDialog: false,
    openFavoritesDialog: false,

  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleClose = () => {
    this.setState({ openPreferencesDialog: false, openFavoritesDialog: false });
  };

  openPreferencesDialog = () => {
    this.setState({ openPreferencesDialog: true });
  }

  openFavoritesDialog = () => {
    this.setState({ openFavoritesDialog: true });
  }



  render() {
    const { classes } = this.props;

    const LoggedInSideList = (
      <div className={classes.list}>
        <Typography className={classes.menu} variant='headline'>Menu</Typography>

        <Link to='/dashboard' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button}>
              <HomeOutline />
              <Typography className={classes.listText} variant='body1'>Home</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />

        <Link to='/preferences' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button} onClick={this.preferenceRedirect}>
              <ThumbUpOutline />
              <Typography className={classes.listText} variant='body1'>Preferences</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />

        <Link to='/favorites' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button}>
              <StarOutline />
              <Typography className={classes.listText} variant='body1'>Favorites</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />


        <Link to='/about' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button}>
              <InformationOutline />
              <Typography className={classes.listText} variant='body1'>About</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />

        {
          this.props.user.isLoggedIn &&
          <List className={classes.liLogout}>
            <Button className={classes.logoutButton} onClick={this.props.logOutThunk}>
              <Typography className={classes.listText} variant='body1'>Logout</Typography>
            </ Button>
          </List>
        }

      </div >
    );

    const RedirectSideList = (
      <div className={classes.list}>
        <Typography className={classes.menu} variant='headline'>Menu</Typography>

        <Link to='/dashboard' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button}>
              <HomeOutline />
              <Typography className={classes.listText} variant='body1'>Home</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />

        <List className={classes.li}>
          <Button className={classes.button} onClick={this.openPreferencesDialog}>
            <ThumbUpOutline />
            <Typography className={classes.listText} variant='body1'>Preferences</Typography>
          </ Button>
        </List>
        <Divider />

        <List className={classes.li}>
          <Button className={classes.button} onClick={this.openFavoritesDialog}>
            <StarOutline />
            <Typography className={classes.listText} variant='body1'>Favorites</Typography>
          </ Button>
        </List>
        <Divider />


        <Link to='/about' className={classes.link}>
          <List className={classes.li}>
            <Button className={classes.button}>
              <InformationOutline />
              <Typography className={classes.listText} variant='body1'>About</Typography>
            </ Button>
          </List>
        </Link>
        <Divider />

      </div >
    );

    return (
      <div>
        <IconButton  className={classes.hamburger} onClick={this.toggleDrawer('left', true)}>
          <MenuIcon className={classes.menuIcon}/>
        </IconButton>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {cookie.load('token') ? LoggedInSideList : RedirectSideList}
          </div>
        </SwipeableDrawer>
        <NoUserDialog
          listitem='Favorites'
          open={this.state.openFavoritesDialog}
          onClose={this.handleClose}
        />
        <NoUserDialog
          listitem='Preferences'
          open={this.state.openPreferencesDialog}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state, user: state.user });


const mapDispatchToProps = { logOutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavMenu));
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ThumbUpOutline, InformationOutline, HomeOutline, StarOutline } from 'mdi-material-ui';

import { logOutThunk } from '../../action/login-action.js';


const styles = {
  list: {
    width: 250,
    marginTop: 10,
  },
  li: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'left',
    paddingLeft: 40,
  },
  listText: {
    marginLeft: 20,
  },
  menu: {
    textAlign: 'center',
  },
  liLogout: {
    position: 'fixed',
    top: '90vh',
    width: '100%',
  },
  logoutButton: {
    paddingLeft: 0,
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  menuIcon: {
    color: '#ECEBE3',
  },
};

class NavMenu extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };



  render() {
    const { classes } = this.props;

    const sideList = (
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

    return (
      <div>
        <MenuIcon className={classes.menuIcon} onClick={this.toggleDrawer('left', true)} />

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
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state, user: state.user });


const mapDispatchToProps = { logOutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavMenu));
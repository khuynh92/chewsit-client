import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';

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
  },
  listText: {
    marginLeft: 20,
  },
  menu: {
    textAlign: 'center',
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
        <Typography className={classes.menu}variant='headline'>Menu</Typography>
        <List className={classes.li}>
          <Button className={classes.button}>
            <ThumbUp />
            <Typography className={classes.listText} variant='body1'>Preferences</Typography>
          </ Button>
        </List>
        <Divider />
        <List className={classes.li}>hello</List>
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer('left', true)} />

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

export default withStyles(styles)(NavMenu);
import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Button, withStyles, Card, Typography, IconButton } from '@material-ui/core';
import { Close } from 'mdi-material-ui';

import {styles} from '../../style/noUserDialogStyles.js';

class NoUserDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, ...other } = this.props;

    return (
      <Dialog className={classes.dialog} onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <Card className={classes.card}>
          <IconButton onClick={this.handleClose} className={classes.close}><Close /></IconButton>
          <Typography className={classes.text} variant='title'>Log in to access {this.props.listitem}</Typography>


          <Link to='/' style={{textDecoration: 'none'}}>
            <Button className={classes.button}>Sign In</Button>
          </Link>
        </Card>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NoUserDialog);

import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Button, withStyles, Card, Typography, IconButton } from '@material-ui/core';
import { Close } from 'mdi-material-ui';


import {styles} from '../../style/signUpDialogStyles.js';

class SignUpDialog extends React.Component {
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
          <Typography variant='title'>Sign up and get access to:</Typography>
          <ul className={classes.list}>
            <li>Up to 50 results per search</li>
            <li>Ability to set food preferences</li>
            <li>Save your favorite restaurants</li>
          </ul>

          <Link to='/signup' style={{textDecoration: 'none'}}>
            <Button className={classes.button}>Create Account</Button>
          </Link>
        </Card>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SignUpDialog);

import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Vietnamese from './food/Vietnamese.js';
import Pizza from './food/Pizza.js';
import Chinese from './food/Chinese.js';

const styles = {
  checkBox: {
    padding: 75,
    marginRight: -50,
    marginLeft: 50,
  },
};

class Preferences extends Component {
  state = {
    vietnamese: false,
    pizza: false,
    chinese: false,

  }

  handleChange = event => {
    this.setState({ [event.target.value]: event.target.checked });
  };

  handleSubmit = () => {
    console.log(this.state);
  }

  render() {
    return (
      <Fragment>
        <h1>preferences</h1>
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              className={this.props.classes.checkBox}
              icon={<Vietnamese />}
              checkedIcon={<Vietnamese checked='checked' />}
              value="vietnamese"
              onChange={this.handleChange}
            />
          }
        />
        <FormControlLabel
          control={
            <Checkbox color='primary' className={this.props.classes.checkBox} icon={<Pizza />} checkedIcon={<Pizza checked='checked' />} value="pizza" onChange={this.handleChange} />
          }
        />
        <FormControlLabel
          control={
            <Checkbox color='primary' className={this.props.classes.checkBox} icon={<Chinese />} checkedIcon={<Chinese checked='checked' />} value="chinese" onChange={this.handleChange} />
          }
        />
        <br />
        <Button variant='contained' onClick={this.handleSubmit}>save preferences</Button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Preferences);
import React, { Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import cafeIcon from '../../../assets/food/cafe.jpg';

const styles = {
  container: {
    paddingTop: 30,
    width: 120,
    opacity: .5,
  },
  photo: {
    borderRadius: 300,
    width: 100,
  },
  checkedPhoto: {
    borderRadius: 300,
    width: 120,
  },
  text: {
    textAlign: 'center',
  },
  checked: {
    paddingTop: 100,
    width: 110,
    opacity: 1,
  },
};

class Cafe extends Component {
  render() {
    return (
      <div className={!this.props.checked ? this.props.classes.container : this.props.checked}>
        <img className={!this.props.checked ? this.props.classes.photo : this.props.classes.checkedPhoto} src={cafeIcon} />
        <Typography className={this.props.classes.text} variant='body1'>Café</Typography>
      </div>

    );
  }
}

export default withStyles(styles)(Cafe);
import React, { Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import burgerIcon from '../../../assets/food/burgers.jpg';

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

class Burgers extends Component {
  render() {
    return (
      <div className={!this.props.checked ? this.props.classes.container : this.props.checked}>
        <img className={!this.props.checked ? this.props.classes.photo : this.props.classes.checkedPhoto} src={burgerIcon} />
        <Typography className={this.props.classes.text} variant='body1'>Burgers</Typography>
      </div>

    );
  }
}

export default withStyles(styles)(Burgers);
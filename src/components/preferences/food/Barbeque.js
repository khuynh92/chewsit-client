import React, { Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bbqIcon from '../../../assets/food/barbeque.jpg';

const styles = {
  container: {
    paddingTop: 30,
    width: 100,
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

class Barbeque extends Component {
  render() {
    return (
      <div className={!this.props.checked ? this.props.classes.container : this.props.checked}>
        <img className={!this.props.checked ? this.props.classes.photo : this.props.classes.checkedPhoto} src={bbqIcon} />
        <Typography className={this.props.classes.text} variant='body1'>Barbeque</Typography>
      </div>

    );
  }
}

export default withStyles(styles)(Barbeque);
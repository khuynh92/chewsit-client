import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { withStyles, Grid, List, ListItem, Button, Typography } from '@material-ui/core';
import superagent from 'superagent';

import Navbar from '../navbar/Navbar.js';
import FavInfo from './FavInfo.js';

import { logIn } from '../../action/login-action.js';
import { savePrefThunk, getPrefThunk } from '../../action/preferences-action.js';

import {styles} from '../../style/favoritesStyles.js';

class Favorites extends Component {

  state = {
    favoritesID: [],
    favorites: [],
  }

  async componentDidMount() {
    document.title = 'Favorites';
    if (cookie.load('token')) {
      let user = JSON.parse(atob(cookie.load('token').split('.')[1]));

      await this.props.logIn(user.id);
      await this.props.getPrefThunk(user.id);

      await this.setState({ ...this.state, favoritesID: this.props.favorites });

      let fetched = await fetchFavorites(this.state.favoritesID.slice(0, 5));

      this.setState({ favorites: fetched });
    }
  }

  fetchMore = async () => {
    let startIndex = this.state.favorites.length;

    let fetched = await fetchFavorites(this.state.favoritesID.slice(startIndex, startIndex + 5));

    this.setState({ favorites: [...this.state.favorites, ...fetched]});
  }

  render() {
    let { classes } = this.props;
    if (cookie.load('token')) {
      return (
        <Fragment>
          <Navbar />
          <Grid
            className={classes.grid}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <List>
              {this.state.favorites.map(favorite => {
                return (
                  <ListItem key={favorite.restID}>
                    <FavInfo restaurant={favorite} />
                  </ListItem>
                );
              })}
            </List>

            {this.state.favorites.length < this.state.favoritesID.length ? <Button className={classes.bottomElement} onClick={this.fetchMore}>Load More</Button> : <Typography className={classes.bottomElement}variant='body2'>End of Results</Typography>}

          </Grid>
        </Fragment>
      );
    } else {
      return <Redirect to='/' />;
    }
  }
}

async function fetchFavorites(favorites) {
  let fetched = favorites.map(id => {
    return superagent.get(`${process.env.API_URL}/api/v1/yelp/business/${id}`)
      .then(results => {
        return results.body;
      });
  });

  let results = [];

  await Promise.all(fetched).then(values => {
    values.forEach(restaurant => {
      let restInfo = {
        restID: restaurant.id,
        restImg: restaurant.image_url,
        restName: restaurant.name,
        restType: restaurant.categories.map(category => category.title).join(', '),
        restDisplayPhone: restaurant.display_phone,
        restNum: restaurant.phone,
        restAddress: restaurant.location.display_address,
        restRating: restaurant.rating,
        restReviewCount: restaurant.review_count,
        restWebsite: restaurant.url,
        restLat: restaurant.coordinates.latitude,
        restLng: restaurant.coordinates.longitude,
      };
      results.push(restInfo);
    });
  });

  return results.sort(function (a, b) {
    if (a.restName.toUpperCase() < a.restName.toUpperCase()) {
      return -1;
    }
    if (a.restName.toUpperCase() > b.restName.toUpperCase()) {
      return 1;
    }
    return 0;
  });

}

const mapStateToProps = (state) => ({ state, user: state.user, favorites: state.user.favorites });

const mapDispatchToProps = { savePrefThunk, logIn, getPrefThunk };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Favorites));
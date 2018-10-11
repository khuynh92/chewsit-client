import superagent from 'superagent';

export const SAVE_PREF = 'SAVE_PREF';
//Action Creators

export const savePreferences = (preferences, favorites) => ({
  type: SAVE_PREF,
  payload: { preferences, favorites },
});

//Thunkers

export const newFavoriteThunk = (user, businessID) => {
  return dispatch => {
    return superagent.put(`${process.env.API_URL}/api/v1/profiles/userID/${user.id}/favorites`)
      .send({ newFavorite: businessID })
      .then((response) => {
        dispatch(savePreferences(user.preferences, response.body));
      });
  };
};

export const removeFavoriteThunk = (user, businessID) => {
  return dispatch => {
    return superagent.put(`${process.env.API_URL}/api/v1/profiles/userID/${user.id}/removeFavorite`)
      .send({ removeFavorite: businessID })
      .then((response) => {
        dispatch(savePreferences(user.preferences, response.body));
      });
  };
};

export const savePrefThunk = (user) => {
  return dispatch => {
    return superagent.put(`${process.env.API_URL}/api/v1/profiles/userID/${user.id}/preferences`)
      .send(user.preferences)
      .then(response => {
        dispatch(savePreferences(response.body, user.favorites));
      });
  };
};

export const getPrefThunk = (id) => {
  return dispatch => {
    return superagent.get(`${process.env.API_URL}/api/v1/profiles/userID/${id}`)
      .then(response => {
        dispatch(savePreferences(response.body.preferences, response.body.favorites));
      });
  };
};
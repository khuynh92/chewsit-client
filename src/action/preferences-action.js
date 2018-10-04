import superagent from 'superagent';

export const SAVE_PREF = 'SAVE_PREF';
//Action Creators

export const savePreferences = (preferences) => ({
  type: SAVE_PREF,
  payload: {preferences},
});

//Thunkers
export const savePrefThunk = (user) => {
  return dispatch => {
    return superagent.put(`${process.env.API_URL}/api/v1/profiles/userID/${user.id}/preferences`)
      .send(user.preferences)
      .then(response => {
        dispatch(savePreferences(response.body));
      });
  };
};

export const getPrefThunk = (id) => {
  return dispatch => {
    return superagent.get(`${process.env.API_URL}/api/v1/profiles/userID/${id}`)
      .then(response => {
        dispatch(savePreferences(response.body.preferences));
      });
  };
};
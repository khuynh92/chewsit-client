import superagent from 'superagent';
import cookie from 'react-cookies';
import {getPrefThunk} from './preferences-action.js';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_LOCATION = 'SAVE_LOCATION';

export const logIn = (id)  => ({
  type: LOG_IN,
  payload: {id, isLoggedIn: true, logInError: false, signUpError: false},
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: {isLoggedIn: false},
});

export const handleError = (err) => ({
  type: 'HANDLE_ERROR',
  payload: err,
});

export const logInError = () => ({
  type: LOG_IN_ERROR,
  payload: {isLoggedIn: false, logInError: true},
});

export const saveLocation = (location) => ({
  type: SAVE_LOCATION,
  payload: {location},
});

export const logInThunk = (user) => {
  return dispatch => {
    return superagent.get(`${process.env.FETCH_URL}/signin`)
      .auth(user.username, user.password)
      .then(response => {
        cookie.save('token', response.text);
        let user = JSON.parse(atob(response.text.split('.')[1]));
        dispatch(logIn(user.id));
        dispatch(getPrefThunk(user.id));
      })
      .catch(err => {
        if(err.status === 401) {
          dispatch(logInError());
        }
      });
  };
};

export const logOutThunk = () => {
  return dispatch => {
    cookie.remove('token');
    dispatch(logOut());
  };
};
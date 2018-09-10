import superagent from 'superagent';
import cookie from 'react-cookies';

export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export const logIn = ()  => ({
  type: LOG_IN,
  payload: {isLoggedIn: true, logInError: false, signInError: false},
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

export const logInThunk = (user) => {
  console.log(process.env.API_URL);
  return dispatch => {
    superagent.get(`${process.env.API_URL}/signin`)
      .auth(user.username, user.password)
      .then(response => {
        cookie.save('token', response.text);
        dispatch(logIn(true));
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
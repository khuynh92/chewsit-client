
import superagent from 'superagent';
import cookie from 'react-cookies';

import {logIn} from './login-action.js';

export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
 
export const userExists = () => ({
  type: SIGN_IN_ERROR,
  payload: {signInError: true},
})

export const signUpThunk = (newUser) => {
  return dispatch => {
    superagent.post(`${process.env.API_URL}/signup`)
      .send({username: newUser.username, password: newUser.password, email: newUser.email})
      .then(response => {
        cookie.save('token', response.text);
        dispatch(logIn(true));
      })
      .catch(err => {
        if(err.status === 409) {
          dispatch(userExists());
        }
      })

  };
}
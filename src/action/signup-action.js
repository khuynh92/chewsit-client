
import superagent from 'superagent';
import cookie from 'react-cookies';

export const SIGN_UP_ERROR = 'SIGN_IN_ERROR';
 
export const NEW_USER_LOGIN = 'NEW_USER_LOGIN';
export const userExists = () => ({
  type: SIGN_UP_ERROR,
  payload: {signUpError: true},
});

export const newUserLogin = () => ({
  type: NEW_USER_LOGIN,
  payload: {isLoggedIn: 'new user'},
});

export const signUpThunk = (newUser) => {
  return dispatch => {
    superagent.post(`${process.env.API_URL}/signup`)
      .send({username: newUser.username, password: newUser.password, email: newUser.email})
      .then(response => {
        cookie.save('token', response.text);
        dispatch(newUserLogin());
      })
      .catch(err => {
        if(err.status === 409) {
          dispatch(userExists());
        }
      });

  };
};
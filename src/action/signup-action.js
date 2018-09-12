
import superagent from 'superagent';
import cookie from 'react-cookies';

export const SIGN_UP_ERROR = 'SIGN_IN_ERROR';
 
export const NEW_USER_LOGIN = 'NEW_USER_LOGIN';
export const userExists = () => ({
  type: SIGN_UP_ERROR,
  payload: {signUpError: true},
});

export const newUserLogin = (id) => ({
  type: NEW_USER_LOGIN,
  payload: {id, isLoggedIn: 'new user'},
});

export const signUpThunk = (newUser) => {
  return dispatch => {
    return superagent.post(`${process.env.API_URL}/signup`)
      .send({username: newUser.username, password: newUser.password, email: newUser.email})
      .then(response => {
        cookie.save('token', response.text);
        let user = JSON.parse(atob(response.text.split('.')[1]));
        
        dispatch(newUserLogin(user.id));
      })
      .catch(err => {
        if(err.status === 409) {
          dispatch(userExists());
        }
      });

  };
};
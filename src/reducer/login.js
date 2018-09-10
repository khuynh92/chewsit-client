let initialState = {isLoggedIn: false, logInError: false, signUpError: false};

import { LOG_IN, LOG_OUT, LOG_IN_ERROR } from '../action/login-action.js';

import { SIGN_UP_ERROR, NEW_USER_LOGIN} from '../action/signup-action.js';


export default (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {

    case LOG_IN: return {...state, ...payload};

    case LOG_OUT: return {...state, ...payload};

    case NEW_USER_LOGIN: return {...state, ...payload};

    case LOG_IN_ERROR: return {...state, ...payload};

    case SIGN_UP_ERROR: return {...state, ...payload};

    default: return state;
  }

};
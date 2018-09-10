let initialState = {isLoggedIn: false, logInError: false, signInError: false};

import { LOG_IN, LOG_IN_ERROR } from '../action/login-action.js';

import { SIGN_IN_ERROR} from '../action/signup-action.js';


export default (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {

    case LOG_IN: return {...state, ...payload};

    case LOG_IN_ERROR: return {...state, ...payload};

    case SIGN_IN_ERROR: return {...state, ...payload};

    default: return state;
  }

};
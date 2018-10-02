let initialState = {};

import {FETCH_ALL_RESULTS} from '../action/results-action.js';
export default (state = initialState, action) => {
  let { type, payload } = action;

  switch(type) {
    case FETCH_ALL_RESULTS: return {...state, ...payload};
    default: return state;
  }
};
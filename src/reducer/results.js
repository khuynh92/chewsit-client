let initialState = {dashboard: {
  price: '',
  mealType: '',
  distance: '',
  location: '',
}};

import {FETCH_ALL_RESULTS, SAVE_DASHBOARD} from '../action/results-action.js';
export default (state = initialState, action) => {
  let { type, payload } = action;

  switch(type) {
    case FETCH_ALL_RESULTS: return {...state, ...payload};
    case SAVE_DASHBOARD: return {...state, dashboard: payload};
    default: return state;
  }
};
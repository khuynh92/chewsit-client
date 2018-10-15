import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducer/user.js';
import resultsState from '../reducer/results.js';

import logger from '../middleware/logger.js';
import errorHandler from '../middleware/errorHandler.js';

const appReducer = combineReducers({
  user, resultsState,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default createStore(appReducer, composeEnhancers(applyMiddleware(logger, thunk, errorHandler)));

export default createStore(appReducer, applyMiddleware(thunk, errorHandler));

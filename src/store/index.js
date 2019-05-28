import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import rootReducer from './rootReducer';

const store = createStore(
    rootReducer, applyMiddleware(reduxThunk, reduxLogger)
);

export default store;

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './root_reducer';
import reduxLogger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(reduxThunk, reduxLogger));

export default store;
// rootReducer.js
import { combineReducers } from 'redux';
import apiReducer from './CreateSlice';

const rootReducer = combineReducers({
  api: apiReducer,
  // other reducers...
});

export default rootReducer;

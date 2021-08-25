/* eslint-disable */
import { combineReducers } from 'redux';
import user from './user';
import categories from './categories'

const rootReducer = combineReducers({
  user : user,
  categories: categories,
  
});

export default rootReducer;

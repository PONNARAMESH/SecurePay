import {combineReducers} from 'redux';
import userReducers from './userAccount';

export const rootReducer = combineReducers({
  users: userReducers,
});

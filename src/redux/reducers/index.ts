import {combineReducers} from 'redux';
import userReducers from './userAccount';
import paymentTransactionReducers from './transactions';

export const rootReducer = combineReducers({
  user: userReducers,
  payments: paymentTransactionReducers,
});

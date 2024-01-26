import { combineReducers } from "redux";
import userReducers from "./userAccount";
import paymentTransactionReducers from "./transactions";
import contactReducers from "./contacts";

export const rootReducer = combineReducers({
  user: userReducers,
  payments: paymentTransactionReducers,
  contacts: contactReducers,
});

export type IUserReducers = ReturnType<typeof userReducers>;
export type ITransactionsReducer = ReturnType<
  typeof paymentTransactionReducers
>;
export type IContactsReducer = ReturnType<typeof contactReducers>;

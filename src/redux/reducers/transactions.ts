import { EnumTransactionStatusValues } from "../../types";
import {
  GET_MY_TRANSACTIONS_FAILED,
  GET_MY_TRANSACTIONS_REQUEST,
  GET_MY_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_INFO_BY_ID_FAILED,
  GET_TRANSACTION_INFO_BY_ID_REQUEST,
  GET_TRANSACTION_INFO_BY_ID_SUCCESS,
  NEW_TRANSACTION_FAILED,
  NEW_TRANSACTION_REQUEST,
  NEW_TRANSACTION_SUCCESS,
  RESET_TRANSACTION_INFO_BY_ID,
} from "../actionTypes";

const initialState = {
  isFetchingTransactions: false,
  transactions: [],
  isFetchingTransactionsInfo: false,
  transactionInfo: null,
  paymentStatus: EnumTransactionStatusValues.TTxnInitiated,
};
export default function paymentTransactionReducers(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case NEW_TRANSACTION_REQUEST:
      return {
        ...state,
        paymentStatus: EnumTransactionStatusValues.TTxnInitiated,
        transactionInfo: null,
      };
    case NEW_TRANSACTION_SUCCESS:
      return {
        ...state,
        paymentStatus: EnumTransactionStatusValues.TTxnSuccess,
        transactionInfo: action.payload
      };
    case NEW_TRANSACTION_FAILED:
      return {
        ...state,
        paymentStatus: EnumTransactionStatusValues.TTxnFailed,
        transactionInfo: null,
      };
    case GET_TRANSACTION_INFO_BY_ID_REQUEST:
      return {
        ...state,
        isFetchingTransactionsInfo: true,
        transactionInfo: null,
        paymentStatus: null,
      };
    case GET_TRANSACTION_INFO_BY_ID_SUCCESS:
      return {
        ...state,
        isFetchingTransactionsInfo: false,
        transactionInfo: action.payload,
        paymentStatus: null,
      };
    case GET_TRANSACTION_INFO_BY_ID_FAILED:
      return {
        ...state,
        isFetchingTransactionsInfo: false,
        transactionInfo: null,
        paymentStatus: null,
      };
    case RESET_TRANSACTION_INFO_BY_ID:
      return {
        ...state,
        isFetchingTransactionsInfo: true,
        transactionInfo: null,
        paymentStatus: null,
      };
    case GET_MY_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isFetchingTransactions: true,
        paymentStatus: null,
      };
    case GET_MY_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetchingTransactions: false,
        transactions: action.payload,
        paymentStatus: null,
      };
    case GET_MY_TRANSACTIONS_FAILED:
      return {
        ...state,
        isFetchingTransactions: false,
        transactions: [],
        paymentStatus: null,
      };
    default:
      return state;
  }
}

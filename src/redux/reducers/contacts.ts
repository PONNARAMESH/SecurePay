import { EnumTransactionStatusValues } from "../../types";
import {
  ADD_NEW_CONTACT_REQUEST,
  ADD_NEW_CONTACT_REQUEST_FAILED,
  ADD_NEW_CONTACT_REQUEST_SUCCESS,
  GET_ALL_MY_CONTACTS_REQUEST,
  GET_ALL_MY_CONTACTS_REQUEST_FAILED,
  GET_ALL_MY_CONTACTS_REQUEST_SUCCESS,
} from "../actionTypes";

const initialState = {
  isFetchingMyContacts: false,
  myContacts: [],
};
export default function paymentTransactionReducers(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case GET_ALL_MY_CONTACTS_REQUEST:
      return {
        ...state,
        isFetchingMyContacts: true,
      };
    case GET_ALL_MY_CONTACTS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetchingMyContacts: false,
        myContacts: action.payload,
      };
    case GET_ALL_MY_CONTACTS_REQUEST_FAILED:
      return {
        ...state,
        isFetchingMyContacts: false,
        myContacts: [],
      };
    default:
      return state;
  }
}

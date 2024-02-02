import { IContactInfo } from "../../types";
import {
  // ADD_NEW_CONTACT_REQUEST,
  // ADD_NEW_CONTACT_REQUEST_FAILED,
  // ADD_NEW_CONTACT_REQUEST_SUCCESS,
  GET_ALL_MY_CONTACTS_REQUEST,
  GET_ALL_MY_CONTACTS_REQUEST_FAILED,
  GET_ALL_MY_CONTACTS_REQUEST_SUCCESS,
} from "../actionTypes";

// ACTION_CREATORS FOR MAKING_NEW_PAYMENT
// export function addNewContactRequestAction(data: IContactInfo) {
//   return {
//     type: ADD_NEW_CONTACT_REQUEST,
//     payload: data,
//   };
// }

// export function addNewContactRequestSuccessAction(data: IContactInfo) {
//   return {
//     type: ADD_NEW_CONTACT_REQUEST_SUCCESS,
//     payload: data,
//   };
// }

// export function addNewContactRequestFailureAction(error: any) {
//   return {
//     type: ADD_NEW_CONTACT_REQUEST_FAILED,
//     payload: error,
//   };
// }

// ACTION_CREATORS TO FETCH A TRANSACTIONS_INFO BY TXN_ID
export function getAllMyContactsRequestAction(phoneNumber: string) {
  return {
    type: GET_ALL_MY_CONTACTS_REQUEST,
    payload: phoneNumber,
  };
}

export function getAllMyContactsRequestSuccessAction(data: IContactInfo[]) {
  return {
    type: GET_ALL_MY_CONTACTS_REQUEST_SUCCESS,
    payload: data,
  };
}

export function getAllMyContactsRequestFailureAction(error: any) {
  return {
    type: GET_ALL_MY_CONTACTS_REQUEST_FAILED,
    payload: error,
  };
}

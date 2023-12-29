import {DATA_FETCH_SUCCESSFUL, DATA_FETCH_FAILED} from '../actionTypes';
export * from "./userAccount";

export function fetchDataSuccess(data) {
  return {
    type: DATA_FETCH_SUCCESSFUL,
    payload: data,
  };
}

export function fetchDataError(error) {
  return {
    type: DATA_FETCH_FAILED,
    payload: error,
  };
}


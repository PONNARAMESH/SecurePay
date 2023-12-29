import { ILoggedInUserInfo } from '../../types';
import {
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESSFUL,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESSFUL,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESSFUL,
} from '../actionTypes';

export type IUserLoginErrorInfo = {
  code: string,
  message: string,
}

export interface IUserReducerState {
  data: ILoggedInUserInfo | null,
  // isFetchingUserInfo: boolean,
  error: IUserLoginErrorInfo | null,
};

const initialState: IUserReducerState = {
  data: null,
  error: null,
};

export default function userReducer(
  state = initialState,
  action: { type: string, payload: any }
): IUserReducerState {
  // console.log("-----------------------------------");
  // console.log("##state: ", state);
  // console.log("##action: ", action);
  // console.log("-----------------------------------");
  switch (action.type) {
    case SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        data: { ...action.payload },
        error: null,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case SIGN_OUT_SUCCESSFUL:
      return {
        ...initialState,
      };
    case SIGN_OUT_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        data: { ...action.payload },
        error: null,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

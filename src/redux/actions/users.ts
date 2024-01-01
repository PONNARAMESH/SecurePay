import { ILoggedInUserInfo } from "../../types";
import { ADD_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS } from "../actionTypes";

export function addNewUserInfoAction(data: ILoggedInUserInfo) {
    return {
        type: ADD_USER_REQUEST,
        payload: data
    }
}
export function addNewUserInfoSuccessfulAction(data: ILoggedInUserInfo) {
    return {
        type: ADD_USER_SUCCESS,
        payload: data
    }
}
export function addNewUserInfoFailedAction(error: any) {
    return {
        type: ADD_USER_FAILED,
        payload: error
    }
}
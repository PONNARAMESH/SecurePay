import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ILoggedInUserInfo, IUserEmailInfo, IUserSignUpInfo } from "../../types";
import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESSFUL,
    SIGN_IN_FAILED,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESSFUL,
    SIGN_OUT_FAILED,
    SIGN_UP_FAILED,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESSFUL,
} from "../actionTypes";

// ACTION_CREATORS FOR SING_IN
export function userSingInAction(data: IUserEmailInfo) {
    return ({
        type: SIGN_IN_REQUEST,
        payload: data,
    })
}

export function userSingInSuccessAction(data: ILoggedInUserInfo) {
    return ({
        type: SIGN_IN_SUCCESSFUL,
        payload: data,
    })
}

export function userSingInFailureAction(error: any) {
    return ({
        type: SIGN_IN_FAILED,
        payload: error,
    })
}

// ACTION_CREATORS FOR SING_OUT
export function userSingOutAction() {
    return ({
        type: SIGN_OUT_REQUEST,
    })
}

export function userSingOutSuccessAction() {
    return ({
        type: SIGN_OUT_SUCCESSFUL,
    })
}

export function userSingOutFailureAction(error: any) {
    return ({
        type: SIGN_OUT_FAILED,
        payload: error,
    })
}

// ACTION_CREATORS FOR SING_UP
export function userSingUpAction(data: IUserSignUpInfo) {
    return ({
        type: SIGN_UP_REQUEST,
        payload: data,
    })
}

export function userSingUpSuccessAction(data: ILoggedInUserInfo) {
    return ({
        type: SIGN_UP_SUCCESSFUL,
        payload: data,
    })
}

export function userSingUpFailureAction(error: any) {
    return ({
        type: SIGN_UP_FAILED,
        payload: error,
    })
}
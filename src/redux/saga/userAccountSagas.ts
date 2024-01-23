import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
  userSingInSuccessAction,
  userSingInFailureAction,
  userSingUpFailureAction,
  userSingOutSuccessAction,
  userSingOutFailureAction,
  userSingUpSuccessAction,
} from "../actions";
import {
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESSFUL,
} from "../actionTypes";
import {
  userLoginAPI,
  userSignOutAPI,
  userSignUpAPI,
} from "../../api/userAccount";
import { IUserEmailInfo, IUserSignUpInfo } from "../../types";
import { AddNewRecordAPI, getRecordInfoByDocIdAPI } from "../../api/users";
import {
  generateAccountNumber,
  initialBalance,
  maskAccountNumber,
  removeNullUndefined,
} from "../../utils";

export function* singInSaga(action: { type: string; payload: IUserEmailInfo }) {
  try {
    const resData: FirebaseAuthTypes.UserCredential = yield call(
      userLoginAPI,
      action?.payload
    );
    // console.log('##res-data: ', resData.user);
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      providerId,
      // tenantId,
      uid,
    } = resData?.user || {};
    // const result = getRecordInfoByDocIdAPI(uid).then((data) => console.log("userInfo: ", data));
    // console.log("##userInfo--: ", result);
    yield put(
      userSingInSuccessAction({
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        providerId,
        // tenantId,
        uid,
      })
    );
  } catch (error) {
    const {
      code,
      message,
      // namespace,
      // nativeErrorCode,
      // nativeErrorMessage,
      // userInfo
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(userSingInFailureAction({ code, message }));
  }
}

export function* watchSingInSaga() {
  yield takeLatest(SIGN_IN_REQUEST, singInSaga);
}

/**************************************************************** */

export function* singOutSaga(action: {
  type: string;
  payload: IUserEmailInfo;
}) {
  try {
    const resData: boolean = yield call(userSignOutAPI);
    // console.log("##res-data: ", resData);
    yield put(userSingOutSuccessAction());
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(userSingOutFailureAction({ code, message }));
  }
}

export function* watchOutSignOutSaga() {
  yield takeLatest(SIGN_OUT_REQUEST, singOutSaga);
}

/**************************************************************** */

export function* singUpSaga(action: {
  type: string;
  payload: IUserSignUpInfo;
}) {
  // console.log('##sing-in-saga: ', JSON.stringify(action, null, 4));
  const { email, password, phoneNumber, displayName } = action?.payload;
  try {
    const resData: FirebaseAuthTypes.UserCredential = yield call(
      userSignUpAPI,
      { email, password, displayName, phoneNumber }
    );
    const { additionalUserInfo, user } = resData;
    // console.log('##res-data: ', resData);
    const newAccountId = generateAccountNumber();
    const loggedInUserInfo = {
      email: user?.email,
      emailVerified: user?.emailVerified,
      isAnonymous: user?.isAnonymous,
      photoURL: user?.photoURL,
      providerId: user?.providerId,
      // tenantId: // user?.tenantId,
      uid: user?.uid,
      phoneNumber,
      displayName,
    };
    // console.log("##loggedInUserInfo: ", JSON.stringify(loggedInUserInfo, null, 4));
    yield put(userSingUpSuccessAction({ ...loggedInUserInfo }));
    yield call(
      AddNewRecordAPI,
      user?.uid,
      removeNullUndefined({
        ...loggedInUserInfo,
        accountNumber: newAccountId,
        balance: initialBalance,
      })
    );
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(userSingUpFailureAction({ code, message }));
  }
}

export function* watchSingUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, singUpSaga);
}

/**************************************************************** */

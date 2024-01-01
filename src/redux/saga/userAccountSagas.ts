import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import {
  userSingInSuccessAction,
  userSingInFailureAction,
  userSingUpFailureAction,
  userSingOutSuccessAction,
  userSingOutFailureAction,
  userSingUpSuccessAction,
} from '../actions';
import {
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESSFUL,
} from '../actionTypes';
import { userLoginAPI, userSignOutAPI, userSignUpAPI } from '../../api/userAccount';
import { IUserEmailInfo } from '../../types';
import { AddNewRecordAPI } from '../../api/users';

export function* singInSaga(action: { type: string, payload: IUserEmailInfo }) {
  try {
    const resData: FirebaseAuthTypes.User = yield call(userLoginAPI, action?.payload);
    // console.log('##res-data: ', resData);
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
    } = resData;
    yield put(userSingInSuccessAction({
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      providerId,
      // tenantId,
      uid,
    }));
    // check for failed case as well and un-comment next line
  } catch (error: unknown) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
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

export function* singOutSaga(action: { type: string, payload: IUserEmailInfo }) {
  // console.log('##sing-out-saga');
  try {
    const resData: boolean = yield call(userSignOutAPI);
    console.log('##res-data: ', resData);
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

export function* singUpSaga(action: { type: string, payload: IUserEmailInfo }) {
  // console.log('##sing-in-saga');
  try {
    const resData: FirebaseAuthTypes.UserCredential = yield call(userSignUpAPI, action?.payload);
    const { additionalUserInfo, user } = resData;
    console.log('##res-data: ', resData);
    const loggedInUserInfo = {
      displayName: user?.displayName,
      email: user?.email,
      emailVerified: user?.emailVerified,
      isAnonymous: user?.isAnonymous,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      providerId: user?.providerId,
      // tenantId: // user?.tenantId,
      uid: user?.uid,
    }
    console.log("##loggedInUserInfo: ", JSON.stringify(loggedInUserInfo, null, 4));
    yield put(userSingUpSuccessAction({ ...loggedInUserInfo }));
    yield call(AddNewRecordAPI, user?.uid, { ...loggedInUserInfo })
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

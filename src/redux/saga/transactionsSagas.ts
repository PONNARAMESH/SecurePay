/**************************************************************** */

import { call, put, takeEvery } from "redux-saga/effects";
import {
  getMyTransactionsAPI,
  getTransactionInfoByTxnId,
  makePayment,
} from "../../api/transactions";
import { INewPaymentInfo, ITransactionInfo } from "../../types";
import {
  GET_MY_TRANSACTIONS_REQUEST,
  GET_TRANSACTION_INFO_BY_ID_REQUEST,
  NEW_TRANSACTION_REQUEST,
  NEW_TRANSACTION_SUCCESS,
} from "../actionTypes";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  getMyTransactionsRequestFailureAction,
  getMyTransactionsRequestSuccessAction,
  getTransactionsInfoByIdRequestFailureAction,
  getTransactionsInfoByIdRequestSuccessAction,
  makeNewTransactionRequestFailureAction,
  makeNewTransactionRequestSuccessAction,
} from "../actions/transactions";

export function* makeNewTransactionSaga(action: {
  type: string;
  payload: INewPaymentInfo;
}) {
  try {
    // console.log("##payload: ", action?.payload);
    const resData: ITransactionInfo = yield call(makePayment, action.payload);
    // console.log("##res-data: ", resData);
    yield put(makeNewTransactionRequestSuccessAction(resData));
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(makeNewTransactionRequestFailureAction({ code, message }));
  }
}

export function* watchOutMakeNewTransactionSaga() {
  yield takeEvery(NEW_TRANSACTION_REQUEST, makeNewTransactionSaga);
}

/**************************************************************** */

export function* getTransactionInfoByIdSaga(action: {
  type: string;
  payload: string;
}) {
  try {
    const resData: ITransactionInfo | null = yield call(
      getTransactionInfoByTxnId,
      action.payload
    );
    // console.log("##transaction-info: ", resData);
    if (!resData) {
      yield put(
        getTransactionsInfoByIdRequestFailureAction({
          code: "No Data",
          message: "No Transaction data found",
        })
      );
    } else {
      yield put(getTransactionsInfoByIdRequestSuccessAction(resData));
    }
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(getTransactionsInfoByIdRequestFailureAction({ code, message }));
  }
}

export function* watchOutGetTransactionInfoByIdSaga() {
  yield takeEvery(
    GET_TRANSACTION_INFO_BY_ID_REQUEST,
    getTransactionInfoByIdSaga
  );
}

/**************************************************************** */
export function* getMyTransactionsSaga(action: {
  type: string;
  payload: string;
}) {
  console.log("Triggered getMyTransactionsSaga");
  try {
    const resData: ITransactionInfo[] | [] = yield call(
      getMyTransactionsAPI,
      action.payload
    );
    // console.log("##res-data: ", resData);
    yield put(getMyTransactionsRequestSuccessAction(resData));
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(getMyTransactionsRequestFailureAction({ code, message }));
  }
}

export function* watchOutGetMyTransactionsSaga() {
  yield takeEvery(GET_MY_TRANSACTIONS_REQUEST, getMyTransactionsSaga);
}

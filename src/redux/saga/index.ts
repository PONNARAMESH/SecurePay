import { all } from "redux-saga/effects";

import {
  watchSingInSaga,
  watchSingUpSaga,
  watchOutSignOutSaga,
} from "./userAccountSagas";
import {
  watchOutGetMyTransactionsSaga,
  watchOutGetTransactionInfoByIdSaga,
  watchOutMakeNewTransactionSaga,
} from "./transactionsSagas";

// RootSaga.js
export default function* rootSaga() {
  yield all([
    /** User-Session-Sagas */
    watchSingInSaga(),
    watchSingUpSaga(),
    watchOutSignOutSaga(),

    /** User-payment-Sagas */
    watchOutMakeNewTransactionSaga(),
    watchOutGetTransactionInfoByIdSaga(),
    watchOutGetMyTransactionsSaga(),
    // Add more sagas as needed
  ]);
}

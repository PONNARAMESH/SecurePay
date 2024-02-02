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

import {
  watchOutGetAllMyContactsSaga
} from "./contactSagas";

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

    /** My-Contacts-Sagas */
    watchOutGetAllMyContactsSaga(),
    // Add more sagas as needed
  ]);
}

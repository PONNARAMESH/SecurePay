import {all} from 'redux-saga/effects';

import {
  watchSingInSaga,
  watchSingUpSaga,
  watchOutSignOutSaga
} from './userAccountSagas';

// RootSaga.js
export default function* rootSaga() {
  yield all([
    watchSingInSaga(),
    watchSingUpSaga(),
    watchOutSignOutSaga(),
    // Add more sagas as needed
  ]);
}

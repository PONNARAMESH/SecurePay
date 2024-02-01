import { call, put, takeEvery } from "redux-saga/effects";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { IContactInfo } from "../../types";
import { getAllMyContactsAPI } from "../../api/contacts";
import {
  getAllMyContactsRequestFailureAction,
  getAllMyContactsRequestSuccessAction,
} from "../actions/contacts";
import { GET_ALL_MY_CONTACTS_REQUEST } from "../actionTypes";

/*****************************************************************/
export function* getAllMyContactsSaga(action: {
  type: string;
  payload: string;
}) {
  // console.log("Triggered getAllMyContactsSaga");
  try {
    const resData: IContactInfo[] | [] = yield call(
      getAllMyContactsAPI,
      action.payload
    );
    // console.log("##res-data: ", resData);
    yield put(getAllMyContactsRequestSuccessAction(resData));
  } catch (error) {
    // console.log('%%%%%%%%%%%---ERROR: ', error);
    const {
      code,
      message,
    } = error as FirebaseAuthTypes.NativeFirebaseAuthError;
    yield put(getAllMyContactsRequestFailureAction({ code, message }));
  }
}

export function* watchOutGetAllMyContactsSaga() {
  yield takeEvery(GET_ALL_MY_CONTACTS_REQUEST, getAllMyContactsSaga);
}

/*****************************************************************/

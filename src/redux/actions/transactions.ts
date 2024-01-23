import { INewPaymentInfo, ITransactionInfo } from "../../types"
import { GET_MY_TRANSACTIONS_FAILED, GET_MY_TRANSACTIONS_REQUEST, GET_MY_TRANSACTIONS_SUCCESS, GET_TRANSACTION_INFO_BY_ID_FAILED, GET_TRANSACTION_INFO_BY_ID_REQUEST, GET_TRANSACTION_INFO_BY_ID_SUCCESS, NEW_TRANSACTION_FAILED, NEW_TRANSACTION_REQUEST, NEW_TRANSACTION_SUCCESS } from "../actionTypes"


// ACTION_CREATORS FOR MAKING_NEW_PAYMENT
export function makeNewTransactionRequestAction(data: INewPaymentInfo) {
    return ({
        type: NEW_TRANSACTION_REQUEST,
        payload: data,
    })
}

export function makeNewTransactionRequestSuccessAction(data: ITransactionInfo) {
    return ({
        type: NEW_TRANSACTION_SUCCESS,
        payload: data,
    })
}

export function makeNewTransactionRequestFailureAction(error: any) {
    return ({
        type: NEW_TRANSACTION_FAILED,
        payload: error,
    })
}

// ACTION_CREATORS TO FETCH A TRANSACTIONS_INFO BY TXN_ID
export function getTransactionsInfoByIdRequestAction(txnId: string) {
    return ({
        type: GET_TRANSACTION_INFO_BY_ID_REQUEST,
        payload: txnId,
    })
}

export function getTransactionsInfoByIdRequestSuccessAction(data: ITransactionInfo) {
    return ({
        type: GET_TRANSACTION_INFO_BY_ID_SUCCESS,
        payload: data,
    })
}

export function getTransactionsInfoByIdRequestFailureAction(error: any) {
    return ({
        type: GET_TRANSACTION_INFO_BY_ID_FAILED,
        payload: error,
    })
}

// ACTION_CREATORS TO FETCH ALL_MY_TRANSACTIONS
export function getMyTransactionsRequestAction(phoneNumber: string) {
    return ({
        type: GET_MY_TRANSACTIONS_REQUEST,
        payload: phoneNumber,
    })
}

export function getMyTransactionsRequestSuccessAction(data: ITransactionInfo[] | []) {
    return ({
        type: GET_MY_TRANSACTIONS_SUCCESS,
        payload: data,
    })
}

export function getMyTransactionsRequestFailureAction(error: any) {
    return ({
        type: GET_MY_TRANSACTIONS_FAILED,
        payload: error,
    })
}


import { ADD_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESSFUL } from "../actionTypes";

const initialState = {
    users: [],
}
export function userReducers(state = initialState, action: {type: string, payload: any}){
    switch(action.type){
        case ADD_USER_REQUEST: return {
            ...state,
            isFetching: true,
        }
        case ADD_USER_SUCCESS: return {
            ...state,
            users: [...action.payload],
            error: null,
            isFetching: false,
        }
        case ADD_USER_FAILED: return {
            ...state,
            error: action.payload,            
            isFetching: true,
        }
        case GET_ALL_USERS_REQUEST: return {
            ...state,
            isFetching: true,
        }
        case GET_ALL_USERS_SUCCESSFUL: return {
            ...state,
            users: [...action.payload],
            error: null,
            isFetching: false,
        }
        case GET_ALL_USERS_FAILED: return {
            ...state,
            error: action.payload,            
            isFetching: true,
        }
    }
}
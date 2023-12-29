import rootReducer from './src/redux/reducers'; // Assume you have a reducers folder with your reducers
// import rootSaga from './src/redux/saga'; // Assume you have a sagas folder with your sagas

import {configureStore} from '@reduxjs/toolkit';
import {actionTypes, firebaseReducer} from 'react-redux-firebase';
// import {firestoreReducer} from 'redux-firestore';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR],
      },
    }),
});

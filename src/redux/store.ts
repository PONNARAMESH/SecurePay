import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers"; // Assume you have a reducers folder with your reducers
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  // devTools: true,
});
sagaMiddleware.run(rootSaga);

export type TRootState = ReturnType<typeof store.getState>;
 // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

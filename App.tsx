import React, { useEffect, useState } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
// import { createStore, applyMiddleware, compose  } from 'redux';
// import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';

import { AuthorizedRoutes, UnAuthorizedRoutes } from "./src/Routes";
import { rootReducer } from "./src/redux/reducers"; // Assume you have a reducers folder with your reducers
import rootSaga from "./src/redux/saga"; // Assume you have a sagas folder with your sagas
import "./src/firebase";
import { ILoggedInUserInfo } from "./src/types";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  // devTools: true,
});

sagaMiddleware.run(rootSaga);

function App(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<ILoggedInUserInfo | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      // console.log("$$$$$$$$$$user-data:", user);
      if (user) {
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
        } = user;
        setUser({
          displayName,
          email,
          emailVerified,
          isAnonymous,
          phoneNumber,
          photoURL,
          providerId,
          // tenantId,
          uid,
        });
      } else {
        setUser(null);
      }
      if (loading) {
        setLoading(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   /** Making this to view the logs in External debugger (react-native-debugger for windows-app) */
  //   NativeDevSettings.setIsDebuggingRemotely(true);
  // }, [])

  if (loading) return <View />;

  return (
    <Provider store={store}>
      {!user ? <UnAuthorizedRoutes /> : <AuthorizedRoutes userInfo={user} />}
    </Provider>
  );
}

export default App;

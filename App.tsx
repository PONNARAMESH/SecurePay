import React, { useEffect, useState } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose  } from 'redux';
// import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';

import { AuthorizedRoutes, UnAuthorizedRoutes } from "./src/Routes";
import "./src/firebase";
import { ILoggedInUserInfo } from "./src/types";
import { store } from "./src/redux/store";


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

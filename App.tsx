/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AuthorizedRoutes, UnAuthorizedRoutes } from "./src/Routes";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const user = auth().currentUser;
  // console.log("##auth: ", user);
  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (loading) {
        setLoading(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) return <View />;

  if (!user) {
    return (
      <UnAuthorizedRoutes />
    );
  }

  return (
    <AuthorizedRoutes />
  );
}

export default App;

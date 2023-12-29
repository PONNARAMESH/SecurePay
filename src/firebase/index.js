import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import { firebaseConfig } from './firebaseConfigs';

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore();
export const firebaseInstance = firebase;
export default firebaseInstance;

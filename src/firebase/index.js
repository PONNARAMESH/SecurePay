import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {firebaseConfig} from './firebaseConfigs';

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseInstance = firebase;
const fireStoreDB = firebaseInstance.firestore();
const collectionName = 'users';

export default firebaseInstance;

export {firebaseInstance, fireStoreDB, collectionName};

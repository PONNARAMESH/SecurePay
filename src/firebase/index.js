import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {firebaseConfig} from './firebaseConfigs';

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseInstance = firebase;
const fireStoreDB = firebaseInstance.firestore();
const collectionNameForUser = 'users';
const collectionNameForTransactions = 'Transactions';
const collectionNameForContactsList = 'myContacts';

export default firebaseInstance;

export {
  firebaseInstance,
  fireStoreDB,
  collectionNameForUser,
  collectionNameForTransactions,
  collectionNameForContactsList
};

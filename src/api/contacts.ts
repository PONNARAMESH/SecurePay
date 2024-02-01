import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { fireStoreDB, collectionNameForContactsList } from "../firebase";
import { IFilterOptions, IContactInfo } from "../types";

export async function getAllMyContactsAPI(phoneNumber: string): Promise<IContactInfo[]> {
  // console.log("##phoneNumber: ", phoneNumber);
  try {
    return fireStoreDB.collection(collectionNameForContactsList)
      .where("parentId", "==", phoneNumber)
      .get()
      .then((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        let arr: IContactInfo[] = [];
        querySnapshot.forEach(documentSnapshot => {
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          arr.push(documentSnapshot.data() as IContactInfo);
        });
        return arr;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export function AddNewContactAPI(
  docId: string,
  data: FirebaseFirestoreTypes.DocumentData
) {
  // console.log("###adding-docId: ", {docId, data});
  try {
    return fireStoreDB
      .collection(collectionNameForContactsList)
      .doc(docId)
      .set(data)
      .then((documentSnapshot) => {
        console.log("New contact added successfully");
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export function updateContactInfoByDocIdAPI(
  docId: string,
  data: FirebaseFirestoreTypes.DocumentData
) {
  try {
    return fireStoreDB
      .collection(collectionNameForContactsList)
      .doc(docId)
      .update(data)
      .then(() => {
        console.log("Updated successfully");
        return true;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}


import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { fireStoreDB, collectionName } from "../firebase";
import { IFilterOptions, IUserAccountInfo } from "../types";

export async function getAllRecordInfoAPI(filterOptions?: IFilterOptions): Promise<IUserAccountInfo[]> {
  // console.log("##filterOptions: ", filterOptions);
  try {
  const { whereCondition} = filterOptions || {};
    let collectionRef = fireStoreDB.collection(collectionName);
    if(whereCondition){
      collectionRef = collectionRef.where(whereCondition?.fieldPath, whereCondition?.opStr, whereCondition?.value) as FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>
    }
    return collectionRef
      .get()
      .then((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        let arr :IUserAccountInfo[] = [];
        querySnapshot.forEach(documentSnapshot => {
            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            arr.push(documentSnapshot.data() as IUserAccountInfo);
        });
        return arr;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export function AddNewRecordAPI(
  docId: string,
  data: FirebaseFirestoreTypes.DocumentData
) {
  // console.log("###adding-docId: ", {docId, data});
  try {
    return fireStoreDB
      .collection(collectionName)
      .doc(docId)
      .set(data)
      .then((documentSnapshot) => {
        console.log("New user added successfully");
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export function updateRecordInfoByDocIdAPI(
  docId: string,
  data: FirebaseFirestoreTypes.DocumentData
) {
  try {
    return fireStoreDB
      .collection(collectionName)
      .doc(docId)
      .update(data) // TODO: this line have to change according to Update action
      .then(() => {
        console.log("Updated successfully");
        return true;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export async function getRecordInfoByDocIdAPI(
  docId: string
): Promise<IUserAccountInfo | null> {
//   console.log("##requested-docId: ", docId);
  try {
    return await fireStoreDB
      .collection(collectionName)
      .doc(docId)
      .get()
      .then((documentSnapshot) => {
        // console.log("User exists: ", documentSnapshot.exists);
        const arr = [];
        if (documentSnapshot.exists) {
          return documentSnapshot.data() as IUserAccountInfo;
        }
        return null;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

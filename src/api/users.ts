import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { fireStoreDB, collectionName } from "../firebase";

export function getAllRecordInfoAPI(): Promise<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>> {
    return fireStoreDB
        .collection(collectionName)
        .get()
        .then(querySnapshot => {
            // console.log('Total users: ', querySnapshot.size);
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            // });
            return { ...querySnapshot };
        })
        .catch((error) => {
            console.log("###error: ", error);
            return error;
        })
}

export function AddNewRecordAPI(docId: string, data: FirebaseFirestoreTypes.DocumentData) {
    console.log("###adding-new-record: ", { docId, data });
    return fireStoreDB
        .collection(collectionName)
        .doc(docId)
        .set(data)
        .then(documentSnapshot => {
            console.log('New user added successfully');
        })
        .catch((error) => {
            console.log("###error: ", error);
            return error;
        })
}

export function updateRecordInfoByDocIdAPI(docId: string, data: FirebaseFirestoreTypes.DocumentData) {
    return fireStoreDB
        .collection(collectionName)
        .doc(docId)
        .set(data) // TODO: this line have to change according to Update action
        .then(documentSnapshot => {
            console.log('Updated successfully');
        })
        .catch((error) => {
            console.log("###error: ", error);
            return error;
        })
}

export function getRecordInfoByDocIdAPI(docId: string) {
    return fireStoreDB
        .collection(collectionName)
        .doc(docId)
        .get()
        .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
                console.log('User data: ', documentSnapshot.data());
                return documentSnapshot.data()
            }
            return null;
        })
        .catch((error) => {
            console.log("###error: ", error);
            return error;
        })
}
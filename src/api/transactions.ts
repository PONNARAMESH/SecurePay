import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { collectionNameForTransactions, fireStoreDB } from "../firebase";
import { EnumTransactionStatusValues, INewPaymentInfo } from "../types";
import { generateTransactionId } from "../utils";
import { getUserInfoByPhoneNumberAPI, updateRecordInfoByDocIdAPI } from "./users";

export async function makePayment(payload: INewPaymentInfo) {
    /**
     * do the following check
     * - does payer have sufficient Balance
     * - update the payer-wallet balance
     * - update the receiver-wallet balance
     * - record the transactions
     */
    const senderAccountInfo = await getUserInfoByPhoneNumberAPI(payload?.sender);
    const receiverAccountInfo = await getUserInfoByPhoneNumberAPI(payload?.receiver);
    const newTxnId = generateTransactionId();
    if (!senderAccountInfo || !senderAccountInfo[0]) {
        // payerInfo not found
        await insertNewTransaction(newTxnId, {
            ...payload,
            id: newTxnId,
            txnStatus: EnumTransactionStatusValues.TTxnFailed,
            failedMessage: "Payer don't not exist",
        });
    }
    if (!receiverAccountInfo || !receiverAccountInfo[0]) {
        // receiverInfo not found
        await insertNewTransaction(newTxnId, {
            ...payload,
            id: newTxnId,
            txnStatus: EnumTransactionStatusValues.TTxnFailed,
            failedMessage: "Receiver don't not exist",
        });
    }

    const {
        uid,
        balance,
    } = senderAccountInfo[0];

    if (Number(payload?.amount) > Number(balance)) {
        // Insufficient-balance
        await insertNewTransaction(newTxnId, {
            ...payload,
            id: newTxnId,
            txnStatus: EnumTransactionStatusValues.TTxnFailed,
            failedMessage: "Payer don't not exist",
        });
    }
    // Debit from payer account
    await updateRecordInfoByDocIdAPI(uid as string, {
        balance: Number(balance || 0) - Number(payload.amount),
    });
    // Credit into receiver account
    await updateRecordInfoByDocIdAPI(receiverAccountInfo[0]?.uid as string, {
        balance: Number(receiverAccountInfo[0]?.balance || 0) + Number(payload.amount),
    });


    // Insufficient-balance
    await insertNewTransaction(newTxnId, {
        ...payload,
        id: newTxnId,
        txnStatus: EnumTransactionStatusValues.TTxnSuccess,
        failedMessage: null,
    });

}


export function insertNewTransaction(
    docId: string,
    data: FirebaseFirestoreTypes.DocumentData
) {
    // console.log("###adding-docId: ", {docId, data});
    try {
        return fireStoreDB
            .collection(collectionNameForTransactions)
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

// export async function getAllTransactionsAPI(filterOptions?: IFilterOptions): Promise<IUserAccountInfo[]> {
//     // console.log("##filterOptions: ", filterOptions);
//     try {
//         const { whereCondition } = filterOptions || {};
//         let collectionRef = fireStoreDB.collection(collectionNameForUser);
//         if (whereCondition) {
//             collectionRef = collectionRef.where(whereCondition?.fieldPath, whereCondition?.opStr, whereCondition?.value) as FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>
//         }
//         return collectionRef
//             .get()
//             .then((querySnapshot) => {
//                 // console.log('Total users: ', querySnapshot.size);
//                 let arr: IUserAccountInfo[] = [];
//                 querySnapshot.forEach(documentSnapshot => {
//                     // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//                     arr.push(documentSnapshot.data() as IUserAccountInfo);
//                 });
//                 return arr;
//             });
//     } catch (error) {
//         console.log("###error: ", error);
//         throw error;
//     }
// }

// export async function getTransactionInfoByTxnId(phoneNumber: string): Promise<IUserAccountInfo[]> {
//     // console.log("##filterOptions: ", filterOptions);
//     try {
//         return fireStoreDB.collection(collectionNameForUser)
//             .where('phoneNumber', "==", phoneNumber)
//             .get()
//             .then((querySnapshot) => {
//                 // console.log('Total users: ', querySnapshot.size);
//                 let arr: IUserAccountInfo[] = [];
//                 querySnapshot.forEach(documentSnapshot => {
//                     // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//                     arr.push(documentSnapshot.data() as IUserAccountInfo);
//                 });
//                 return arr;
//             });
//     } catch (error) {
//         console.log("###error: ", error);
//         throw error;
//     }
// }
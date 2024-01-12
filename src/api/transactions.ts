import firestore, {
  Filter,
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { collectionNameForTransactions, fireStoreDB } from "../firebase";
import {
  EnumTransactionStatusValues,
  IFilterOptions,
  IGetMutualTransactionsPayload,
  INewPaymentInfo,
  ITransactionInfo,
} from "../types";
import { generateTransactionId } from "../utils";
import {
  getUserInfoByPhoneNumberAPI,
  updateRecordInfoByDocIdAPI,
} from "./users";

export async function makePayment(payload: INewPaymentInfo) {
  /**
   * do the following check
   * - does payer have sufficient Balance
   * - update the payer-wallet balance
   * - update the receiver-wallet balance
   * - record the transactions
   */
  const senderAccountInfo = await getUserInfoByPhoneNumberAPI(payload?.sender);
  const receiverAccountInfo = await getUserInfoByPhoneNumberAPI(
    payload?.receiver
  );

  const newTxnId = generateTransactionId(); // generating transaction-Id
  const createdAt = new Date().toJSON(); // creating time-stamp for the transaction
  const txnType = "WalletToWallet"; // mean, transferring from PhoneNumber-to-PhoneNumber

  if (!senderAccountInfo || !senderAccountInfo[0]) {
    // payerInfo not found
    await insertNewTransaction(newTxnId, {
      ...payload,
      id: newTxnId,
      txnStatus: EnumTransactionStatusValues.TTxnFailed,
      failedMessage: "Payer don't not exist",
      txnType,
      createdAt,
    });
  }
  if (!receiverAccountInfo || !receiverAccountInfo[0]) {
    // receiverInfo not found
    await insertNewTransaction(newTxnId, {
      ...payload,
      id: newTxnId,
      txnStatus: EnumTransactionStatusValues.TTxnFailed,
      failedMessage: "Receiver don't not exist",
      txnType,
      createdAt,
    });
  }

  const { uid, balance } = senderAccountInfo[0];

  if (Number(payload?.amount) > Number(balance)) {
    // Insufficient-balance
    await insertNewTransaction(newTxnId, {
      ...payload,
      id: newTxnId,
      txnStatus: EnumTransactionStatusValues.TTxnFailed,
      failedMessage: "Payer don't not exist",
      txnType,
      createdAt,
    });
  }
  // Debit from payer account
  await updateRecordInfoByDocIdAPI(uid as string, {
    balance: Number(balance || 0) - Number(payload.amount),
  });
  // Credit into receiver account
  await updateRecordInfoByDocIdAPI(receiverAccountInfo[0]?.uid as string, {
    balance:
      Number(receiverAccountInfo[0]?.balance || 0) + Number(payload.amount),
  });

  // Insufficient-balance
  await insertNewTransaction(newTxnId, {
    ...payload,
    id: newTxnId,
    txnStatus: EnumTransactionStatusValues.TTxnSuccess,
    failedMessage: null,
    txnType,
    createdAt,
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
        console.log("New Txn created successfully");
        return true;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export async function getTransactionInfoByTxnId(
  txnId: string
): Promise<ITransactionInfo | null> {
  // console.log("##txnId: ", txnId);
  try {
    return fireStoreDB
      .collection(collectionNameForTransactions)
      .where("id", "==", txnId)
      .get()
      .then((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        let arr: ITransactionInfo[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          return documentSnapshot.data() as ITransactionInfo;
        });
        return null;
      });
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export async function getMyTransactionsAPI(
  myPhoneNumber: string
): Promise<ITransactionInfo[] | []> {
  console.log("##myPhoneNumber: ", myPhoneNumber);
  try {
    return (
      fireStoreDB
        .collection(collectionNameForTransactions)
        // .where({
        //     operator: "OR",
        //     queries: [
        //         { fieldPath: 'sender', operator: '==', value: myPhoneNumber},
        //         { fieldPath:'receiver', operator: '==', value: myPhoneNumber},
        //     ]
        // })
        .get()
        .then((querySnapshot) => {
          // console.log("Total users: ", querySnapshot.size);
          let arr: ITransactionInfo[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            const txn = documentSnapshot.data() as ITransactionInfo;
            if ([txn.sender, txn.receiver].includes(myPhoneNumber)) {
              arr.push(txn);
            }
          });
          return arr;
        })
    );
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

export async function getMutualTransactionsAPI(
  payload: IGetMutualTransactionsPayload
): Promise<ITransactionInfo[] | []> {
  // console.log("##myPhoneNumber: ", payload);
  const { senderPhoneNumber, receiverPhoneNumber } = payload;
  try {
    return (
      fireStoreDB
        .collection(collectionNameForTransactions)
        // .where({
        //     operator: "OR",
        //     queries: [
        //         { fieldPath: 'sender', operator: "in", value: [senderPhoneNumber, receiverPhoneNumber]},
        //         { fieldPath:'receiver', operator: "in", value: [senderPhoneNumber, receiverPhoneNumber]},
        //     ]
        // })
        .get()
        .then((querySnapshot) => {
          // console.log("Total users: ", querySnapshot.size);
          let arr: ITransactionInfo[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            const txn = documentSnapshot.data() as ITransactionInfo;
            if (
              (txn.sender === senderPhoneNumber &&
                txn.receiver === receiverPhoneNumber) ||
              (txn.sender === receiverPhoneNumber &&
                txn.receiver === senderPhoneNumber)
            ) {
              arr.push(txn);
            }
          });
          return arr;
        })
    );
  } catch (error) {
    console.log("###error: ", error);
    throw error;
  }
}

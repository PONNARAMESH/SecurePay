import { useState } from "react";
import { IGetMutualTransactionsPayload, ITransactionInfo } from "../types";
import { getMutualTransactionsAPI } from "../api/transactions";

export function useGetMutualTransactions() {
  const [mutualTransactions, setMutualTransactions] = useState<
    ITransactionInfo[] | []
  >([]);

  const [
    isFetchingMutualTransactions,
    setIsFetchingMutualTransactions,
  ] = useState<boolean>(false);

  function getMutualTransactionAPICall(payload: IGetMutualTransactionsPayload) {
    // console.log("##payload: ", payload)
    setIsFetchingMutualTransactions(true);
    getMutualTransactionsAPI({ ...payload })
      .then((res) => {
        // console.log('##Mutual-transactions: ', res);
        setIsFetchingMutualTransactions(false);
        res && setMutualTransactions(res);
      })
      .catch((error) => {
        // console.log("##error: ", error);
        setIsFetchingMutualTransactions(false);
        return error;
      });
  }

  return {
    getMutualTransactionAPICall,
    mutualTransactions,
    isFetchingMutualTransactions,
  };
}

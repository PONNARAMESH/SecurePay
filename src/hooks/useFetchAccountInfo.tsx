import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecordInfoByDocIdAPI } from "../api/users";
import { ILoggedInUserInfo, IUserAccountInfo } from "../types";

export function useFetchAccountInfo(userId: string = "") {
  // console.log("##userId: ", userId)
  const [
    userAccountInfo,
    setUserAccountInfo,
  ] = useState<IUserAccountInfo | null>(null);
  useEffect(() => {
    getRecordInfoByDocIdAPI(userId)
      .then((res) => {
        // console.log('##AccountInfo: ', res);
        res && setUserAccountInfo(res);
      })
      .catch((error) => {
        // console.log("##error: ", error);
        return error;
      });
  }, [userId]);
  return userAccountInfo;
}

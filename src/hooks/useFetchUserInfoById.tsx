import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecordInfoByDocIdAPI } from "../api/users";
import { ILoggedInUserInfo, IUserAccountInfo } from "../types";

export function useFetchUserInfoById(userId: string = "") {
  // console.log("##userId: ", userId)
  const [
    userAccountInfo,
    setUserAccountInfo,
  ] = useState<IUserAccountInfo | null>(null);
  const [isFetchingAccountInfo, setIsFetchingAccountInfo] = useState<boolean>(true);
  useEffect(() => {
    setIsFetchingAccountInfo(true);
    getRecordInfoByDocIdAPI(userId)
      .then((res) => {
        // console.log('##AccountInfo: ', res);
        res && setUserAccountInfo(res);
        setIsFetchingAccountInfo(false);
      })
      .catch((error) => {
        // console.log("##error: ", error);
        setIsFetchingAccountInfo(false);
        return error;
      });
  }, [userId]);
  return {userAccountInfo, isFetchingAccountInfo};
}

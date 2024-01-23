import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoByPhoneNumberAPI } from "../api/users";
import { ILoggedInUserInfo, IUserAccountInfo } from "../types";

export function useFetchUserInfoByPhoneNumber(phoneNumber: string = "") {
  // console.log("##phoneNumber: ", phoneNumber)
  const [
    userAccountInfo,
    setUserAccountInfo,
  ] = useState<IUserAccountInfo | null>(null);
  useEffect(() => {
    getUserInfoByPhoneNumberAPI(phoneNumber)
      .then((res) => {
        // console.log('##AccountInfo: ', res);
        res && setUserAccountInfo(res);
      })
      .catch((error) => {
        // console.log("##error: ", error);
        return error;
      });
  }, [phoneNumber]);
  return userAccountInfo;
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecordInfoAPI } from "../api/users";
import { IFilterOptions, ILoggedInUserInfo, IUserAccountInfo } from "../types";
import { IUserLoginErrorInfo } from "../redux/reducers/userAccount";

export function useFetchMyContactsList() {
  // console.log("##userId: ", userId)
  const [
    myContacts,
    setMyContacts,
  ] = useState<IUserAccountInfo[] | null>(null);
  const [isFetchingMyContacts, setIsFetchingMyContacts] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<IUserLoginErrorInfo | null>(null);

  function fetchContactsInfoAPICall(mobileNumbers: string[]) {
    const filterOptions: IFilterOptions = {
      whereCondition: {
        fieldPath: 'phoneNumber',
        opStr: "in",
        value: mobileNumbers.length ? mobileNumbers : [""]
      }
    };
    setIsFetchingMyContacts(true); // setting 'fetchingStatus' as 'true'
    getAllRecordInfoAPI(filterOptions)
      .then((res) => {
        // console.log('##Contacts: ', JSON.stringify(res,null,4));
        res && setMyContacts(res);
        setIsFetchingMyContacts(false);
        setErrorInfo(null);
      })
      .catch((error) => {
        const {code, message} = error;
        console.log("##error: ", error);
        setIsFetchingMyContacts(false);
        setErrorInfo({code, message});
      });
  }

  return {
    fetchContactsInfoAPICall,
    myContacts,
    isFetchingMyContacts,
    errorInfo
  };
}

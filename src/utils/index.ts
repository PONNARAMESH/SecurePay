import { IContactInfo, IUserAccountInfo } from "../types";

export { findInputError } from "./findInputError";
export { isFormInvalid } from "./isFormInvalid";

export const initialBalance = 1000;
let currentAccountNumber = 1000; // initial Sequence-value to generate a sequence of Account-numbers

export function generateAccountNumber() {
  const bankCode = "501"; // Replace with the actual bank code
  const accountType = "01"; // Replace with the account type code

  const accountNumber =
    bankCode + accountType + currentAccountNumber.toString().padStart(8, "0");
  currentAccountNumber++; //increase it with +1, to be ready generate next account number;
  return accountNumber;
}

export function maskAccountNumber(accountNumber: string) {
  /**
   * Input: accountNumber = '123456789012'
   * Output: '*********9012'
   */

  // Define the number of digits to reveal at the end
  const visibleDigits = 4;

  // Check if the account number is long enough to mask
  if (accountNumber.length > visibleDigits) {
    // Extract the last 'visibleDigits' characters
    const visiblePart = accountNumber.slice(-visibleDigits);

    // Replace the remaining characters with "*"
    const maskedPart = "*".repeat(accountNumber.length - visibleDigits);

    // Concatenate the masked and visible parts
    const maskedAccountNumber = maskedPart + visiblePart;

    return maskedAccountNumber;
  } else {
    // If the account number is too short, return it as is
    return accountNumber;
  }
}

export function mashPhoneNumber(phoneNumber: string) {
  /**
   * Input: accountNumber = '9876543210'
   * Output: 'XXXXXX3210'
   */
  // Define the number of digits to reveal at the end
  const visibleDigits = 4;

  // Check if the account number is long enough to mask
  if (phoneNumber.length > visibleDigits) {
    // Extract the last 'visibleDigits' characters
    const visiblePart = phoneNumber.slice(-visibleDigits);

    // Replace the remaining characters with "*"
    const maskedPart = "X".repeat(phoneNumber.length - visibleDigits);

    // Concatenate the masked and visible parts
    const maskedAccountNumber = maskedPart + visiblePart;

    return maskedAccountNumber;
  } else {
    // If the account number is too short, return it as is
    return phoneNumber;
  }
}

export function convertIntoCurrency(value: number, withCurrencySymbol = false) {
  const options = !withCurrencySymbol
    ? {}
    : {
        style: "currency",
        currency: "INR",
      };
  const IndianRupees = new Intl.NumberFormat("en-IN", options);
  return IndianRupees.format(value);
}

export function generateTransactionId() {
  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // Random 4-digit number
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth();
  const dd = now.getDate();
  const hh = now.getHours();
  const MM = now.getMinutes();
  const ss = now.getSeconds();
  const ms = now.getMilliseconds();
  return "T" + yyyy + mm + dd + hh + MM + ss + ms + randomDigits;
}

export function removeNullUndefined(obj: any) {
  /**
   * Input: { foo: null, bar: undefined, fuzz: 42 }
   * Output: {fuzz: 42}
   */
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export function isUrlValid(inputUrl: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(inputUrl);
}

export function isItOutgoingTransaction(
  loggedInfoUserPhoneNumber: string,
  paymentSenderPhoneNumber: string
) {
  return loggedInfoUserPhoneNumber === paymentSenderPhoneNumber ? true : false;
}

export function groupTheContactsBasedOnAlphabeticalOrder(contactsList: IContactInfo[] | []) {
  if(
    !contactsList ||
    !Array.isArray(contactsList) ||
    !contactsList.length
  ) {
    return [];
  }
  let newObj: Record<string, IContactInfo[]> = {};
  // console.log("##contacts: ", JSON.stringify(contactsList, null, 4));
  contactsList.sort((a, b) => {
    if(a?.displayName?.toLocaleLowerCase() == b?.displayName?.toLocaleLowerCase()) return 0;
    if(a?.displayName?.toLocaleLowerCase() > b?.displayName?.toLocaleLowerCase()) return 1;
    return -1;
  });
  
  for(let contact of contactsList) {
    const letter = contact.displayName?.charAt(0).toLocaleUpperCase() || ' ';
    if (newObj[letter]) {
      newObj[letter].push(contact);
    } else {
      newObj[letter] = [];
      newObj[letter].push(contact);
    }
  }
  return newObj;
}

// program to generate random strings
export function generateRandomId(length=10) {
  // declare all characters
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

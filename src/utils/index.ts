export { findInputError } from './findInputError'
export { isFormInvalid } from './isFormInvalid'

export const initialBalance = 1000;
let currentAccountNumber = 1000; // initial Sequence-value to generate a sequence of Account-numbers

export function generateAccountNumber() {
  const bankCode = "501"; // Replace with the actual bank code
  const accountType = "01"; // Replace with the account type code

  const accountNumber = bankCode + accountType + currentAccountNumber.toString().padStart(8, '0');
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
    const maskedPart = '*'.repeat(accountNumber.length - visibleDigits);

    // Concatenate the masked and visible parts
    const maskedAccountNumber = maskedPart + visiblePart;

    return maskedAccountNumber;
  } else {
    // If the account number is too short, return it as is
    return accountNumber;
  }
}

export function generateTransactionId() {
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Random 4-digit number
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth();
  const dd = now.getDate();
  const hh = now.getHours();
  const MM = now.getMinutes();
  const ss = now.getSeconds();
  const ms = now.getMilliseconds();
  return 'T' + yyyy + mm + dd + hh + MM + ss + ms + randomDigits;
}

export function removeNullUndefined(obj: any) {
  /**
   * Input: { foo: null, bar: undefined, fuzz: 42 }
   * Output: {fuzz: 42}
   */
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
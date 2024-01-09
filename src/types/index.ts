export interface IUserEmailInfo {
  email: string;
  password: string;
}

export interface IUserSignUpInfo extends IUserEmailInfo {
  displayName: string;
  phoneNumber: string;
}

export enum EUserLoginStatus {
  YET_TO_LOGIN = "YET_TO_LOGIN",
  LOGIN_REQUESTED = "LOGIN_REQUESTED",
  LOGGED_IN_SUCCESSFULLY = "LOGGED_IN_SUCCESSFULLY",
  LOGGED_IN_FAILED = "LOGGED_IN_FAILED",
}
export type IUserLoginStatus =
  | EUserLoginStatus.YET_TO_LOGIN
  | EUserLoginStatus.LOGIN_REQUESTED
  | EUserLoginStatus.LOGGED_IN_SUCCESSFULLY
  | EUserLoginStatus.LOGGED_IN_FAILED;

export interface ILoggedInUserInfo {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous?: boolean;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string | null;
  tenantId?: string | null;
  uid: string | null;
  contactsList: string[] | null;
}

export interface IUserAccountInfo extends ILoggedInUserInfo {
  balance: number | null;
  accountNumber: string;
}

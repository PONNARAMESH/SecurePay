import { IUserEmailInfo } from "../types";
import { firebaseInstance } from "../firebase";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from "react-native";

export function userLoginAPI(data: IUserEmailInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { emailId, password } = data;
            auth().signInWithEmailAndPassword(emailId, password)
                .then((data) => {
                    // console.log("##API: ", data);
                    resolve(data);
                })
                .catch((error: any) => {
                    console.log("##error: ", error.message)
                    reject(error);
                    Alert.alert(
                        'Alert',
                        "Something is wrong with your credentials. Please enter correct details!",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => { console.log('Cancel Pressed') },
                                style: 'cancel',
                            },
                        ]
                    )
                });
        } catch (error) {
            reject(error);
        }
    })
}

export function userSignUpAPI(data: IUserEmailInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { emailId, password } = data;
            auth().createUserWithEmailAndPassword(emailId, password)
                .then((data) => {
                    // console.log("##API: ", data);
                    resolve(data);
                })
                .catch((error: any) => {
                    console.log("##error: ", error.message)
                    reject(error);
                    Alert.alert(
                        'Alert',
                        "Something is wrong with your credentials. Please enter correct details!",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => { console.log('Cancel Pressed') },
                                style: 'cancel',
                            },
                        ]
                    )
                });
        } catch (error) {
            reject(error);
        }
    })
}

export function userSignOutAPI(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
        try {
            console.log(">>>>triggering-SING_OUT API<<<<<");
            auth()
                .signOut()
                .then(() => {
                    console.log('User signed out!');
                    Alert.alert(
                        'Alert',
                        "You have logged out Successfully!!!",
                        [
                            {
                                text: 'Ok',
                                onPress: () => { console.log('Logged Out') },
                            },
                        ]
                    )
                    return true;
                })
                .catch((error: any) => {
                    console.log("##error: ", error.message)
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    })
}
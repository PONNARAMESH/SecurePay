import { IUserEmailInfo } from "../types";
import { firebaseInstance } from "../firebase";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { fireStoreDB } from "../firebase";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
export function userLoginAPI(data: IUserEmailInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { email, password } = data;
            auth().signInWithEmailAndPassword(email, password)
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

export function  userSignUpAPI(data: IUserEmailInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { email, password } = data;
            auth().createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    // console.log("##API: ", data);
                    resolve(data);
                })
                .catch((error: any) => {
                    console.log("##error: ", error.message);

                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert(
                            'Alert',
                            "That email address is already in use!",
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => { console.log('Cancel Pressed') },
                                },
                            ]
                        )
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert(
                            'Alert',
                            "That email address is invalid!",
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => { console.log('Cancel Pressed') },
                                },
                            ]
                        )
                    } else {
                        Alert.alert(
                            'Alert',
                            "Something went wrong. Plesae try again after sometime!",
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]
                        )
                    }
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    })
}

export function userSignOutAPI(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
        try {
            // console.log(">>>>triggering-SING_OUT API<<<<<");
            auth()
                .signOut()
                .then(() => {
                    // console.log('User signed out!');
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

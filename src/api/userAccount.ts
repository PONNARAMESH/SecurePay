import { IUserEmailInfo, IUserSignUpInfo } from "../types";
import { firebaseInstance } from "../firebase";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from "react-native";
export function userLoginAPI(data: IUserEmailInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { email, password } = data;
            firebaseInstance.auth().signInWithEmailAndPassword(email, password)
                .then(async (data) => {
                    // console.log("##API: ", data);
                    resolve(data);
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

export function  userSignUpAPI(data: IUserSignUpInfo): Promise<FirebaseAuthTypes.UserCredential | Error> {
    return new Promise((resolve, reject) => {
        try {
            const { email, password } = data;
            auth().createUserWithEmailAndPassword(email, password)
                .then(async (res) => {
                    // console.log("##API: ", res);
                    firebaseInstance.auth().currentUser?.updateProfile({
                        displayName: data.displayName
                    }).then((updateRes) => {
                        // console.log("##updateRes: ", updateRes);
                        resolve(res);
                    }).catch((error) => {
                        console.log("##updateRes-error: ", error);
                        resolve(res);
                    })
                })
                .catch((error: any) => {
                    console.log("##error: ", error.message);
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

import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Alert,
    Button,
} from 'react-native';
import { useForm } from 'react-hook-form';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Devider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SignUpScreen(props: { navigation: any; route: any }): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';
    const { register, setValue, handleSubmit, formState: { errors }, getValues, reset } = useForm();
    const { name, emailId, password, confirmPassword } = getValues();

    const hanldeRest = () => {
        console.log("##restting the form data");
        reset({
            name: '',
            emailId: '',
            password: '',
            confirmPassword: '',
        });
    }

    const onSingUp = (data: any) => {
        // Alert.alert("you've clicked on Sing Up button");
        console.log("###createing new user!!");
        // console.log("##loging in ---->", data);
        const { emailId, password } = data;

        auth()
            .createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch((error: any) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
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
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
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
                }

                console.error('##error: ', error);
                Alert.alert(
                    'Alert',
                    "Something went wrong. Plesae try again after sometime!",
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
            });
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    };

    React.useEffect(() => {
        register('emailId', { required: 'required' });
        register('password', { required: 'required' });
    }, [register])

    // console.log('##errors: ', errors);
    return (
        <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={[backgroundStyle]}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={mashreqBankLogo}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Text style={styles.pageTitle}>Create Account</Text>
                </View>
                <Input
                    id="name"
                    name="Name"
                    label="Name"
                    keyboardType="ascii-capable"
                    placeholder="Please give your Name here.."
                    onChangeText={text => setValue('name', text, { shouldValidate: true })}
                    errors={errors}
                    value={name}
                />
                <Input
                    id="emailId"
                    name="Email Id"
                    label="Email Id"
                    keyboardType="email-address"
                    placeholder="Please give your email Id here.."
                    onChangeText={text => setValue('emailId', text, { shouldValidate: true })}
                    errors={errors}
                    value={emailId}
                />
                <Input
                    id="password"
                    name="Password"
                    label="Password"
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder="Please give your password here.."
                    onChangeText={text => setValue('password', text, { shouldValidate: true })}
                    errors={errors}
                    value={password}
                />
                <Input
                    id="confirmPassword"
                    name="Confirm Password"
                    label="Confirm Password"
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder="Please confirm your password"
                    onChangeText={text => setValue('confirmPassword', text, { shouldValidate: true })}
                    errors={errors}
                    value={confirmPassword}
                />
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        title="Reset"
                        onPress={hanldeRest}
                        color="lightblue"
                    />
                    <CustomButton
                        title="Sing UP"
                        onPress={handleSubmit(onSingUp)}
                        color="blue"
                    />
                </View>
                <Devider label="Or" color={"gray"} />
                <CustomButton
                    title="Log In"
                    // onPress={() => { navigation?.navigate(routeInfo?.LOG_IN) }}
                    onPress={() => { navigation?.goBack() }}
                    color="green"
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // // just for testing
        // borderWidth: 2,
        // borderColor: 'red',
    },
    pageTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.appTheamColor,
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    separator: {
        marginVertical: 20,
        borderWidth: 2,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // marginTop: 10,
        // marginBottom: 10,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 5,
    }
});

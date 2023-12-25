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
    TouchableHighlight,
} from 'react-native';
import { useForm } from 'react-hook-form';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Devider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { email_validation, password_validation } from "../../utils/inputValidations";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LoginScreen(props: { navigation: any; }): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';

    const { register, setValue, handleSubmit, formState: { errors }, reset, getValues } = useForm();
    const { emailId, password } = getValues();

    const hanldeRest = () => {
        console.log("##restting the form data");
        reset({
            emailId: '',
            password: ''
        });
    }

    const onSubmit = (data: any) => {
        // console.log("##loging in ---->", data);
        const { emailId, password } = data;
        auth().signInWithEmailAndPassword(emailId, password)
            .then(() => navigation.navigate(routeInfo?.HOME_SCREEN))
            .catch((error: any) => {
                console.log("##error: ", error.message)
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
    }

    React.useEffect(() => {
        register(email_validation?.id, email_validation?.validation);
        register(password_validation.id, password_validation.validation);
    }, [register])

    // console.log('##errors: ', errors);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    };

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
                    <Text style={styles.pageTitle}>Log In to your Account</Text>
                </View>
                <Input
                    id={email_validation?.id}
                    name={email_validation?.name}
                    label={email_validation?.label}
                    keyboardType="email-address"
                    placeholder={email_validation?.placeholder}
                    onChangeText={text => setValue(email_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={emailId || ''}
                />
                <Input
                    id={password_validation?.id}
                    name={password_validation?.name}
                    label={password_validation?.label}
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder={password_validation?.placeholder}
                    onChangeText={text => setValue(password_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={password || ''}
                />
                <View style={styles.buttonsContainer}>
                    {/* <CustomButton
                        title="Reset"
                        onPress={hanldeRest}
                        color="lightblue"
                    /> */}
                    <CustomButton
                        title="Log In"
                        onPress={handleSubmit(onSubmit)}
                        color={colors.green}
                    />
                </View>
                <View style={styles.forgotPasswordContainer}>
                    <TouchableHighlight style={{ marginVertical: 5 }}>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableHighlight>
                </View>

                <Devider label="Or" color={"gray"} />
                <CustomButton
                    title="Registration/Sing Up"
                    onPress={() => { navigation?.navigate(routeInfo?.SIGN_UP) }}
                    color={colors.blue}
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
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: "space-between",
        marginTop: 5,
    },
    forgotPasswordContainer: {
        marginTop: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    forgotPasswordText: {
        color: colors.green,
    }
});

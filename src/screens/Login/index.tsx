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
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { email_validation, password_validation } from "../../utils/inputValidations";
import { userSingInAction } from "../../redux/actions/userAccount";
import { Avatar } from "@rneui/themed";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LoginScreen(props: { navigation: any; }): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();

    const { register, setValue, handleSubmit, formState: { errors }, reset, getValues } = useForm();
    const { email, password } = getValues();

    const handleRest = () => {
        console.log("##restting the form data");
        reset({
            email: '',
            password: ''
        });
    }

    const onSubmit = (data: any) => {
        dispatch(userSingInAction(data));
    }

    React.useEffect(() => {
        register(email_validation?.id, email_validation?.validation);
        register(password_validation.id, password_validation.validation);
    }, [register])

    // console.log('##errors: ', errors);

    const backgroundStyle = {
        // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
        backgroundColor: Colors?.appThemeColorLight,
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
                    <Avatar
                        size={100}
                        rounded={true}
                        source={mashreqBankLogo}
                        // containerStyle={styles.tinyLogo}
                    />
                    {/* <Image
                        style={styles.tinyLogo}
                        source={mashreqBankLogo}
                    /> */}
                </View>
                <View style={styles.imageContainer}>
                    <Text style={styles.pageTitle}>Log In to your Account</Text>
                </View>
                <Input
                    id={email_validation?.id}
                    name={email_validation?.name}
                    label={email_validation?.label}
                    inputMode="email"
                    placeholder={email_validation?.placeholder}
                    onChangeText={text => setValue(email_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={email || ''}
                />
                <Input
                    id={password_validation?.id}
                    name={password_validation?.name}
                    label={password_validation?.label}
                    secureTextEntry={true}
                    inputMode="text"
                    placeholder={password_validation?.placeholder}
                    onChangeText={text => setValue(password_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={password || ''}
                />
                <View style={styles.buttonsContainer}>
                    {/* <CustomButton
                        title="Reset"
                        onPress={handleRest}
                        color="lightblue"
                    /> */}
                    <CustomButton
                        title="Log In"
                        onPress={handleSubmit(onSubmit)}
                        color={colors.appThemeColor}
                    />
                </View>
                <View style={styles.forgotPasswordContainer}>
                    <TouchableHighlight style={{ marginVertical: 5 }}>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableHighlight>
                </View>

                <Divider label="Or" color={"gray"} />
                <CustomButton
                    title="Don't have account? click here..."
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
        color: colors.appThemeColor,
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius: 75,
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
        // color: colors.green,
    }
});

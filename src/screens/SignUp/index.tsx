import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import {
    confirm_password_validation,
    email_validation,
    full_name_validation,
    mobile_number_validation,
    password_validation
} from "../../utils/inputValidations";
import { userSingUpAction } from "../../redux/actions";
import { Avatar } from "@rneui/base";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SignUpScreen(props: { navigation: any; route: any }): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const { register, setValue, handleSubmit, formState: { errors }, getValues, reset, watch } = useForm();
    const { displayName, phoneNumber, email, password, confirmPassword } = getValues();

    const handleRest = () => {
        console.log("##restting the form data");
        reset({});
    }

    const onSingUp = (data: any) => {
        dispatch(userSingUpAction(data));
    }

    const backgroundStyle = {
        // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
        backgroundColor: Colors?.appThemeColorLight,
    };

    React.useEffect(() => {
        register(full_name_validation?.id, full_name_validation?.validation);
        register(mobile_number_validation?.id, mobile_number_validation?.validation);
        register(email_validation?.id, email_validation?.validation);
        register(password_validation?.id, password_validation?.validation);
        register(confirm_password_validation?.id, {
            validate: (val: string) => {
                if (watch('password') != val) {
                    return "Your passwords do no match";
                }
            },
            ...confirm_password_validation?.validation,
        });
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
                    <Text style={styles.pageTitle}>Create Account</Text>
                </View>
                <Input
                    id={full_name_validation?.id}
                    name={full_name_validation?.name}
                    label={full_name_validation?.label}
                    inputMode="text"
                    placeholder={full_name_validation?.placeholder}
                    onChangeText={text => setValue(full_name_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={displayName || ''}
                />
                <Input
                    id={mobile_number_validation?.id}
                    name={mobile_number_validation?.name}
                    label={mobile_number_validation?.label}
                    inputMode="tel"
                    placeholder={mobile_number_validation?.placeholder}
                    onChangeText={text => setValue(mobile_number_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={phoneNumber || ''}
                />
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
                <Input
                    id={confirm_password_validation?.id}
                    name={confirm_password_validation?.name}
                    label={confirm_password_validation?.label}
                    secureTextEntry={true}
                    inputMode="text"
                    placeholder={confirm_password_validation?.placeholder}
                    onChangeText={text => setValue(confirm_password_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={confirmPassword || ''}
                />
                <View style={styles.buttonsContainer}>
                    {/* <CustomButton
                        title="Reset"
                        onPress={handleRest}
                        color="lightblue"
                    /> */}
                    <CustomButton
                        title="Sing UP"
                        onPress={handleSubmit(onSingUp)}
                        color={colors?.appThemeColor}
                    />
                </View>
                <Divider label="Or" color={"gray"} />
                <CustomButton
                    title="Already have an account? let's go to Log In.."
                    // onPress={() => { navigation?.navigate(routeInfo?.LOG_IN) }}
                    onPress={() => { navigation?.goBack() }}
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
    }
});

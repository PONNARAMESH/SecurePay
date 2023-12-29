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
import { useDispatch } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { confirm_password_validation, email_validation, password_validation } from "../../utils/inputValidations";
import { userSingUpAction } from "../../redux/actions";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SignUpScreen(props: { navigation: any; route: any }): React.JSX.Element {
    const { navigation } = props;
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const { register, setValue, handleSubmit, formState: { errors }, getValues, reset, watch } = useForm();
    const { name, emailId, password, confirmPassword } = getValues();

    const hanldeRest = () => {
        console.log("##restting the form data");
        reset({});
    }

    const onSingUp = (data: any) => {
        const { emailId, password } = data;
        dispatch(userSingUpAction(data));
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    };

    React.useEffect(() => {
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
                    <Image
                        style={styles.tinyLogo}
                        source={mashreqBankLogo}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Text style={styles.pageTitle}>Create Account</Text>
                </View>
                {/* <Input
                    id="name"
                    name="Name"
                    label="Name"
                    keyboardType="ascii-capable"
                    placeholder="Please give your Name here.."
                    onChangeText={text => setValue('name', text, { shouldValidate: true })}
                    errors={errors}
                    value={name}
                /> */}
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
                <Input
                    id={confirm_password_validation?.id}
                    name={confirm_password_validation?.name}
                    label={confirm_password_validation?.label}
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder={confirm_password_validation?.placeholder}
                    onChangeText={text => setValue(confirm_password_validation?.id, text, { shouldValidate: true })}
                    errors={errors}
                    value={confirmPassword || ''}
                />
                <View style={styles.buttonsContainer}>
                    {/* <CustomButton
                        title="Reset"
                        onPress={hanldeRest}
                        color="lightblue"
                    /> */}
                    <CustomButton
                        title="Sing UP"
                        onPress={handleSubmit(onSingUp)}
                        color={colors?.blue}
                    />
                </View>
                <Divider label="Or" color={"gray"} />
                <CustomButton
                    title="Log In"
                    // onPress={() => { navigation?.navigate(routeInfo?.LOG_IN) }}
                    onPress={() => { navigation?.goBack() }}
                    color={colors.green}
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
    }
});

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
                    <Text style={styles.pageTitle}>Create Account</Text>
                </View>
                <Input
                    id="name"
                    name="Name"
                    label="Name"
                    keyboardType="ascii-capable"
                    placeholder="Please give your Name here.."
                />
                <Input
                    id="emailId"
                    name="Email Id"
                    label="Email Id"
                    keyboardType="email-address"
                    placeholder="Please give your email Id here.."
                />
                <Input
                    id="password"
                    name="Password"
                    label="Password"
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder="Please give your password here.."
                />
                <Input
                    id="confirmPassword"
                    name="Confirm Password"
                    label="Confirm Password"
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    placeholder="Please confirm your password"
                />
                <View style={styles.buttonsContainer}>
                    <CustomButton
                        title="Reset"
                        onPress={() => { Alert.alert("you've clicked on Reset button") }}
                        color="lightblue"
                    />
                    <CustomButton
                        title="Sing UP"
                        onPress={() => { Alert.alert("you've clicked on Sing Up button") }}
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

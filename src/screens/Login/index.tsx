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
import { Input, CustomButton } from "../../components";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Separator = () => <View style={styles.separator} />

function Login(): React.JSX.Element {
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
                <View
                    style={styles.imageContainer}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={mashreqBankLogo}
                    />
                </View>
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
                    keyboardType="ascii-capable"
                    placeholder="Please give your password here.."
                />
                <Button
                    title="Reset"
                    onPress={() => { Alert.alert("you've clicked on Reset button") }}
                    style={{ backgroundColor: "red", fontColor: "white" }}
                />
                <Separator />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        // just for testing
        borderWidth: 2,
        borderColor: 'red',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // // just for testing
        // borderWidth: 2,
        // borderColor: 'red',
    },
    tinyLogo: {
        width: 100,
        height: 100,
        // // just for testing
        // borderWidth: 2,
        // borderColor: 'red',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});

export default Login;